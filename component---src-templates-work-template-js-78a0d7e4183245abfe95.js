(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{178:function(e,t,a){"use strict";a.r(t),a.d(t,"WorkQuery",function(){return m});var n=a(0),o=a.n(n),r=a(193),i=a(183),l=a(191),c=a(201),s=a(202),p=i.a.div.withConfig({displayName:"workTemplate__WorkTemplateView",componentId:"sc-13omo5y-0"})(["background:#fbf9f3;width:100%;.work-template-container{width:60%;margin:0px auto;padding:120px 0px;max-width:1000px;background:#fbf9f3;h1{text-transform:uppercase;font-size:140px;margin-bottom:50px;}.description{font-size:18px;font-weight:lighter;line-height:1.4;margin-bottom:30px;}.content{margin-bottom:60px;p{font-size:18px;font-weight:lighter;line-height:1.4;margin-bottom:30px;}}.work-image{margin-bottom:90px;.element{transition:opacity 300ms linear;}img{max-width:100%;margin-bottom:10px;}h3{text-transform:uppercase;font-size:20px;letter-spacing:1px;}}}@media(max-width:1024px){.work-template-container{width:75%;}}@media(max-width:768px){.work-template-container{width:80%;}}@media(max-width:480px){.work-template-container{width:90%;h1{text-transform:uppercase;font-size:100px;margin-bottom:30px;}.work-image{margin-bottom:50px;}}}"]),m="1713099687";t.default=function(e){var t=e.data,a=e.location,n=t.markdownRemark,i=n.frontmatter,m=n.html;return o.a.createElement(r.a,{location:a},o.a.createElement(l.a,{title:i.title,description:i.description,keywords:["web","javascript","developer"]}),o.a.createElement(p,null,o.a.createElement("div",{className:"work-template-container"},o.a.createElement("h1",null,i.title),o.a.createElement("div",{className:"description"},o.a.createElement("p",null,i.description)),o.a.createElement("div",{className:"content",dangerouslySetInnerHTML:{__html:m}}),i.images.length>0&&i.images.map(function(e){return o.a.createElement("div",{key:e.title,className:"work-image"},o.a.createElement("div",{className:"element"},o.a.createElement(c.a,{imageUrl:e.image.childImageSharp.fluid.src,title:e.title})),o.a.createElement("h3",null,e.title))})),o.a.createElement(s.a,null)))}},184:function(e,t,a){"use strict";a.d(t,"b",function(){return s});var n=a(0),o=a.n(n),r=a(58),i=a.n(r);a.d(t,"a",function(){return i.a}),a.d(t,"c",function(){return r.navigate});a(185);var l=o.a.createContext({});function c(e){var t=e.staticQueryData,a=e.data,n=e.query,r=e.render,i=a?a.data:t[n]&&t[n].data;return o.a.createElement(o.a.Fragment,null,i&&r(i),!i&&o.a.createElement("div",null,"Loading (StaticQuery)"))}var s=function(e){var t=e.data,a=e.query,n=e.render,r=e.children;return o.a.createElement(l.Consumer,null,function(e){return o.a.createElement(c,{data:t,query:a,render:n||r,staticQueryData:e})})}},185:function(e,t,a){var n;e.exports=(n=a(189))&&n.default||n},188:function(e){e.exports={data:{site:{siteMetadata:{title:"Juanma Perez"}}}}},189:function(e,t,a){"use strict";a.r(t);a(16);var n=a(0),o=a.n(n),r=a(84);t.default=function(e){var t=e.location,a=e.pageResources;return a?o.a.createElement(r.a,Object.assign({location:t,pageResources:a},a.json)):null}},191:function(e,t,a){"use strict";var n=a(192),o=a(0),r=a.n(o),i=a(198),l=a.n(i);function c(e){var t=e.description,a=e.lang,o=e.meta,i=e.title,c=n.data.site,s=t||c.siteMetadata.description;return r.a.createElement(l.a,{htmlAttributes:{lang:a},title:i,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:s},{property:"og:title",content:i},{property:"og:description",content:s},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:s}].concat(o)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},192:function(e){e.exports={data:{site:{siteMetadata:{title:"Juanma Perez",description:"I'm a web developer creating blazing fast websites and apps from scratch",author:"Juanma Perez"}}}}},193:function(e,t,a){"use strict";var n=a(188),o=a(0),r=a.n(o),i=a(184),l=a(183),c=(a(33),l.a.li.withConfig({displayName:"menuLink__MenuLinkView",componentId:"sc-1wb96j9-0"})(["cursor:pointer;font-size:18px;display:block;text-align:right;color:#323846;margin-bottom:5px;&.active{text-decoration:line-through;}&:hover{text-decoration:line-through;}"])),s=function(e,t,a,n){if("/"===e&&e!==t.pathname)Object(i.c)(e);else{var o=document.querySelector(".block-"+a);n(),"undefined"!=typeof window&&window.scroll({top:p(o).y,left:0,behavior:"smooth"})}},p=function(e){for(var t=0,a=0;e;)t+=e.offsetLeft-e.scrollLeft+e.clientLeft,a+=e.offsetTop-e.scrollTop+e.clientTop,e=e.offsetParent;return{x:t,y:a}},m=function(e){return r.a.createElement(c,null,r.a.createElement("span",{onClick:s.bind(null,e.to,e.location,e.name,e.closeMenu)},r.a.createElement("span",null,"[")," ",e.name," ",r.a.createElement("span",null,"]")))};var d=l.a.div.withConfig({displayName:"menu__MenuView",componentId:"sc-5eh4dq-0"})(["position:relative;.menu-list{opacity:0;display:none;transition:all 400ms linear;position:absolute;top:40px;right:5px;width:150px;&.open{display:block;opacity:1;}ul{list-style:none;}}#nav-icon{margin:5px;width:35px;height:20px;position:relative;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer;.bar{display:block;position:absolute;height:2px;width:100%;background:#323846;border-radius:9px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out;&:nth-child(1){top:0px}&:nth-child(2),&:nth-child(3){top:9px}&:nth-child(4){top:18px}}&.open{.bar{&:nth-child(1){top:18px;width:0%;left:50%;opacity:0;}&:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);}&:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);}&:nth-child(4){top:18px;width:0%;left:50%;opacity:0;}}}}"]),u=function(e){var t,a;function n(){for(var t,a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).state={open:!1},t.toggleMenu=function(){var e=t.state.open;t.setState(function(){return{open:!e}})},t}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this.state.open;return r.a.createElement(d,null,r.a.createElement("div",{className:e?"open":"",id:"nav-icon",onClick:this.toggleMenu},r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"})),r.a.createElement("div",{className:e?"open menu-list":"menu-list"},r.a.createElement("ul",null,r.a.createElement(m,{name:"home",to:"/",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(m,{name:"about",to:"/about",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(m,{name:"works",to:"/works",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}),r.a.createElement(m,{name:"contact",to:"/contact",location:this.props.location,closeMenu:this.toggleMenu.bind(this)}))))},n}(o.Component),f=a(187);a(196),a(197);var h=l.a.header.withConfig({displayName:"header__HeaderView",componentId:"sc-1494g78-0"})(["position:fixed;top:0;left:0;width:100%;box-sizing:border-box;padding:30px 120px 20px;display:flex;justify-content:space-between;z-index:100;h1{cursor:pointer;a{font-family:'MFred';letter-spacing:1px;font-size:24px;position:relative;text-transform:uppercase;color:#323846;}}nav{display:flex;flex-direction:column;justify-content:center;.back{margin-top:5px;font-family:'Questrial';font-size:18px;cursor:pointer;text-transform:capitalize;color:#323846;span{transition:opacity 100ms linear;}&:hover{.text{text-decoration:line-through}}}}@media(max-width:480px){padding:30px 20px 20px;}"]),g=function(e){var t,a;function n(){for(var t,a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).animation=function(){var e=document.querySelector("header");f.d.fromTo(e,.5,{autoAlpha:0,y:-30},{autoAlpha:1,y:0,ease:f.b.easeOut})},t}a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var o=n.prototype;return o.componentDidMount=function(){this.animation()},o.render=function(){var e=this.props,t=e.siteTitle,a=e.location;return r.a.createElement(h,null,r.a.createElement("h1",{className:"web-title","data-text":t,style:{margin:0}},r.a.createElement(i.a,{"data-text":t,to:"/"}," ",t," ")),r.a.createElement("nav",null,"/"===a.pathname&&r.a.createElement(u,{location:a}),"/"!==a.pathname&&r.a.createElement(i.a,{className:"back",to:"/"}," Back ")))},n}(o.Component);g.defaultProps={siteTitle:""};var x=g;t.a=function(e){var t=e.children,a=e.location;return r.a.createElement(i.b,{query:"755544856",render:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,{siteTitle:e.site.siteMetadata.title,location:a}),r.a.createElement("div",{className:"main"},t))},data:n})}},201:function(e,t,a){"use strict";var n=a(0),o=a.n(n);t.a=function(e){var t=e.title,a=e.imageUrl;return o.a.createElement("img",{alt:t,src:a})}},202:function(e,t,a){"use strict";var n=a(0),o=a.n(n),r=a(183),i=a(187),l=a(195),c=a.n(l);a(199);var s=r.a.div.withConfig({displayName:"contact-block__ContactBlockView",componentId:"sc-1hzk2fq-0"})(["width:100vw;height:100vh;background:#fbf9f3;position:relative;overflow:hidden;.cover{position:absolute;top:0;left:0;z-index:1;background:#B7C8Cb;width:100%;height:100%;}.content{position:absolute;top:0;left:0;z-index:2;background:transparent;display:flex;flex:2;flex-direction:row;width:100%;height:100%;.left,.right{position:relative;height:100%;display:flex;flex-direction:column;box-sizing:border-box;}.left{flex:.75;justify-content:center;.month,.year{color:#fff;font-size:400px;font-family:'Mfred';text-transform:uppercase;text-align:right;width:100%;display:block;line-height:.85;}}.right{flex:1.25;justify-content:center;padding:50px;color:#fff;font-size:32px;line-height:1.4;.top{letter-spacing:1px;padding:20px 0px;border-bottom:3px solid #fff;}.bottom{padding:20px 0px;span{padding:0px 10px;}i{opacity:.7;font-style:normal;}}}}@media(max-width:1300px){.content{padding:50px;box-sizing:border-box;.left{.month,.year{font-size:320px;}}}}@media(max-width:1024px){.content{flex-direction:column;justify-content:center;.left{flex-direction:row;flex:1;padding:50px 0px 0px;justify-content:flex-start;align-items:flex-end;.month,.year{text-align:left;width:min-content;display:inline;}}.right{flex:1;padding:20px 0;justify-content:flex-start;}}}@media(max-width:480px){.content{padding:50px 20px;.left{padding:50px 0px 10px;.month,.year{font-size:100px;}}.right{padding:0px 0px 30px;font-size:20px;}}}"]),p=function(e){var t,a;function n(){for(var t,a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=e.call.apply(e,[this].concat(n))||this).coverAnimation=function(){var e=new c.a.Controller,t=i.d.fromTo(".block-contact .cover",1,{scaleY:0},{scaleY:1,ease:i.b.easeIn});new c.a.Scene({triggerElement:".block-contact",triggerHook:.9,duration:"70%"}).setTween(t).addTo(e)},t.contentAnimation=function(){var e=new c.a.Controller,t=i.d.fromTo(".block-contact .content",1,{y:100,autoAlpha:0},{y:0,autoAlpha:1,ease:i.b.easeIn});new c.a.Scene({triggerElement:".block-contact",triggerHook:.2,duration:"15%"}).setTween(t).addTo(e)},t}a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a;var r=n.prototype;return r.componentDidMount=function(){this.coverAnimation(),this.contentAnimation()},r.render=function(){return o.a.createElement(s,{className:"block-contact"},o.a.createElement("div",{className:"cover"}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"left"},o.a.createElement("span",{className:"month"},"Sep"),o.a.createElement("span",{className:"year"},"'20")),o.a.createElement("div",{className:"right"},o.a.createElement("div",{className:"top"},o.a.createElement("p",null,"I'm available for freelance works."),o.a.createElement("p",null,"Say hello ",o.a.createElement("a",{className:"text",href:"mailto:juanmaperezvar@gmail.com",target:"_blank",rel:"noopener noreferrer"},"juanmaperezvar@gmail.com"))),o.a.createElement("div",{className:"bottom"},o.a.createElement("a",{className:"text",href:"https://www.linkedin.com/in/juanmaperezvargas/",target:"_blank",rel:"noopener noreferrer"},"In ")," ",o.a.createElement("i",null,"|"),o.a.createElement("a",{className:"text",href:"https://www.instagram.com/encapsulated.io/",target:"_blank",rel:"noopener noreferrer"}," Ig ")," ",o.a.createElement("i",null,"|"),o.a.createElement("a",{className:"text",href:"https://twitter.com/juanmaperezvar",target:"_blank",rel:"noopener noreferrer"}," Tw ")," ",o.a.createElement("i",null,"|"),o.a.createElement("a",{className:"text",href:"https://encapsulated.io/",target:"_blank",rel:"noopener noreferrer"}," Blog ")))))},n}(n.Component);t.a=p}}]);
//# sourceMappingURL=component---src-templates-work-template-js-78a0d7e4183245abfe95.js.map