(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{179:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(184),i=n(193),c=n(191),s=n(183),l=n(225),p=n.n(l),u=s.a.div.withConfig({displayName:"sc-404__NotFoundView",componentId:"sc-131w35b-0"})(["height:100vh;width:100vw;background:url(",");background-size:cover;background-position:center center;display:flex;justify-content:center;align-items:center;flex-direction:column;h1{font-size:300px;text-transform:uppercase;color:#fff;text-align:center;line-height:1;}p{font-size:36px;color:#fff;text-align:center;text-transform:uppercase;font-family:'Mfred';letter-spacing:2.2px;a{font-family:'Mfred';text-decoration:underline;}}"],p.a);e.default=function(t){var e=t.location;return o.a.createElement(i.a,{location:e},o.a.createElement(c.a,{title:"404: Not found"}),o.a.createElement(u,null,o.a.createElement("h1",null,"404"),o.a.createElement("p",null,"Be focused or ",o.a.createElement(r.a,{to:"/"},"go Home"))))}},184:function(t,e,n){"use strict";n.d(e,"b",function(){return l});var a=n(0),o=n.n(a),r=n(58),i=n.n(r);n.d(e,"a",function(){return i.a}),n.d(e,"c",function(){return r.navigate});n(185);var c=o.a.createContext({});function s(t){var e=t.staticQueryData,n=t.data,a=t.query,r=t.render,i=n?n.data:e[a]&&e[a].data;return o.a.createElement(o.a.Fragment,null,i&&r(i),!i&&o.a.createElement("div",null,"Loading (StaticQuery)"))}var l=function(t){var e=t.data,n=t.query,a=t.render,r=t.children;return o.a.createElement(c.Consumer,null,function(t){return o.a.createElement(s,{data:e,query:n,render:a||r,staticQueryData:t})})}},185:function(t,e,n){var a;t.exports=(a=n(189))&&a.default||a},188:function(t){t.exports={data:{site:{siteMetadata:{title:"Juanma Perez"}}}}},189:function(t,e,n){"use strict";n.r(e);n(16);var a=n(0),o=n.n(a),r=n(84);e.default=function(t){var e=t.location,n=t.pageResources;return n?o.a.createElement(r.a,Object.assign({location:e,pageResources:n},n.json)):null}},191:function(t,e,n){"use strict";var a=n(192),o=n(0),r=n.n(o),i=n(198),c=n.n(i);function s(t){var e=t.description,n=t.lang,o=t.meta,i=t.title,s=a.data.site,l=e||s.siteMetadata.description;return r.a.createElement(c.a,{htmlAttributes:{lang:n},title:i,titleTemplate:"%s | "+s.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:i},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:s.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:l}].concat(o)})}s.defaultProps={lang:"en",meta:[],description:""},e.a=s},192:function(t){t.exports={data:{site:{siteMetadata:{title:"Juanma Perez",description:"I'm a web developer creating blazing fast websites and apps from scratch",author:"Juanma Perez"}}}}},193:function(t,e,n){"use strict";var a=n(188),o=n(0),r=n.n(o),i=n(184),c=n(183),s=(n(33),c.a.li.withConfig({displayName:"menuLink__MenuLinkView",componentId:"sc-1wb96j9-0"})(["cursor:pointer;font-size:18px;display:block;text-align:right;color:#323846;margin-bottom:5px;&.active{text-decoration:line-through;}&:hover{text-decoration:line-through;}"])),l=function(t,e,n,a){if("/"===t&&t!==e.pathname)Object(i.c)(t);else{var o=document.querySelector(".block-"+n);a(),"undefined"!=typeof window&&window.scroll({top:p(o).y,left:0,behavior:"smooth"})}},p=function(t){for(var e=0,n=0;t;)e+=t.offsetLeft-t.scrollLeft+t.clientLeft,n+=t.offsetTop-t.scrollTop+t.clientTop,t=t.offsetParent;return{x:e,y:n}},u=function(t){return r.a.createElement(s,null,r.a.createElement("span",{onClick:l.bind(null,t.to,t.location,t.name,t.closeMenu)},r.a.createElement("span",null,"[")," ",t.name," ",r.a.createElement("span",null,"]")))};var d=c.a.div.withConfig({displayName:"menu__MenuView",componentId:"sc-5eh4dq-0"})(["position:relative;.menu-list{opacity:0;display:none;transition:all 400ms linear;position:absolute;top:40px;right:5px;width:150px;&.open{display:block;opacity:1;}ul{list-style:none;}}#nav-icon{margin:5px;width:35px;height:20px;position:relative;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer;.bar{display:block;position:absolute;height:2px;width:100%;background:#323846;border-radius:9px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out;&:nth-child(1){top:0px}&:nth-child(2),&:nth-child(3){top:9px}&:nth-child(4){top:18px}}&.open{.bar{&:nth-child(1){top:18px;width:0%;left:50%;opacity:0;}&:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);}&:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);}&:nth-child(4){top:18px;width:0%;left:50%;opacity:0;}}}}"]),m=function(t){var e,n;function a(){for(var e,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))||this).state={open:!1},e.toggleMenu=function(){var t=e.state.open;e.setState(function(){return{open:!t}})},e}return n=t,(e=a).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,a.prototype.render=function(){var t=this.state.open;return r.a.createElement(d,null,r.a.createElement("div",{className:t?"open":"",id:"nav-icon",onClick:this.toggleMenu},r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"})),r.a.createElement("div",{className:t?"open menu-list":"menu-list"},r.a.createElement("ul",null,r.a.createElement(u,{name:"home",to:"/",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(u,{name:"about",to:"/about",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(u,{name:"works",to:"/works",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(u,{name:"contact",to:"/contact",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}))))},a}(o.Component),f=n(187);n(196),n(197);var h=c.a.header.withConfig({displayName:"header__HeaderView",componentId:"sc-1494g78-0"})(["position:fixed;top:0;left:0;width:100%;box-sizing:border-box;padding:30px 120px 20px;display:flex;justify-content:space-between;z-index:100;h1{cursor:pointer;a{font-family:'MFred';letter-spacing:1px;font-size:24px;position:relative;text-transform:uppercase;color:#323846;}}nav{display:flex;flex-direction:column;justify-content:center;.back{margin-top:5px;font-family:'Questrial';font-size:18px;cursor:pointer;text-transform:capitalize;color:#323846;span{transition:opacity 100ms linear;}&:hover{.text{text-decoration:line-through}}}}@media(max-width:480px){padding:30px 20px 20px;}"]),g=function(t){var e,n;function a(){for(var e,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))||this).animation=function(){var t=document.querySelector("header");f.d.fromTo(t,.5,{autoAlpha:0,y:-30},{autoAlpha:1,y:0,ease:f.b.easeOut})},e}n=t,(e=a).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var o=a.prototype;return o.componentDidMount=function(){this.animation()},o.render=function(){var t=this.props,e=t.siteTitle,n=t.location;return r.a.createElement(h,null,r.a.createElement("h1",{className:"web-title","data-text":e,style:{margin:0}},r.a.createElement(i.a,{"data-text":e,to:"/"}," ",e," ")),r.a.createElement("nav",null,"/"===n.pathname&&r.a.createElement(m,{location:n}),"/"!==n.pathname&&r.a.createElement(i.a,{className:"back",to:"/"}," Back ")))},a}(o.Component);g.defaultProps={siteTitle:""};var b=g;e.a=function(t){var e=t.children,n=t.location;return r.a.createElement(i.b,{query:"755544856",render:function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement(b,{siteTitle:t.site.siteMetadata.title,location:n}),r.a.createElement("div",{className:"main"},e))},data:a})}},225:function(t,e,n){t.exports=n.p+"static/404-48cbe2551f5db6accf89b823696bc389.jpg"}}]);
//# sourceMappingURL=component---src-pages-404-js-85ee442ffbaa77d38ee7.js.map