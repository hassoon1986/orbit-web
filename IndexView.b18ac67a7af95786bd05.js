(this.webpackJsonp=this.webpackJsonp||[]).push([[11],{356:function(e,t,n){"use strict";e.exports=n(357)},357:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o,r=(o=n(10))&&"object"==typeof o&&"default"in o?o.default:o;function a(e){return a.warnAboutHMRDisabled&&(a.warnAboutHMRDisabled=!0,console.error("React-Hot-Loader: misconfiguration detected, using production version in non-production environment."),console.error("React-Hot-Loader: Hot Module Replacement is not enabled.")),r.Children.only(e.children)}a.warnAboutHMRDisabled=!1;var u=function e(){return e.shouldWrapWithAppContainer?function(e){return function(t){return r.createElement(a,null,r.createElement(e,t))}}:function(e){return e}};u.shouldWrapWithAppContainer=!1;t.AppContainer=a,t.hot=u,t.areComponentsEqual=function(e,t){return e===t},t.setConfig=function(){},t.cold=function(e){return e},t.configureComponent=function(){}},468:function(e,t,n){"use strict";n.r(t),function(e){var o,r=n(10),a=n.n(r),u=n(356),i=n(388),c=n(358),l=n(359);function s(){var e=a.a.useContext(c.a),t=e.networkStore,n=e.uiStore;return a.a.useEffect((function(){n.setTitle("Orbit")}),[]),Object(l.a)((function(){return t.channelNames.length>0?a.a.createElement(i.a,{to:"/channel/".concat(t.channelNames[0])}):a.a.createElement(i.a,{to:"/channel/".concat(t.defaultChannels[0])})}))}(o="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&o(e),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(e){return e})(s,"useContext{{ networkStore, uiStore }}\nuseEffect{}\nuseObserver{}",(function(){return[l.a]}));var d,f,b=Object(u.hot)(e)(s);t.default=b,(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(d.register(s,"IndexView","/Users/aaron/Documents/Augur/orbit-web/src/views/IndexView.js"),d.register(b,"default","/Users/aaron/Documents/Augur/orbit-web/src/views/IndexView.js")),(f="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&f(e)}.call(this,n(52)(e))}}]);