'use strict'

import { action, computed, configure, observable, reaction, values } from 'mobx'

import Logger from '../utils/logger'
import notify from '../utils/notify'

configure({ enforceActions: 'observed' })

const logger = new Logger()

function workerProxy (worker, hash) {
  return new Promise(resolve => {
    function listener ({ data }) {
      if (data.action === 'proxy:res' && data.key === hash) {
        worker.removeEventListener('message', listener)
        resolve(data.value)
      }
    }
    worker.addEventListener('message', listener)
    worker.postMessage({
      action: 'proxy:req',
      req: 'filebuffer',
      hash: hash,
      key: hash
    })
  })
}

export default class ChannelStore {
  constructor ({ network, channelName }) {
    this.network = network
    this.channelName = channelName

    this.sendMessage = this.sendMessage.bind(this)
    this.sendFiles = this.sendFiles.bind(this)
    this.loadFile = this.loadFile.bind(this)

    this._loadState()

    // Save channel state on changes
    reaction(() => values(this._storableState), this._saveState.bind(this))
  }

  // Private instance variables

  @observable
  _storableState = {}

  _sendQueue = []
  _sending = false

  @observable
  _sendingMessageCounter = 0

  // Public instance variables

  @observable
  entries = []

  @observable
  peers = []

  @observable
  loading = false

  @observable
  replicating = false

  // Public instance getters

  @computed
  get entryHashes () {
    return this.entries.map(e => e.hash)
  }

  @computed
  get messages () {
    // Format entries to better suit a chat channel
    return this.entries.map(entry =>
      Object.assign(JSON.parse(JSON.stringify(entry.payload.value)), {
        hash: entry.hash,
        userIdentity: entry.identity,
        unread: !entry.seen
      })
    )
  }

  @computed
  get readMessages () {
    return this.messages.filter(m => !m.unread)
  }

  @computed
  get unreadMessages () {
    return this.messages.filter(m => m.unread)
  }

  @computed
  get hasUnreadMessages () {
    return this.unreadMessages.length > 0
  }

  @computed
  get hasMentions () {
    // TODO: Implement
    return false
  }

  @computed
  get sendingMessage () {
    return this._sendingMessageCounter > 0
  }

  @computed
  get storagekey () {
    const username = this.network.sessionStore.username
    if (!username) throw new Error('No logged in user')
    return `orbit-chat.${username}.channel-states`
  }

  @computed
  get userCount () {
    return this.peers.length + 1
  }

  // Private instance actions

  @action
  _decrementSendingMessageCounter () {
    this._sendingMessageCounter = Math.max(0, this._sendingMessageCounter - 1)
  }

  @action
  _incrementSendingMessageCounter () {
    this._sendingMessageCounter += 1
  }

  // _onNewEntry (entry) {
  //   // TODO: This is not called anymore; how to handle notification?
  //   this._sendNotification(entry)
  //   this._updateEntries([entry])
  // }

  @action
  _updateEntries (entries) {
    const oldHashes = this.entryHashes
    const { lastSeenTimestamp = 0 } = this._storableState

    const newEntries = entries
      // Filter out entries we already have
      .filter(e => !oldHashes.includes(e.hash))
      // Set entries as seen
      .map(e => Object.assign(e, { seen: e.payload.value.meta.ts <= lastSeenTimestamp }))

    this.entries = this.entries
      .concat(newEntries)
      .sort((a, b) => a.payload.value.meta.ts - b.payload.value.meta.ts)
  }

  @action
  _updatePeers (peers) {
    this.peers = peers
  }

  @action // Called while loading from local filesystem
  _onLoadProgress (progress, total) {
    if (!this.loading) this.loading = true
  }

  @action // Called when done loading from local filesystem
  _onLoaded (entries) {
    this._updateEntries(entries)
    if (this.loading) this.loading = false
  }

  @action // Called while loading from IPFS (receiving new messages)
  _onReplicateProgress (progress) {
    if (!this.replicating) this.replicating = true
  }

  @action // Called when done loading from IPFS
  _onReplicated (entries) {
    this._updateEntries(entries)
    if (this.replicating) this.replicating = false
  }

  // Called when the user writes a message (text or file)
  _onWrite (entry) {
    this._updateEntries([entry])
    this._decrementSendingMessageCounter()
  }

  _onPeerUpdate (peers) {
    this._updatePeers(peers)
  }

  @action
  _onError (err) {
    logger.error(this.channelName, err)
    this.loading = false
    this.replicating = false
  }

  @action
  _loadState () {
    try {
      Object.assign(this._storableState, this._getStoredStates()[this.channelName] || {})
    } catch (err) {}
  }

  // Private instance methods

  _getStoredStates () {
    return JSON.parse(localStorage.getItem(this.storagekey)) || {}
  }

  _saveState () {
    try {
      const states = Object.assign(this._getStoredStates(), {
        [this.channelName]: this._storableState
      })
      localStorage.setItem(this.storagekey, JSON.stringify(states))
    } catch (err) {
      logger.error(err)
    }
  }

  _sendNotification (entry) {
    const {
      sessionStore: {
        rootStore: { uiStore: currentChannelName }
      }
    } = this.network
    const payload = entry.payload.value
    if (document.hidden || this.channelName !== currentChannelName) {
      if (this.unreadMessages.length > 1) {
        notify(`${this.unreadMessages.length} unread messages in #${this.channelName}`, '')
      } else {
        notify(
          `New message in #${this.channelName}`,
          `${payload.meta.from.name}: ${payload.content}`
        )
      }
    }
  }

  // Public instance actions

  @action.bound
  markEntryAsRead (entry) {
    if (!entry || entry.seen === true) return

    entry.seen = true

    // Update the last read timestamp
    this._storableState.lastSeenTimestamp = Math.max(
      this._storableState.lastSeenTimestamp || 0,
      entry.payload.value.meta.ts || 0
    )
  }

  @action.bound
  markEntryAsReadAtIndex (index) {
    if (typeof index !== 'number') return
    this.markEntryAsRead(this.entries[index])
  }

  // Public instance methods

  sendMessage (text) {
    if (typeof text !== 'string' || text === '') return Promise.resolve()

    this._incrementSendingMessageCounter()

    this.network.worker.postMessage({
      action: 'channel:send-text-message',
      options: { channelName: this.channelName, message: text }
    })

    return Promise.resolve()
  }

  _sendFile (file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = event => {
        this.network.worker.postMessage({
          action: 'channel:send-file-message',
          options: {
            channelName: this.channelName,
            file: {
              filename: file.name,
              buffer: event.target.result,
              meta: { mimeType: file.type, size: file.size }
            }
          }
        })
        resolve()
      }
      reader.readAsArrayBuffer(file)
    })
  }

  sendFiles (files) {
    const promises = []
    for (let i = 0; i < files.length; i++) {
      promises.push(this._sendFile(files[i]))
    }
    return Promise.all(promises)
  }

  async loadFile (hash, asStream) {
    const array = await workerProxy(this.network.worker, hash)
    return { buffer: array, url: null, stream: null }
    // return new Promise((resolve, reject) => {
    //   // TODO: Handle electron
    //   const stream = this.network.orbit.getFile(hash)
    //   if (asStream) resolve({ buffer: null, url: null, stream })
    //   else {
    //     let buffer = new Uint8Array(0)
    //     stream.on('error', reject)
    //     stream.on('data', chunk => {
    //       const tmp = new Uint8Array(buffer.length + chunk.length)
    //       tmp.set(buffer)
    //       tmp.set(chunk, buffer.length)
    //       buffer = tmp
    //     })
    //     stream.on('end', () => {
    //       resolve({ buffer, url: null, stream: null })
    //     })
    //   }
    // })
  }
}
