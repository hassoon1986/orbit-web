(this.webpackJsonp=this.webpackJsonp||[]).push([[12],{489:function(t,e,o){"use strict";o.r(e),function(t){var n,r=o(10),a=o.n(r),i=o(18),u=o.n(i),c=o(355);o(490),o(492);function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var o=[],n=!0,r=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(n=(i=u.next()).done)&&(o.push(i.value),!e||o.length!==e);n=!0);}catch(t){r=!0,a=t}finally{try{n||null==u.return||u.return()}finally{if(r)throw a}}return o}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function s(t){var e=t.theme,o=t.onSubmit,n=t.usernameInputRef,r=l(Object(c.b)(),1)[0],i=l(a.a.useState(0),2),u=i[0],s=i[1],b=a.a.useCallback((function(){n.current&&n.current.focus()}),[]),d=a.a.useCallback((function(){n.current&&s(n.current.value.length)}),[]);return a.a.createElement("form",{onSubmit:o},a.a.createElement("div",{className:"usernameRow fadeInAnimation",onClick:b},a.a.createElement("input",{ref:n,type:"text",placeholder:r("login.nickname"),maxLength:"32",autoFocus:!0,style:e,onChange:d})),a.a.createElement("div",{className:"connectButtonRow"},a.a.createElement("span",{className:"hint"},u>0?r("login.pressEnterToLogin"):null),a.a.createElement("input",{type:"submit",value:"Connect",style:{display:"none"}})))}(n="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.enterModule:void 0)&&n(t),("undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default.signature:function(t){return t})(s,"useTranslation{[t]}\nuseState{[currentLength, setCurrentLength](0)}\nuseCallback{handleUsernameRowClick}\nuseCallback{handleUsernameInputChange}",(function(){return[c.b]})),s.propTypes={theme:u.a.object.isRequired,onSubmit:u.a.func.isRequired,usernameInputRef:u.a.object};var b,d,m=s;e.default=m,(b="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.default:void 0)&&(b.register(s,"LoginForm","/Users/aaron/Documents/Augur/orbit-web/src/components/LoginForm.js"),b.register(m,"default","/Users/aaron/Documents/Augur/orbit-web/src/components/LoginForm.js")),(d="undefined"!=typeof reactHotLoaderGlobal?reactHotLoaderGlobal.leaveModule:void 0)&&d(t)}.call(this,o(52)(t))},490:function(t,e,o){var n=o(491);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};o(47)(n,r);n.locals&&(t.exports=n.locals)},491:function(t,e,o){(t.exports=o(46)(!1)).push([t.i,'input[type=submit],input[type=button],.submitButton{display:flex;justify-content:center;align-self:center;box-sizing:border-box;font-family:"Lato";font-weight:bold;font-size:0.8em;color:rgba(220,220,220,0.4);background-color:rgba(0,0,0,0);border:0;min-width:5em;padding:0.56em;padding-left:1.5em;padding-right:1.5em;cursor:pointer}input[type=submit]:hover,input[type=button]:hover,.submitButton:hover{-webkit-animation:fadeInButton;animation:fadeInButton;-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}input[type=submit]:focus,input[type=button]:focus,.submitButton:focus{color:#e4e4e4;border:0;-webkit-animation:clickButtonPrimary;animation:clickButtonPrimary;-webkit-animation-duration:0s;animation-duration:0s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes fadeInButton{0%{color:rgba(220,220,220,0.2);background-color:rgba(0,0,0,0)}100%{color:#e4e4e4;background-color:#303030}}@keyframes fadeInButton{0%{color:rgba(220,220,220,0.2);background-color:rgba(0,0,0,0)}100%{color:#e4e4e4;background-color:#303030}}@-webkit-keyframes clickButtonSecondary{0%{background-color:rgba(160,220,90,0.6)}100%{background-color:rgba(160,220,90,0.6)}}@keyframes clickButtonSecondary{0%{background-color:rgba(160,220,90,0.6)}100%{background-color:rgba(160,220,90,0.6)}}@-webkit-keyframes clickButtonPrimary{0%{background-color:#783c8c}100%{color:#e4e4e4;background-color:#783c8c}}@keyframes clickButtonPrimary{0%{background-color:#783c8c}100%{color:#e4e4e4;background-color:#783c8c}}\n',""])},492:function(t,e,o){var n=o(493);"string"==typeof n&&(n=[[t.i,n,""]]);var r={insert:"head",singleton:!1};o(47)(n,r);n.locals&&(t.exports=n.locals)},493:function(t,e,o){(t.exports=o(46)(!1)).push([t.i,'input[type=text],input[type=password],input[type=checkbox]{font-family:"Lato";font-weight:bold;color:#e4e4e4;background-color:rgba(0,0,0,0);border:0;border-bottom:1px solid #404040;padding:0.5em;padding-left:0.25em;padding-right:0.25em;margin-left:0.25em;margin-right:0.25em}input[type=text]:focus,input[type=password]:focus{border-bottom:1px solid #783c8c}input[type=checkbox]{-webkit-filter:hue-rotate(50deg) saturate(80%) brightness(80%) !important;filter:hue-rotate(50deg) saturate(80%) brightness(80%) !important}\n',""])}}]);