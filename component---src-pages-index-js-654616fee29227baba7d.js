(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{180:function(e,t,n){"use strict";n.r(t);n(63),n(126),n(46),n(35),n(28),n(24),n(45),n(59),n(12),n(34);var a=n(0),o=n.n(a),r=n(190),i=n(195),p=n(182),l=n(186),c=n(189),s=n.n(c),m=(n(193),n(194),n(225)),d=n.n(m),u=n(226),f=n.n(u);var h=p.a.div.withConfig({displayName:"main-block__MainBlockView",componentId:"sc-1mmtf7x-0"})(["min-height:100vh;width:100vw;position:relative;overflow:hidden;&.first{background-attachment:fixed !important;background-size:cover !important;background-position:center center !important;background:url(",");}&.second{background-attachment:fixed !important;background-size:cover !important;background-position:center center !important;background:url(",");}.main-block-cover{background:#fbf9f3;position:absolute;width:100%;height:100%;z-index:10;transform-origin:0 0;&.no-visible{display:none;}}.main-list{position:absolute;bottom:50px;right:120px;padding:0px;li{font-size:18px;margin-bottom:5px;text-align:right;cursor:pointer;color:#323846;span{transition:all 100ms linear;}&:hover{.text{text-decoration:line-through}}}}@media(min-width:1200px){}@media(max-width:1199px){}@media(max-width:768px){}@media(max-width:520px){.main-list{right:20px;bottom:10px;}}"],f.a,d.a),g=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).animation=function(){(new l.c).fromTo(".first",.4,{autoAlpha:0},{autoAlpha:1}).fromTo(".main-block-cover",.5,{scaleX:0},{className:"-=no-visible",scaleX:1,ease:l.b.easeIn},"+=0.9").to(".first",.2,{className:"+=second"}).to(".second",.1,{className:"+=first"}).fromTo(".main-block-cover",.5,{scaleY:1},{scaleY:0,ease:l.b.easeIn}).staggerFromTo(".main-list li",.6,{y:20,autoAlpha:0},{y:0,autoAlpha:1,ease:l.a.easeNone,onComplete:t.animationIsCompleted},.2).delay(2)},t.removeSocial=function(){var e=new s.a.Controller,t=l.d.fromTo(".main-list",.6,{autoAlpha:1},{autoAlpha:0});new s.a.Scene({triggerElement:".main-list",triggerHook:.2,duration:"10%"}).setTween(t).addTo(e)},t.animationIsCompleted=function(){t.props.markAsCompleted()},t}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var r=a.prototype;return r.componentDidMount=function(){this.props.animationCompleted||this.animation(),"undefined"!=typeof window&&this.removeSocial()},r.render=function(){return o.a.createElement(h,{className:"first block-home"},o.a.createElement("div",{className:"main-block-cover no-visible"}),o.a.createElement("ul",{className:"main-list"},o.a.createElement("li",null,o.a.createElement("span",null,"Ig: [")," ",o.a.createElement("span",{className:"text"},"@ladyphoto")," ",o.a.createElement("span",null,"]")),o.a.createElement("li",null,o.a.createElement("span",null,"Tw: [")," ",o.a.createElement("span",{className:"text"},"@ladyMadrid")," ",o.a.createElement("span",null,"]")),o.a.createElement("li",null,o.a.createElement("span",null,"Be: [")," ",o.a.createElement("span",{className:"text"},"/ladyMadridPhoto")," ",o.a.createElement("span",null,"]"))))},a}(a.Component),x=n(202),w=n(199),b=n(227),y=n.n(b);var v=p.a.div.withConfig({displayName:"about-block__AboutBlockView",componentId:"sc-1u29thd-0"})(["min-height:100vh;padding-top:100px;background:#fbf9f3;width:100vw;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;align-items:center;position:relative;overflow:hidden;.about-wrapper{background:#fbf9f3;position:relative;top:0;left:0;-webkit-clip-path:inset(0 0 0 0);clip-path:inset(0 0 0 0);.image{position:fixed;right:120px;bottom:10px !important;width:32vw;&.absolute{position:absolute;}img{max-width:100%;}}.intro-text{position:relative;z-index:10;width:75%;font-size:6vw;color:#f0d0d5;line-height:1.2;padding:100vh 120px 50px;box-sizing:border-box;p{mix-blend-mode:difference;margin-bottom:100px;opacity:0;transition:opacity 600ms linear;&.fade-in{opacity:1;}strong,a{color:#f0d0d5;-webkit-text-stroke:0.0002em #f0d0d5;&:hover{text-decoration:underline}}}}}@media(max-width:1080px){padding-top:200px;min-height:400px;.about-wrapper{.intro-text{padding:20px;font-size:9vw;p{margin-bottom:80px;}}.image{position:fixed;right:70px;bottom:35px !important;width:60vw;}}}@media(max-width:1024px){.about-wrapper{.intro-text{width:85%;p{font-size:9vw;}}}}@media(max-width:768px){padding-top:200px;min-height:400px;.about-wrapper{.intro-text{font-size:9vw;width:85%;p{margin-bottom:50px;}}}}@media(max-width:480px){padding-top:120px;min-height:","px;.about-wrapper{.intro-text{padding:10px;-webkit-text-stroke:0px #323846;font-size:9vw;p{margin-bottom:40px;strong{color:#323846;-webkit-text-stroke:0px #323846;}}}.image{right:20px;width:70vw;}}}"],function(e){return e.height/1.2}),k=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).showImage=function(){var e=new s.a.Controller,t=l.d.fromTo(".image",.6,{autoAlpha:0,x:60},{autoAlpha:1,x:0});new s.a.Scene({triggerElement:".about-wrapper",triggerHook:.19,duration:"20%"}).setTween(t).addTo(e)},t}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var r=a.prototype;return r.componentDidMount=function(){"undefined"!=typeof window&&this.showImage(),"undefined"!=typeof window&&this.hideImage()},r.hideImage=function(){var e=new s.a.Controller,t=l.d.to(".image",1e-5,{className:"+=absolute"});new s.a.Scene({triggerElement:".works-section",triggerHook:1}).setTween(t).addTo(e)},r.render=function(){var e=this.props.height;return o.a.createElement(v,{className:"block-about",height:e},o.a.createElement("div",{className:"about-wrapper"},o.a.createElement("div",{className:"image"},o.a.createElement(w.a,{imageUrl:y.a,title:"lady madrid"})),o.a.createElement("div",{className:"intro-text"},o.a.createElement(x.a,null,o.a.createElement(x.b,{classToggle:"fade-in",triggerHook:.8},o.a.createElement("p",null,"I'm ",o.a.createElement("span",null,"Lady Madrid "),", a photographer from Seville and based in London looking for new experiences."))),o.a.createElement(x.a,null,o.a.createElement(x.b,{classToggle:"fade-in",triggerHook:.8},o.a.createElement("p",null,"I've been my whole life capturing moments into my camera, some funny, some sad and some really special."))),o.a.createElement(x.a,null,o.a.createElement(x.b,{classToggle:"fade-in",triggerHook:.8},o.a.createElement("p",null,"It's this site where I chose to publicy my work with all the people who love photography as much as me."))),o.a.createElement(x.a,null,o.a.createElement(x.b,{classToggle:"fade-in",triggerHook:.8},o.a.createElement("p",null,"Also you can find me in social media ",o.a.createElement("br",null),o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/ladymadrid"},"Instagram"),",",o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/ladymadrid"},"Behance")," or ",o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/ladymadrid"},"Twitter"),"."))))))},a}(a.Component),E=(n(185),n(183));var N=p.a.div.withConfig({displayName:"workItem__WorkItemView",componentId:"sc-1y3zcpu-0"})(["width:100%;height:1000px;display:flex;justify-content:",";.work-container{width:600px;height:900px;position:absolute;max-height:100%;overflow:hidden;.image-wrapper{z-index:6;top:0;position:absolute;width:600px;height:900px;.title{z-index:5;position:absolute;transform:rotate(-90deg);width:180px;bottom:80px;",";padding:5px 10px;font-size:20px;letter-spacing:1px;font-weight:lighter;color:#666;text-transform:uppercase;background:#fbf9f3;font-family:'Mfred';}.image{top:-150px;position:relative;height:1100px;background-size:cover !important;background-repeat:no-repeat !important;background-position:center center !important;}}}@media(max-width:1300px){height:900px;.work-container{height:700px !important;width:500px !important;background:grey;.image-wrapper{height:700px !important;width:500px !important;.image{height:900px;}}}}@media(max-width:768px){}@media(max-width:480px){height:700px;.work-container{height:500px !important;width:350px !important;background:grey;.image-wrapper{height:500px !important;width:350px !important;.image{height:650px;}}}}"],function(e){return e.top%2?"flex-start":"flex-end"},function(e){return Number(e.top)%2==0?"right: -88px":"left: -88px;"}),C=function(e){var t,n;function a(){return e.apply(this,arguments)||this}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var r=a.prototype;return r.componentDidMount=function(){"undefined"!=typeof window&&this.imageAnimation(),"undefined"!=typeof window&&this.imageWrapperAnimation()},r.imageAnimation=function(){var e=this.props,t=e.work,n=e.top,a=new s.a.Controller,o=l.d.fromTo(".image-"+t.type+"-"+n,1,{y:0},{y:140,ease:l.a.easeNone});new s.a.Scene({triggerElement:".wrapper-"+t.type+"-"+n,triggerHook:.1,duration:"110%"}).setTween(o).addTo(a)},r.imageWrapperAnimation=function(){var e=this.props,t=e.work,n=e.top,a=new s.a.Controller,o=l.d.fromTo(".work-"+t.type+"-"+n,1,{y:0},{y:n<4?-75*n:-10*n-200,ease:l.b.easeIn});new s.a.Scene({triggerElement:".work-"+t.type+"-"+n,triggerHook:.9,duration:"90%"}).setTween(o).addTo(a)},r.render=function(){var e=this.props,t=e.work,n=e.top;return o.a.createElement(N,{top:n},o.a.createElement("div",{className:"work-container work-"+t.type+"-"+n},o.a.createElement(E.a,{to:""+t.path,className:"image-wrapper wrapper-"+t.type+"-"+n},o.a.createElement("div",{className:"image image-"+t.type+"-"+n,style:{background:"url("+t.thumbnail.childImageSharp.fluid.src+")"}}),o.a.createElement("span",{to:""+t.path,className:"title"},t.title))))},a}(a.Component),_=p.a.div.withConfig({displayName:"works-block__WorksBlockView",componentId:"sc-1v7fzow-0"})(["position:relative;width:100vw;min-height:100vh;background:#fbf9f3;padding:300px 200px 100px;box-sizing:border-box;overflow:hidden;.section-title{position:absolute;font-size:20vw;top:160px;left:120px;text-transform:uppercase;font-family:'MFred';color:#B7C8Cb;z-index:10;}@media(max-width:1300px){padding:300px 120px 100px;}@media(max-width:1024px){padding:200px 90px 100px;.section-title{top:60px;left:50px;}}@media(max-width:768px){padding:150px 60px 100px;.section-title{top:40px;left:50px;font-size:22vw;}}@media(max-width:480px){padding:100px 25px 100px;.section-title{top:30px;left:20px;font-size:32vw;}}"]),T=function(e){var t=e.type,n=e.works;return o.a.createElement(_,{className:"block-works"},o.a.createElement("h2",{className:"section-title"},t),n.map(function(e,t){return o.a.createElement(C,{key:t,top:t,work:e})}))},z=n(200);function A(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n.d(t,"query",function(){return M});var I=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).state={animationCompleted:!1,workTypes:null},t.completeAnimation=function(){t.setState({animationCompleted:!0}),t.setCookie()},t.checkCookies=function(){var e=document.cookie,t={};return e.split(";").forEach(function(e){var n=e.split("=");t[n[0].trim().toString()]=n[1]}),t.animationCompleted},t.setCookie=function(){var e=new Date;e.setTime(e.getTime()+864e5),document.cookie="animationCompleted=true; expires="+e.toGMTString()},t}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var p=a.prototype;return p.componentDidMount=function(){var e=this.props.data.allMarkdownRemark.edges.map(function(e){return e.node.frontmatter});this.setState({animationCompleted:!!this.checkCookies(),workTypes:e.reduce(function(e,t){return e[t.type]?e[t.type].works=[].concat(A(e[t.type].works),[t]):e[t.type]={type:t.type,works:[t]},e},{})})},p.render=function(){var e=this.state,t=e.animationCompleted,n=e.workTypes,a=this.props.location;return o.a.createElement(r.a,{location:a},o.a.createElement(i.a,{title:"Home"}),n&&o.a.createElement(g,{markAsCompleted:this.completeAnimation.bind(this),animationCompleted:t}),t&&o.a.createElement(k,null),o.a.createElement("div",{className:"works-section"},t&&Object.keys(n).map(function(e,t){return o.a.createElement(T,{index:t,key:n[e].type,type:n[e].type,works:n[e].works})})),t&&o.a.createElement(z.a,null))},a}(a.Component),M="1386599956";t.default=I},183:function(e,t,n){"use strict";n.d(t,"b",function(){return c});var a=n(0),o=n.n(a),r=n(58),i=n.n(r);n.d(t,"a",function(){return i.a}),n.d(t,"c",function(){return r.navigate});n(184);var p=o.a.createContext({});function l(e){var t=e.staticQueryData,n=e.data,a=e.query,r=e.render,i=n?n.data:t[a]&&t[a].data;return o.a.createElement(o.a.Fragment,null,i&&r(i),!i&&o.a.createElement("div",null,"Loading (StaticQuery)"))}var c=function(e){var t=e.data,n=e.query,a=e.render,r=e.children;return o.a.createElement(p.Consumer,null,function(e){return o.a.createElement(l,{data:t,query:n,render:a||r,staticQueryData:e})})}},184:function(e,t,n){var a;e.exports=(a=n(188))&&a.default||a},187:function(e){e.exports={data:{site:{siteMetadata:{title:"Photographer"}}}}},188:function(e,t,n){"use strict";n.r(t);n(16);var a=n(0),o=n.n(a),r=n(84);t.default=function(e){var t=e.location,n=e.pageResources;return n?o.a.createElement(r.a,Object.assign({location:t,pageResources:n},n.json)):null}},190:function(e,t,n){"use strict";var a=n(187),o=n(0),r=n.n(o),i=n(183),p=n(182),l=(n(33),p.a.li.withConfig({displayName:"menuLink__MenuLinkView",componentId:"sc-125ebef-0"})(["cursor:pointer;font-size:18px;display:block;text-align:right;color:#323846;margin-bottom:5px;&.active{text-decoration:line-through;}&:hover{text-decoration:line-through;}"])),c=function(e,t,n){if("/"===e&&e!==t.pathname)Object(i.c)(e);else{var a=document.querySelector(".block-"+n);"undefined"!=typeof window&&window.scroll({top:s(a).y,left:0,behavior:"smooth"})}},s=function(e){for(var t=0,n=0;e;)t+=e.offsetLeft-e.scrollLeft+e.clientLeft,n+=e.offsetTop-e.scrollTop+e.clientTop,e=e.offsetParent;return{x:t,y:n}},m=function(e){return r.a.createElement(l,null,r.a.createElement("span",{onClick:c.bind(null,e.to,e.location,e.name)},r.a.createElement("span",null,"[")," ",e.name," ",r.a.createElement("span",null,"]")))};var d=p.a.div.withConfig({displayName:"menu__MenuView",componentId:"sc-1hara5v-0"})(["position:relative;.menu-list{opacity:0;display:none;transition:all 400ms linear;position:absolute;top:40px;right:5px;width:150px;&.open{display:block;opacity:1;}ul{list-style:none;}}#nav-icon{margin:5px;width:35px;height:20px;position:relative;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer;.bar{display:block;position:absolute;height:2px;width:100%;background:#323846;border-radius:9px;opacity:1;left:0;-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out;&:nth-child(1){top:0px}&:nth-child(2),&:nth-child(3){top:9px}&:nth-child(4){top:18px}}&.open{.bar{&:nth-child(1){top:18px;width:0%;left:50%;opacity:0;}&:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg);}&:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg);}&:nth-child(4){top:18px;width:0%;left:50%;opacity:0;}}}}"]),u=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).state={open:!1},t.toggleMenu=function(){var e=t.state.open;t.setState(function(){return{open:!e}})},t}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){var e=this.state.open;return r.a.createElement(d,null,r.a.createElement("div",{className:e?"open":"",id:"nav-icon",onClick:this.toggleMenu},r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"}),r.a.createElement("span",{className:"bar"})),r.a.createElement("div",{className:e?"open menu-list":"menu-list"},r.a.createElement("ul",null,r.a.createElement(m,{name:"home",to:"/",location:this.props.location}),r.a.createElement(m,{name:"about",to:"/about",location:this.props.location}),r.a.createElement(m,{name:"works",to:"/works",location:this.props.location}),r.a.createElement(m,{name:"contact",to:"/contact",location:this.props.location}))))},a}(o.Component),f=n(186);n(197),n(198);var h=p.a.header.withConfig({displayName:"header__HeaderView",componentId:"sc-130rxa0-0"})(["position:fixed;top:0;left:0;width:100%;box-sizing:border-box;padding:30px 120px 20px;display:flex;justify-content:space-between;z-index:100;h1{cursor:pointer;a{font-family:'MFred';letter-spacing:1px;font-size:24px;position:relative;text-transform:uppercase;color:#323846;}}nav{a{font-family:'Questrial';font-size:18px;cursor:pointer;text-transform:capitalize;color:#323846;span{transition:opacity 100ms linear;}&:hover{.text{text-decoration:line-through}}}}@media(max-width:480px){padding:30px 20px 20px;}"]),g=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).animation=function(){var e=document.querySelector("header");f.d.fromTo(e,.5,{autoAlpha:0,y:-30},{autoAlpha:1,y:0,ease:f.b.easeOut})},t}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var o=a.prototype;return o.componentDidMount=function(){this.animation()},o.render=function(){var e=this.props,t=e.siteTitle,n=e.location;return console.log(n),r.a.createElement(h,null,r.a.createElement("h1",{className:"web-title","data-text":"Photographer",style:{margin:0}},r.a.createElement(i.a,{"data-text":"Photographer",to:"/"}," ",t," ")),r.a.createElement("nav",null,"/"===n.pathname&&r.a.createElement(u,{location:n}),"/"!==n.pathname&&r.a.createElement(i.a,{to:"/"}," Back ")))},a}(o.Component);g.defaultProps={siteTitle:""};var x=g;t.a=function(e){var t=e.children,n=e.location;return r.a.createElement(i.b,{query:"755544856",render:function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(x,{siteTitle:e.site.siteMetadata.title,location:n}),r.a.createElement("div",{className:"main"},t))},data:a})}},195:function(e,t,n){"use strict";var a=n(196),o=n(0),r=n.n(o),i=n(201),p=n.n(i);function l(e){var t=e.description,n=e.lang,o=e.meta,i=e.title,l=a.data.site,c=t||l.siteMetadata.description;return r.a.createElement(p.a,{htmlAttributes:{lang:n},title:i,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:c},{property:"og:title",content:i},{property:"og:description",content:c},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:i},{name:"twitter:description",content:c}].concat(o)})}l.defaultProps={lang:"en",meta:[],description:""},t.a=l},196:function(e){e.exports={data:{site:{siteMetadata:{title:"Photographer",description:"Professional photographer portfolio. Let everyone know about your work ",author:"Juanma Perez"}}}}},199:function(e,t,n){"use strict";var a=n(0),o=n.n(a);t.a=function(e){var t=e.title,n=e.imageUrl;return o.a.createElement("img",{alt:t,src:n})}},200:function(e,t,n){"use strict";var a=n(0),o=n.n(a),r=n(182),i=n(189),p=n.n(i),l=(n(193),n(194),n(186));var c=r.a.div.withConfig({displayName:"contact-block__ContactBlockView",componentId:"qp6uq5-0"})(["width:100vw;height:100vh;background:#fbf9f3;position:relative;overflow:hidden;.cover{position:absolute;top:0;left:0;z-index:1;background:#B7C8Cb;width:100%;height:100%;}.content{position:absolute;top:0;left:0;z-index:2;background:transparent;display:flex;flex:2;flex-direction:row;width:100%;height:100%;.left,.right{position:relative;height:100%;display:flex;flex-direction:column;box-sizing:border-box;}.left{flex:.75;justify-content:center;.month,.year{color:#fff;font-size:400px;font-family:'Mfred';text-transform:uppercase;text-align:right;width:100%;display:block;line-height:.85;}}.right{flex:1.25;justify-content:center;padding:50px;color:#fff;font-size:32px;line-height:1.4;.top{letter-spacing:1px;padding:20px 0px;border-bottom:3px solid #fff;}.bottom{padding:20px 0px;span{padding:0px 10px;}i{opacity::.7;font-style:normal;}}}}@media(max-width:1300px){.content{padding:50px;box-sizing:border-box;.left{.month,.year{font-size:320px;}}}}@media(max-width:1024px){.content{flex-direction:column;justify-content:center;.left{flex-direction:row;flex:1;padding:50px 0px 0px;justify-content:flex-start;align-items:flex-end;.month,.year{text-align:left;width:min-content;display:inline;}}.right{flex:1;padding:20px 0;justify-content:flex-start;}}}@media(max-width:480px){.content{padding:50px 20px;.left{padding:50px 0px 10px;.month,.year{font-size:100px;}}.right{padding:0px 0px 30px;font-size:20px;}}}"]),s=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(t=e.call.apply(e,[this].concat(a))||this).coverAnimation=function(){var e=new p.a.Controller,t=l.d.fromTo(".block-contact .cover",1,{scaleY:0},{scaleY:1,ease:l.b.easeIn});new p.a.Scene({triggerElement:".block-contact",triggerHook:.9,duration:"70%"}).setTween(t).addTo(e)},t.contentAnimation=function(){var e=new p.a.Controller,t=l.d.fromTo(".block-contact .content",1,{y:100,autoAlpha:0},{y:0,autoAlpha:1,ease:l.b.easeIn});new p.a.Scene({triggerElement:".block-contact",triggerHook:.2,duration:"15%"}).setTween(t).addTo(e)},t}n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n;var r=a.prototype;return r.componentDidMount=function(){"undefined"!=typeof window&&this.coverAnimation(),"undefined"!=typeof window&&this.contentAnimation()},r.render=function(){return o.a.createElement(c,{className:"block-contact"},o.a.createElement("div",{className:"cover"}),o.a.createElement("div",{className:"content"},o.a.createElement("div",{className:"left"},o.a.createElement("span",{className:"month"},"Sept"),o.a.createElement("span",{className:"year"},"'19")),o.a.createElement("div",{className:"right"},o.a.createElement("div",{className:"top"},o.a.createElement("p",null,"I'm available for freelance works."),o.a.createElement("p",null,"Say hello hi@ladymadrid.com")),o.a.createElement("div",{className:"bottom"},o.a.createElement("span",null,"Be ")," ",o.a.createElement("i",null,"|")," ",o.a.createElement("span",null," Ig ")," ",o.a.createElement("i",null,"|")," ",o.a.createElement("span",null," Tw ")))))},a}(a.Component);t.a=s},225:function(e,t,n){e.exports=n.p+"static/first-354df61e598207c45d63643d98035017.jpg"},226:function(e,t,n){e.exports=n.p+"static/second-f6e9533507897b7e72cd001622d055fd.jpg"},227:function(e,t,n){e.exports=n.p+"static/girl-cb023f6cd997374e0167db178ddefe95.jpg"}}]);
//# sourceMappingURL=component---src-pages-index-js-654616fee29227baba7d.js.map