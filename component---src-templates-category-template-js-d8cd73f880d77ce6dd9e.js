(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Lfuo:function(t,e,a){"use strict";a.r(e);var i=a("dI71"),r=a("q1tI"),o=a.n(r),n=a("vOnD"),p=a("hTlr"),l=a("vrFN"),d=a("R5XJ"),c=n.a.div.withConfig({displayName:"categoryTemplate__CategoryView",componentId:"sc-15miqws-0"})(["margin:0px auto 0px;padding:120px 0 80px;width:100%;min-height:10px;@media(max-width:768px){margin:0px auto 0px;padding:50px 0 80px;}@media(max-width:510px){margin:0px auto 0px;padding:100px 0 80px;}.category-header{margin:100px auto;box-sizing:border-box;width:35%;p{text-align:center;font-size:50px;color:var(--primaryColor);}.category-title{text-align:center;margin-top:-10px;font-size:24px;color:var(--tertiaryColor);text-transform:uppercase;}@media(max-width:1590px){width:40%}@media(max-width:1100px){width:55%}@media(max-width:878px){width:65%}@media(max-width:510px){width:95%;}}.buttons{display:flex;justify-content:center;padding:0px;margin:0px auto 40px !important;button{color:var(--primaryColor);display:block;border:0px;-webkit-appearance:none !important;background:var(--bgColor);color:var(--primaryColor);margin:5px;width:50px;height:50px;border-radius:50%;outline:none;box-shadow:0 0 0 1px rgba(var(--primaryColorRGB),0.05),0 2px 4px rgba(var(--primaryColorRGB),0.08);&.active{background:#a3cccc;}}@media(max-width:510px){display:none;}}.post-list{display:block;&.grid{display:flex;justify-content:flex-start;flex-wrap:wrap;flex-direction:row;}}@media(min-width:768px){.post-list{transition:all 1s linear;&.grid{display:flex;justify-content:flex-start;flex-wrap:wrap;flex-direction:row;}}}"]),s=function(t){function e(){return t.apply(this,arguments)||this}return Object(i.a)(e,t),e.prototype.render=function(){var t=this,e=this.props,a=e.pageContext,i=e.data,r=e.location,n=a.category,s=i.allMarkdownRemark.edges;return o.a.createElement(p.a,{location:r},o.a.createElement(l.a,{title:n+" pills",description:"Little of knowledge about "+n,keywords:[n,"javascript","code"]}),o.a.createElement(c,null,o.a.createElement("div",{className:"category-header"},o.a.createElement("h2",{className:"category-title"},"All about ",n)),o.a.createElement("div",{className:"post-list list"},s.map((function(e){var a=e.node.frontmatter;return o.a.createElement(d.a,{listPath:t.props.location.pathname,key:a.path,frontmatter:a})})))))},e}(r.Component);e.default=s},R5XJ:function(t,e,a){"use strict";var i=a("q1tI"),r=a.n(i),o=a("Wbzz"),n=a("vOnD").a.div.withConfig({displayName:"post-item__PostItemView",componentId:"kgki13-0"})(["margin:40px auto 20px;padding:0px 20px;box-sizing:border-box;width:50%;@media(max-width:1590px){width:50%}@media(max-width:1100px){width:55%}@media(max-width:878px){width:65%}@media(max-width:510px){width:98%;margin:40px auto 0px;padding:10px;}.post-wrapper{height:100%;opacity:0;transition:opacity 600ms linear;&.fade-in{opacity:1;}.post-icon{margin-right:5px;width:8px;height:16px;background:url(",");border-radius:50%/25%;background-size:cover;background-position:center 1px;background-repeat:no-repeat;overflow:hidden;background-color:transparent;z-index:10;}.post-date{align-items:center;display:flex;margin:10px 0px 0px;font-size:12px;color:var(--primaryColor);}.post-title{align-items:center;display:flex;margin:20px 0px 20px;padding:0px;font-weight:800;line-height:1.2;font-size:26px;color:var(--tertiaryColor);font-family:'Montserrat',sans-serif;@media(max-width:510px){font-size:26px}a{text-decoration:none;color:var(--tertiaryColor) !important;}}.post-excerpt{display:block;font-size:15px;font-weight:regular;margin:3px 0 0;line-height:1.5;color:var(--primaryColor);font-weight:normal;}}"],(function(t){return t.icon}));e.a=function(t){var e=t.frontmatter,a=t.listPath;return r.a.createElement(n,{icon:e.icon.childImageSharp.fluid.src},r.a.createElement("div",{className:"post-wrapper"},r.a.createElement("div",{className:"post-container"},r.a.createElement("h2",{className:"post-title"},r.a.createElement(o.Link,{to:e.path,state:{prevPath:a}}," ",e.title," ")),r.a.createElement("div",{className:"post-date"},r.a.createElement(o.Link,{to:"/blog/category/"+e.category},r.a.createElement("img",{width:"10",src:e.icon.childImageSharp.fluid.src,alt:e.category}))," ",r.a.createElement("span",null,e.date)),r.a.createElement("div",{className:"post-excerpt"},e.excerpt))))}}}]);
//# sourceMappingURL=component---src-templates-category-template-js-d8cd73f880d77ce6dd9e.js.map