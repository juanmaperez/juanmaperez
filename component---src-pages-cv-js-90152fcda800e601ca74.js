(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"4ngj":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),a=n.n(r),i=n("hTlr"),o=n("vrFN"),l=n("vOnD"),u=n("cIgQ"),c=n.n(u),s=n("KQm4");function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var d=n("s4An");function p(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&Object(d.a)(e,t)}var m=n("cDf5"),h=n.n(m);function g(e,t){return!t||"object"!==h()(t)&&"function"!=typeof t?f(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(e,t,n){return t&&b(e.prototype,t),n&&b(e,n),e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n("E9XD"),n("ToJy");function w(){return(w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function k(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}function j(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return O(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return O(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return o=e.done,e},e:function(e){l=!0,i=e},f:function(){try{o||null==n.return||n.return()}finally{if(l)throw i}}}}function O(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function C(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var a=v(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return g(this,n)}}var S={arr:Array.isArray,obj:function(e){return"[object Object]"===Object.prototype.toString.call(e)},fun:function(e){return"function"==typeof e},str:function(e){return"string"==typeof e},num:function(e){return"number"==typeof e},und:function(e){return void 0===e},nul:function(e){return null===e},set:function(e){return e instanceof Set},map:function(e){return e instanceof Map},equ:function(e,t){if(typeof e!=typeof t)return!1;if(S.str(e)||S.num(e))return e===t;if(S.obj(e)&&S.obj(t)&&Object.keys(e).length+Object.keys(t).length===0)return!0;var n;for(n in e)if(!(n in t))return!1;for(n in t)if(e[n]!==t[n])return!1;return!S.und(n)||e===t}};function A(){var e=Object(r.useState)(!1)[1];return Object(r.useCallback)((function(){return e((function(e){return!e}))}),[])}function V(e,t){return S.und(e)||S.nul(e)?t:e}function R(e){return S.und(e)?[]:S.arr(e)?e:[e]}function P(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return S.fun(e)?e.apply(void 0,n):e}function I(e){var t=function(e){return e.to,e.from,e.config,e.onStart,e.onRest,e.onFrame,e.children,e.reset,e.reverse,e.force,e.immediate,e.delay,e.attach,e.destroyed,e.interpolateTo,e.ref,e.lazy,k(e,["to","from","config","onStart","onRest","onFrame","children","reset","reverse","force","immediate","delay","attach","destroyed","interpolateTo","ref","lazy"])}(e);if(S.und(t))return w({to:t},e);var n=Object.keys(e).reduce((function(n,r){return S.und(t[r])?w({},n,x({},r,e[r])):n}),{});return w({to:t},n)}var N,z,T=function(){function e(){y(this,e),this.payload=void 0,this.children=[]}return E(e,[{key:"getAnimatedValue",value:function(){return this.getValue()}},{key:"getPayload",value:function(){return this.payload||this}},{key:"attach",value:function(){}},{key:"detach",value:function(){}},{key:"getChildren",value:function(){return this.children}},{key:"addChild",value:function(e){0===this.children.length&&this.attach(),this.children.push(e)}},{key:"removeChild",value:function(e){var t=this.children.indexOf(e);this.children.splice(t,1),0===this.children.length&&this.detach()}}]),e}(),M=function(e){p(n,e);var t=C(n);function n(){var e;return y(this,n),(e=t.apply(this,arguments)).payload=[],e.attach=function(){return e.payload.forEach((function(t){return t instanceof T&&t.addChild(f(e))}))},e.detach=function(){return e.payload.forEach((function(t){return t instanceof T&&t.removeChild(f(e))}))},e}return n}(T),q=function(e){p(n,e);var t=C(n);function n(){var e;return y(this,n),(e=t.apply(this,arguments)).payload={},e.attach=function(){return Object.values(e.payload).forEach((function(t){return t instanceof T&&t.addChild(f(e))}))},e.detach=function(){return Object.values(e.payload).forEach((function(t){return t instanceof T&&t.removeChild(f(e))}))},e}return E(n,[{key:"getValue",value:function(e){void 0===e&&(e=!1);var t={};for(var n in this.payload){var r=this.payload[n];(!e||r instanceof T)&&(t[n]=r instanceof T?r[e?"getAnimatedValue":"getValue"]():r)}return t}},{key:"getAnimatedValue",value:function(){return this.getValue(!0)}}]),n}(T);function F(e,t){N={fn:e,transform:t}}function D(e){z=e}var _,J=function(e){return"undefined"!=typeof window?window.requestAnimationFrame(e):-1};function W(e){_=e}var G=function(){return Date.now()};function L(e){e}var B,Q,U=function(e){return e.current};function H(e){B=e}var X=function(e){p(n,e);var t=C(n);function n(e,r){var a;return y(this,n),(a=t.call(this)).update=void 0,a.payload=e.style?w({},e,{style:B(e.style)}):e,a.update=r,a.attach(),a}return n}(q),$=!1,K=new Set,Z=function e(){if(!$)return!1;var t,n=G(),r=j(K);try{for(r.s();!(t=r.n()).done;){for(var a=t.value,i=!1,o=0;o<a.configs.length;o++){for(var l=a.configs[o],u=void 0,c=void 0,s=0;s<l.animatedValues.length;s++){var f=l.animatedValues[s];if(!f.done){var d=l.fromValues[s],p=l.toValues[s],m=f.lastPosition,h=p instanceof T,g=Array.isArray(l.initialVelocity)?l.initialVelocity[s]:l.initialVelocity;if(h&&(p=p.getValue()),l.immediate)f.setValue(p),f.done=!0;else if("string"!=typeof d&&"string"!=typeof p){if(void 0!==l.duration)m=d+l.easing((n-f.startTime)/l.duration)*(p-d),u=n>=f.startTime+l.duration;else if(l.decay)m=d+g/(1-.998)*(1-Math.exp(-(1-.998)*(n-f.startTime))),(u=Math.abs(f.lastPosition-m)<.1)&&(p=m);else{c=void 0!==f.lastTime?f.lastTime:n,g=void 0!==f.lastVelocity?f.lastVelocity:l.initialVelocity,n>c+64&&(c=n);for(var v=Math.floor(n-c),y=0;y<v;++y){m+=1*(g+=1*((-l.tension*(m-p)+-l.friction*g)/l.mass)/1e3)/1e3}var b=!(!l.clamp||0===l.tension)&&(d<p?m>p:m<p),E=Math.abs(g)<=l.precision,x=0===l.tension||Math.abs(p-m)<=l.precision;u=b||E&&x,f.lastVelocity=g,f.lastTime=n}h&&!l.toValues[s].done&&(u=!1),u?(f.value!==p&&(m=p),f.done=!0):i=!0,f.setValue(m),f.lastPosition=m}else f.setValue(p),f.done=!0}}a.props.onFrame&&(a.values[l.name]=l.interpolation.getValue())}a.props.onFrame&&a.props.onFrame(a.values),i||(K.delete(a),a.stop(!0))}}catch(w){r.e(w)}finally{r.f()}return K.size?Q?Q():J(e):$=!1,$};function Y(e,t,n){if("function"==typeof e)return e;if(Array.isArray(e))return Y({range:e,output:t,extrapolate:n});if(_&&"string"==typeof e.output[0])return _(e);var r=e,a=r.output,i=r.range||[0,1],o=r.extrapolateLeft||r.extrapolate||"extend",l=r.extrapolateRight||r.extrapolate||"extend",u=r.easing||function(e){return e};return function(e){var t=function(e,t){for(var n=1;n<t.length-1&&!(t[n]>=e);++n);return n-1}(e,i);return function(e,t,n,r,a,i,o,l,u){var c=u?u(e):e;if(c<t){if("identity"===o)return c;"clamp"===o&&(c=t)}if(c>n){if("identity"===l)return c;"clamp"===l&&(c=n)}if(r===a)return r;if(t===n)return e<=t?r:a;t===-1/0?c=-c:n===1/0?c-=t:c=(c-t)/(n-t);c=i(c),r===-1/0?c=-c:a===1/0?c+=r:c=c*(a-r)+r;return c}(e,i[t],i[t+1],a[t],a[t+1],u,o,l,r.map)}}var ee=function(e){p(n,e);var t=C(n);function n(e,r,a,i){var o;return y(this,n),(o=t.call(this)).calc=void 0,o.payload=e instanceof M&&!(e instanceof n)?e.getPayload():Array.isArray(e)?e:[e],o.calc=Y(r,a,i),o}return E(n,[{key:"getValue",value:function(){return this.calc.apply(this,Object(s.a)(this.payload.map((function(e){return e.getValue()}))))}},{key:"updateConfig",value:function(e,t,n){this.calc=Y(e,t,n)}},{key:"interpolate",value:function(e,t,r){return new n(this,e,t,r)}}]),n}(M);var te=function(e){p(n,e);var t=C(n);function n(e){var r,a;return y(this,n),r=t.call(this),a=f(r),r.animatedStyles=new Set,r.value=void 0,r.startPosition=void 0,r.lastPosition=void 0,r.lastVelocity=void 0,r.startTime=void 0,r.lastTime=void 0,r.done=!1,r.setValue=function(e,t){void 0===t&&(t=!0),a.value=e,t&&a.flush()},r.value=e,r.startPosition=e,r.lastPosition=e,r}return E(n,[{key:"flush",value:function(){0===this.animatedStyles.size&&function e(t,n){"update"in t?n.add(t):t.getChildren().forEach((function(t){return e(t,n)}))}(this,this.animatedStyles),this.animatedStyles.forEach((function(e){return e.update()}))}},{key:"clearStyles",value:function(){this.animatedStyles.clear()}},{key:"getValue",value:function(){return this.value}},{key:"interpolate",value:function(e,t,n){return new ee(this,e,t,n)}}]),n}(T),ne=function(e){p(n,e);var t=C(n);function n(e){var r;return y(this,n),(r=t.call(this)).payload=e.map((function(e){return new te(e)})),r}return E(n,[{key:"setValue",value:function(e,t){var n=this;void 0===t&&(t=!0),Array.isArray(e)?e.length===this.payload.length&&e.forEach((function(e,r){return n.payload[r].setValue(e,t)})):this.payload.forEach((function(n){return n.setValue(e,t)}))}},{key:"getValue",value:function(){return this.payload.map((function(e){return e.getValue()}))}},{key:"interpolate",value:function(e,t){return new ee(this,e,t)}}]),n}(M),re=0,ae=function(){function e(){var t=this;y(this,e),this.id=void 0,this.idle=!0,this.hasChanged=!1,this.guid=0,this.local=0,this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.listeners=[],this.queue=[],this.localQueue=void 0,this.getValues=function(){return t.interpolations},this.id=re++}return E(e,[{key:"update",value:function(e){if(!e)return this;var t=I(e),n=t.delay,r=void 0===n?0:n,a=t.to,i=k(t,["delay","to"]);if(S.arr(a)||S.fun(a))this.queue.push(w({},i,{delay:r,to:a}));else if(a){var o={};Object.entries(a).forEach((function(e){var t=e[0],n=w({to:x({},t,e[1]),delay:P(r,t)},i),a=o[n.delay]&&o[n.delay].to;o[n.delay]=w({},o[n.delay],n,{to:w({},a,n.to)})})),this.queue=Object.values(o)}return this.queue=this.queue.sort((function(e,t){return e.delay-t.delay})),this.diff(i),this}},{key:"start",value:function(e){var t,n=this;if(this.queue.length){this.idle=!1,this.localQueue&&this.localQueue.forEach((function(e){var t=e.from,r=void 0===t?{}:t,a=e.to,i=void 0===a?{}:a;S.obj(r)&&(n.merged=w({},r,n.merged)),S.obj(i)&&(n.merged=w({},n.merged,i))}));var r=this.local=++this.guid,a=this.localQueue=this.queue;this.queue=[],a.forEach((function(t,i){var o=t.delay,l=k(t,["delay"]),u=function(t){i===a.length-1&&r===n.guid&&t&&(n.idle=!0,n.props.onRest&&n.props.onRest(n.merged)),e&&e()},c=S.arr(l.to)||S.fun(l.to);o?setTimeout((function(){r===n.guid&&(c?n.runAsync(l,u):n.diff(l).start(u))}),o):c?n.runAsync(l,u):n.diff(l).start(u)}))}else S.fun(e)&&this.listeners.push(e),this.props.onStart&&this.props.onStart(),t=this,K.has(t)||K.add(t),$||($=!0,J(Q||Z));return this}},{key:"stop",value:function(e){return this.listeners.forEach((function(t){return t(e)})),this.listeners=[],this}},{key:"pause",value:function(e){var t;return this.stop(!0),e&&(t=this,K.has(t)&&K.delete(t)),this}},{key:"runAsync",value:function(e,t){var n=this,r=this,a=(e.delay,k(e,["delay"])),i=this.local,o=Promise.resolve(void 0);if(S.arr(a.to))for(var l=function(e){var t=e,r=w({},a,I(a.to[t]));S.arr(r.config)&&(r.config=r.config[t]),o=o.then((function(){if(i===n.guid)return new Promise((function(e){return n.diff(r).start(e)}))}))},u=0;u<a.to.length;u++)l(u);else if(S.fun(a.to)){var c,s=0;o=o.then((function(){return a.to((function(e){var t=w({},a,I(e));if(S.arr(t.config)&&(t.config=t.config[s]),s++,i===n.guid)return c=new Promise((function(e){return n.diff(t).start(e)}))}),(function(e){return void 0===e&&(e=!0),r.stop(e)})).then((function(){return c}))}))}o.then(t)}},{key:"diff",value:function(e){var t=this;this.props=w({},this.props,e);var n=this.props,r=n.from,a=void 0===r?{}:r,i=n.to,o=void 0===i?{}:i,l=n.config,u=void 0===l?{}:l,c=n.reverse,s=n.attach,f=n.reset,d=n.immediate;if(c){var p=[o,a];a=p[0],o=p[1]}this.merged=w({},a,this.merged,o),this.hasChanged=!1;var m=s&&s(this);if(this.animations=Object.entries(this.merged).reduce((function(e,n){var r=n[0],i=n[1],o=e[r]||{},l=S.num(i),c=S.str(i)&&!i.startsWith("#")&&!/\d/.test(i)&&!z[i],s=S.arr(i),p=!l&&!s&&!c,h=S.und(a[r])?i:a[r],g=l||s||c?i:1,v=P(u,r);m&&(g=m.animations[r].parent);var y,b=o.parent,E=o.interpolation,k=R(m?g.getPayload():g),j=i;p&&(j=_({range:[0,1],output:[i,i]})(1));var O=E&&E.getValue(),C=!S.und(b)&&o.animatedValues.some((function(e){return!e.done})),A=!S.equ(j,O),I=!S.equ(j,o.previous),N=!S.equ(v,o.config);if(f||I&&A||N){if(l||c)b=E=o.parent||new te(h);else if(s)b=E=o.parent||new ne(h);else if(p){var T=o.interpolation&&o.interpolation.calc(o.parent.value);T=void 0===T||f?h:T,o.parent?(b=o.parent).setValue(0,!1):b=new te(0);var M={output:[T,i]};o.interpolation?(E=o.interpolation,o.interpolation.updateConfig(M)):E=b.interpolate(M)}return k=R(m?g.getPayload():g),y=R(b.getPayload()),f&&!p&&b.setValue(h,!1),t.hasChanged=!0,y.forEach((function(e){e.startPosition=e.value,e.lastPosition=e.value,e.lastVelocity=C?e.lastVelocity:void 0,e.lastTime=C?e.lastTime:void 0,e.startTime=G(),e.done=!1,e.animatedStyles.clear()})),P(d,r)&&b.setValue(p?g:i,!1),w({},e,x({},r,w({},o,{name:r,parent:b,interpolation:E,animatedValues:y,toValues:k,previous:j,config:v,fromValues:R(b.getValue()),immediate:P(d,r),initialVelocity:V(v.velocity,0),clamp:V(v.clamp,!1),precision:V(v.precision,.01),tension:V(v.tension,170),friction:V(v.friction,26),mass:V(v.mass,1),duration:v.duration,easing:V(v.easing,(function(e){return e})),decay:v.decay})))}return A?e:(p&&(b.setValue(1,!1),E.updateConfig({output:[j,j]})),b.done=!0,t.hasChanged=!0,w({},e,x({},r,w({},e[r],{previous:j}))))}),this.animations),this.hasChanged)for(var h in this.configs=Object.values(this.animations),this.values={},this.interpolations={},this.animations)this.interpolations[h]=this.animations[h].interpolation,this.values[h]=this.animations[h].interpolation.getValue();return this}},{key:"destroy",value:function(){this.stop(),this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.local=0}}]),e}(),ie=function(e,t){var n=Object(r.useRef)(!1),a=Object(r.useRef)(),i=S.fun(t),o=Object(r.useMemo)((function(){var n;return a.current&&(a.current.map((function(e){return e.destroy()})),a.current=void 0),[new Array(e).fill().map((function(e,r){var a=new ae,o=i?P(t,r,a):t[r];return 0===r&&(n=o.ref),a.update(o),n||a.start(),a})),n]}),[e]),l=o[0],u=o[1];a.current=l;Object(r.useImperativeHandle)(u,(function(){return{start:function(){return Promise.all(a.current.map((function(e){return new Promise((function(t){return e.start(t)}))})))},stop:function(e){return a.current.forEach((function(t){return t.stop(e)}))},get controllers(){return a.current}}}));var c=Object(r.useMemo)((function(){return function(e){return a.current.map((function(t,n){t.update(i?P(e,n,t):e[n]),u||t.start()}))}}),[e]);Object(r.useEffect)((function(){n.current?i||c(t):u||a.current.forEach((function(e){return e.start()}))})),Object(r.useEffect)((function(){return n.current=!0,function(){return a.current.forEach((function(e){return e.destroy()}))}}),[]);var s=a.current.map((function(e){return e.getValues()}));return i?[s,c,function(e){return a.current.forEach((function(t){return t.pause(e)}))}]:s},oe=function(e){var t=S.fun(e),n=ie(1,t?e:[e]),r=n[0],a=n[1],i=n[2];return t?[r[0],a,i]:r};var le=function(e){p(n,e);var t=C(n);function n(e){var r;return y(this,n),void 0===e&&(e={}),r=t.call(this),!e.transform||e.transform instanceof T||(e=N.transform(e)),r.payload=e,r}return n}(q),ue={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},ce="[-+]?\\d*\\.?\\d+";function se(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"\\(\\s*("+t.join(")\\s*,\\s*(")+")\\s*\\)"}var fe=new RegExp("rgb"+se(ce,ce,ce)),de=new RegExp("rgba"+se(ce,ce,ce,ce)),pe=new RegExp("hsl"+se(ce,"[-+]?\\d*\\.?\\d+%","[-+]?\\d*\\.?\\d+%")),me=new RegExp("hsla"+se(ce,"[-+]?\\d*\\.?\\d+%","[-+]?\\d*\\.?\\d+%",ce)),he=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ge=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ve=/^#([0-9a-fA-F]{6})$/,ye=/^#([0-9a-fA-F]{8})$/;function be(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Ee(e,t,n){var r=n<.5?n*(1+t):n+t-n*t,a=2*n-r,i=be(a,r,e+1/3),o=be(a,r,e),l=be(a,r,e-1/3);return Math.round(255*i)<<24|Math.round(255*o)<<16|Math.round(255*l)<<8}function xe(e){var t=parseInt(e,10);return t<0?0:t>255?255:t}function we(e){return(parseFloat(e)%360+360)%360/360}function ke(e){var t=parseFloat(e);return t<0?0:t>1?255:Math.round(255*t)}function je(e){var t=parseFloat(e);return t<0?0:t>100?1:t/100}function Oe(e){var t,n,r="number"==typeof(t=e)?t>>>0===t&&t>=0&&t<=4294967295?t:null:(n=ve.exec(t))?parseInt(n[1]+"ff",16)>>>0:ue.hasOwnProperty(t)?ue[t]:(n=fe.exec(t))?(xe(n[1])<<24|xe(n[2])<<16|xe(n[3])<<8|255)>>>0:(n=de.exec(t))?(xe(n[1])<<24|xe(n[2])<<16|xe(n[3])<<8|ke(n[4]))>>>0:(n=he.exec(t))?parseInt(n[1]+n[1]+n[2]+n[2]+n[3]+n[3]+"ff",16)>>>0:(n=ye.exec(t))?parseInt(n[1],16)>>>0:(n=ge.exec(t))?parseInt(n[1]+n[1]+n[2]+n[2]+n[3]+n[3]+n[4]+n[4],16)>>>0:(n=pe.exec(t))?(255|Ee(we(n[1]),je(n[2]),je(n[3])))>>>0:(n=me.exec(t))?(Ee(we(n[1]),je(n[2]),je(n[3]))|ke(n[4]))>>>0:null;if(null===r)return e;var a=(16711680&(r=r||0))>>>16,i=(65280&r)>>>8,o=(255&r)/255;return"rgba(".concat((4278190080&r)>>>24,", ").concat(a,", ").concat(i,", ").concat(o,")")}var Ce=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,Se=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,Ae=new RegExp("(".concat(Object.keys(ue).join("|"),")"),"g"),Ve={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Re=["Webkit","Ms","Moz","O"];function Pe(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||Ve.hasOwnProperty(e)&&Ve[e]?(""+t).trim():t+"px"}Ve=Object.keys(Ve).reduce((function(e,t){return Re.forEach((function(n){return e[function(e,t){return e+t.charAt(0).toUpperCase()+t.substring(1)}(n,t)]=e[t]})),e}),Ve);var Ie={};H((function(e){return new le(e)})),L("div"),W((function(e){var t=e.output.map((function(e){return e.replace(Se,Oe)})).map((function(e){return e.replace(Ae,Oe)})),n=t[0].match(Ce).map((function(){return[]}));t.forEach((function(e){e.match(Ce).forEach((function(e,t){return n[t].push(+e)}))}));var r=t[0].match(Ce).map((function(t,r){return Y(w({},e,{output:n[r]}))}));return function(e){var n=0;return t[0].replace(Ce,(function(){return r[n++](e)})).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,(function(e,t,n,r,a){return"rgba(".concat(Math.round(t),", ").concat(Math.round(n),", ").concat(Math.round(r),", ").concat(a,")")}))}})),D(ue),F((function(e,t){if(!e.nodeType||void 0===e.setAttribute)return!1;var n=t.style,r=t.children,a=t.scrollTop,i=t.scrollLeft,o=k(t,["style","children","scrollTop","scrollLeft"]),l="filter"===e.nodeName||e.parentNode&&"filter"===e.parentNode.nodeName;for(var u in void 0!==a&&(e.scrollTop=a),void 0!==i&&(e.scrollLeft=i),void 0!==r&&(e.textContent=r),n)if(n.hasOwnProperty(u)){var c=0===u.indexOf("--"),s=Pe(u,n[u],c);"float"===u&&(u="cssFloat"),c?e.style.setProperty(u,s):e.style[u]=s}for(var f in o){var d=l?f:Ie[f]||(Ie[f]=f.replace(/([A-Z])/g,(function(e){return"-"+e.toLowerCase()})));void 0!==e.getAttribute(d)&&e.setAttribute(d,o[f])}}),(function(e){return e}));var Ne,ze,Te=(Ne=function(e){return Object(r.forwardRef)((function(t,n){var i=A(),o=Object(r.useRef)(!0),l=Object(r.useRef)(null),u=Object(r.useRef)(null),c=Object(r.useCallback)((function(e){var t=l.current;l.current=new X(e,(function(){var e=!1;u.current&&(e=N.fn(u.current,l.current.getAnimatedValue())),u.current&&!1!==e||i()})),t&&t.detach()}),[]);Object(r.useEffect)((function(){return function(){o.current=!1,l.current&&l.current.detach()}}),[]),Object(r.useImperativeHandle)(n,(function(){return U(u,o,i)})),c(t);var s,f=l.current.getValue(),d=(f.scrollTop,f.scrollLeft,k(f,["scrollTop","scrollLeft"])),p=(s=e,!S.fun(s)||s.prototype instanceof a.a.Component?function(e){return u.current=function(e,t){return t&&(S.fun(t)?t(e):S.obj(t)&&(t.current=e)),e}(e,n)}:void 0);return a.a.createElement(e,w({},d,{ref:p}))}))},void 0===(ze=!1)&&(ze=!0),function(e){return(S.arr(e)?e:Object.keys(e)).reduce((function(e,t){var n=ze?t[0].toLowerCase()+t.substring(1):t;return e[n]=Ne(n),e}),Ne)})(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),Me=l.a.div.withConfig({displayName:"personal__PersonalWrapper",componentId:"sc-1ngoo6e-0"})(["display:flex;align-items:center;.image{width:200px;height:200px;background-size:cover !important;border-radius:50%;overflow:hidden;margin-right:20px;}.data{h4{letter-spacing:1px;font-size:44px;text-transform:uppercase;margin-bottom:0px;}h5{letter-spacing:1px;font-size:36px;text-transform:uppercase;margin-bottom:20px;color:#B7C8Cb;}p{line-height:1.4;font-size:18px;}}"]),qe=function(){var e=oe({from:{x:-300},to:{x:0}});return a.a.createElement(Me,null,a.a.createElement(Te.div,{style:e},a.a.createElement("div",{className:"image",style:{background:"url("+c.a+")"}})),a.a.createElement("div",{className:"data"},a.a.createElement("div",null,a.a.createElement("h4",null,"Juanma Perez"),a.a.createElement("h5",null,"Software Engineer")),a.a.createElement("p",null,"juanmaperezvar@gmail.com"),a.a.createElement("p",null,"07447 881 161"),a.a.createElement("p",null,"https://juanmaperez.me")))},Fe=l.a.div.withConfig({displayName:"description__DescriptionWrapper",componentId:"s6ib13-0"})(["margin:40px 0px;p{margin-bottom:10px;line-height:1.4;font-size:18px;letter-spacing:1px;.stick{-webkit-animation:blink 500ms infinite;-moz-animation:blink 500ms infinite;-o-animation:blink 500ms infinite;animation:blink 500ms infinite;}}"]),De=function(e){var t=e.ready,n=Object(r.useRef)();n.current="Results-oriented software engineer with 6 years experience with the most advanced technologies in development. \n  I'm focused on improving UX and product interfaces through finding the best approach to interactions.\n  Code efficiency is a central feature of my work, as past projects have involved managing large amounts of data.";var i=Object(r.useRef)(),o=Object(r.useRef)(),l=Object(r.useState)(""),u=l[0],c=l[1];return Object(r.useEffect)((function(){i.current=0,o.current=setInterval((function(){return i.current<=n.current.length-1?(c((function(e){return e+n.current[i.current]})),i.current++):(clearInterval(o),t()),function(){return clearInterval(o.current)}}),20)}),[]),a.a.createElement(Fe,null,a.a.createElement("p",null,a.a.createElement("span",null,u),a.a.createElement("span",{className:"stick"},"|")))},_e=l.a.section.withConfig({displayName:"experiences__ExperiencesWrapper",componentId:"sc-1dhg4hu-0"})(["margin:20px 0px;h2{font-size:44px;width:100%;border-bottom:1px solid #B7C8Cb;text-transform:uppercase;padding-bottom:5px;}"]),Je=l.a.div.withConfig({displayName:"experiences__ExperienceItemWrapper",componentId:"sc-1dhg4hu-1"})(["margin:30px 0px;.title-experience{letter-spacing:1px;.name{line-height:1.4;font-size:22px;strong{color:#000;}span{color:#B7C8Cb;}}.date{color:#999;}}.description-experience{ul{padding:20px 10px;li{font-size:18px;margin-bottom:10px;letter-spacing:1px;line-height:1.4;}}}"]),We=function(e){var t=e.visible,n=oe({opacity:t?1:0,x:t?0:-100}),r=n.opacity,i=n.x;return a.a.createElement(Te.div,{style:{opacity:r,transform:i.interpolate((function(e){return"translateX("+e+"px)"}))}},a.a.createElement(_e,null,a.a.createElement("h2",null,"Work Experience"),a.a.createElement(Je,null,a.a.createElement("div",{className:"title-experience"},a.a.createElement("p",{className:"name"},a.a.createElement("strong",null,"Sainsbury's Tech")," | ",a.a.createElement("span",null,"Software Engineer")),a.a.createElement("p",{className:"date"},a.a.createElement("span",null,"01/2020 | nowadays"))),a.a.createElement("div",{className:"description-experience"},a.a.createElement("ul",null,a.a.createElement("li",null,"Components and view development using React, Redux, and Typescript."),a.a.createElement("li",null,"Update codebase to functional components using React Hooks."),a.a.createElement("li",null,"TDD with Jest and Enzyme. Creating reusable and isolated components using Storybook."),a.a.createElement("li",null,"Migrating the React project into NextJS to take advantage of SSR."),a.a.createElement("li",null,"Creation and improvement of our services in Go."),a.a.createElement("li",null,"Responsible of pairing sessions and onboarding of new colleagues."),a.a.createElement("li",null,"Development with new technologies such as GraphQL, Apollo, GatsbyJS y Prisma."),a.a.createElement("li",null,"CI/CD with SCRUM methodologies.")))),a.a.createElement(Je,null,a.a.createElement("div",{className:"title-experience"},a.a.createElement("p",{className:"name"},a.a.createElement("strong",null,"Colossus Bets")," | ",a.a.createElement("span",null,"Senior Front End Engineer")),a.a.createElement("p",{className:"date"},a.a.createElement("span",null,"06/2018 | 01/2020"))),a.a.createElement("div",{className:"description-experience"},a.a.createElement("ul",null,a.a.createElement("li",null,"Development with Angular and React."),a.a.createElement("li",null,"State management with Redux and Ngrx."),a.a.createElement("li",null,"TDD with Jest and Enzyme."),a.a.createElement("li",null,"Mocked API with NodeJs and Express."),a.a.createElement("li",null,"Data management with RXJS."),a.a.createElement("li",null,"UI implementations for improving the UX."),a.a.createElement("li",null,"Microsites created with GatsbyJS, GraphQL and Apollo."),a.a.createElement("li",null,"Styling with Styled-Components and SASS."),a.a.createElement("li",null,"SCRUM methodologies.")))),a.a.createElement(Je,null,a.a.createElement("div",{className:"title-experience"},a.a.createElement("p",{className:"name"},a.a.createElement("strong",null,"Crealogix")," | ",a.a.createElement("span",null,"Front End Engineer")),a.a.createElement("p",{className:"date"},a.a.createElement("span",null,"11/2017 | 06/2018"))),a.a.createElement("div",{className:"description-experience"},a.a.createElement("ul",null,a.a.createElement("li",null,"Development with Angular 5."),a.a.createElement("li",null,"Custom Implementations from the Angular Router."),a.a.createElement("li",null,"Develop new Modules for the main App."),a.a.createElement("li",null,"Fetching Data from API through HTTP requests."),a.a.createElement("li",null,"Styling with SASS."),a.a.createElement("li",null,"Tasks development based on SCRUM methodologies."))))))},Ge=l.a.section.withConfig({displayName:"education__EducationWrapper",componentId:"sc-19uegx7-0"})(["margin:40px 0px;transition:opacity 5s linear;h2{font-size:44px;width:100%;border-bottom:1px solid #B7C8Cb;text-transform:uppercase;padding-bottom:5px;}"]),Le=l.a.div.withConfig({displayName:"education__Education",componentId:"sc-19uegx7-1"})(["margin:40px 0px;.title{line-height:1.4;font-size:22px;letter-spacing:1px;strong{color:#000;}span{color #B7C8Cb;}}.description{margin:20px 0px;font-size:18px;letter-spacing:1px;line-height:1.4;}"]),Be=function(e){var t=e.visible,n=oe({opacity:t?1:0,x:t?0:-100}),r=n.opacity,i=n.x;return a.a.createElement(Te.div,{style:{opacity:r,transform:i.interpolate((function(e){return"translateX("+e+"px)"}))}},a.a.createElement(Ge,null,a.a.createElement("h2",null,"Education"),a.a.createElement(Le,null,a.a.createElement("div",{className:"title"},a.a.createElement("strong",null,"Software Development MEAM/MERN stack")," | ",a.a.createElement("span",null,"Iron Hack")),a.a.createElement("div",{className:"description"},"NodeJs | Angular | React | Redux | GatsbyJs | ExpressJs | Git | MongoDB | SASS | Styled-components")),a.a.createElement(Le,null,a.a.createElement("div",{className:"title"},a.a.createElement("strong",null,"Web Development")," | ",a.a.createElement("span",null,"CEI")),a.a.createElement("div",{className:"description"},"HTML5 | CSS3 | Javascript | jQuery | Ajax | PHP | MySQL | Bootstrap | RWD | Graphic Design | Web Design"))))},Qe=l.a.section.withConfig({displayName:"skills__SkillsWrapper",componentId:"s61kdi-0"})(["transition:opacity 5s linear;margin:50px 0px 0px;h2{font-size:44px;width:100%;border-bottom:1px solid #B7C8Cb;text-transform:uppercase;padding-bottom:5px;}ul{padding:40px 0px;li{letter-spacing:1px;font-size:18px;margin-bottom:16px;letter-spacing:1px;line-height:1.4;}}"]),Ue=function(e){var t=e.visible,n=oe({opacity:t?1:0,x:t?0:-100}),r=n.opacity,i=n.x;return a.a.createElement(Te.div,{style:{opacity:r,transform:i.interpolate((function(e){return"translateX("+e+"px)"}))}},a.a.createElement(Qe,null,a.a.createElement("h2",null,"Skills"),a.a.createElement("ul",null,a.a.createElement("li",null,"Animations with GreenSock, React-Spring and React-transitions"),a.a.createElement("li",null,"Problem Solving and bug fixing"),a.a.createElement("li",null,"Functional Programming"),a.a.createElement("li",null,"UI implementations and UX focus"))))},He=l.a.div.withConfig({displayName:"cv__CvPageWrapper",componentId:"nrcs0d-0"})(["background:#fbf9f3;width:100%;min-height:100vh;.cv-container{width:60%;margin:0px auto;padding:120px 0px;max-width:1000px;background:#fbf9f3;}"]);t.default=function(e){var t=e.location,n=Object(r.useState)(!1),l=n[0],u=n[1];return a.a.createElement(i.a,{location:t},a.a.createElement(o.a,{title:"Juanma Perez | CV",description:"Personal Website by Juanma Perez. I'm Juanma Perez and here you can find my update resume.",keywords:["Juanma Perez","javascript","developer"]}),a.a.createElement(He,null,a.a.createElement("div",{className:"cv-container"},a.a.createElement(qe,null),a.a.createElement(De,{ready:function(){return u(!0)}}),a.a.createElement(We,{visible:l}),a.a.createElement(Be,{visible:l}),a.a.createElement(Ue,{visible:l}))))}},cIgQ:function(e,t,n){e.exports=n.p+"static/juanma_perez-40d4cab48d604bbf01064e91c8a06018.jpg"}}]);
//# sourceMappingURL=component---src-pages-cv-js-90152fcda800e601ca74.js.map