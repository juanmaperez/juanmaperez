(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"3yTN":function(e,t,a){"use strict";a.r(t);var i=a("dI71"),r=a("q1tI"),n=a.n(r),o=a("Wbzz"),p=a("vOnD"),l=a("hTlr"),d=a("vrFN"),m=a("R5XJ"),s=a("tBDR"),c=a("cIgQ"),x=a.n(c),g=p.a.div.withConfig({displayName:"blogListTemplate__BlogView",componentId:"szf1lv-0"})(["margin:0px auto 0px;width:100%;padding:100px 0 80px;min-height:10px;@media(max-width:768px){margin:0px auto 0px;padding:50px 0 80px;}@media(max-width:510px){margin:0px auto 0px;padding:100px 0 80px;}.list-header{margin:100px auto 0px;box-sizing:border-box;width:30%;display:flex;padding:20px;.image-wrapper{margin-right:20px;img{display:block;max-width:90px;max-height:90px;border-radius:50%;width:100%;overflow:hidden;box-shadow:0 0 0 1px rgba(var(--primaryColorRGB),0.05),0 2px 4px rgba(var(--primaryColorRGB),0.08);}}.info{display:flex;flex-direction:column;justify-content:center;.list-title{text-align:left;font-size:24px;margin:0px 0px 0px;color:var(--tertiaryColor);}p{font-size:11px;line-height:1.2;&.title{font-size:15px;color:var(--tertiaryColor);font-weight:600;a{color:var(--tertiaryColor);text-decoration:underline;}}}@media(max-width:510px){.list-title{font-size:18px;text-align:center;}p{font-size:16px;}}}@media(max-width:1590px){width:30%}@media(max-width:1100px){width:30%}@media(max-width:878px){width:65%}@media(max-width:510px){margin:0px auto 50px;width:98%;flex-direction:column;align-items:center;.image-wrapper{margin-bottom:20px;}}}.buttons{display:flex;justify-content:center;padding:0px;margin:0px auto 40px !important;button{color:var(--primaryColor);display:block;border:0px;-webkit-appearance:none !important;background:var(--bgColor);color:var(--primaryColor);margin:5px;width:50px;height:50px;border-radius:50%;outline:none;box-shadow:0 0 0 1px rgba(var(--primaryColorRGB),0.05),0 2px 4px rgba(var(--primaryColorRGB),0.08);&.active{background:#a3cccc;}}@media(max-width:510px){display:none;}}.post-list{display:block;&.grid{display:flex;justify-content:flex-start;flex-wrap:wrap;flex-direction:row;}}.pagination{display:flex;justify-content:space-between;width:40%;margin:10px auto;@media(max-width:480px){width:95%;}}@media(min-width:768px){.post-list{transition:all 1s linear;&.grid{margin:0px auto;max-width:1496px;display:flex;justify-content:flex-start;flex-wrap:wrap;flex-direction:row;}}}"]),h=function(e){function t(){return e.apply(this,arguments)||this}return Object(i.a)(t,e),t.prototype.render=function(){var e=this.props.location,t=this.props.data.allMarkdownRemark.edges,a=this.props.pageContext,i=a.currentPage,r=1===i,p=i===a.numPages,c=i-1==1?"/blog":"/blog/page/"+(i-1).toString(),h="/blog/page/"+(i+1).toString();return n.a.createElement(l.a,{location:e},n.a.createElement(d.a,{title:"Juanma Perez | Blog",description:"Juanma Perez personal blog about javascript and other technologies. Sometimes I also write about bread or recipes",keywords:["javascript","development","front end","react","angular","gatsbyjs"]}),n.a.createElement(g,null,n.a.createElement("div",{className:"list-header"},n.a.createElement("div",{className:"image-wrapper"},n.a.createElement(s.a,{width:"90",height:"90",imageUrl:x.a,title:"juanma perez"})),n.a.createElement("div",{className:"info"},n.a.createElement("p",{className:"title"},"Personal blog by ",n.a.createElement("a",{href:"https://twitter.com/juanmaperezvar",target:"blank"},"Juanma Perez")),n.a.createElement("p",null,"What I learned about javascript and bread"))),n.a.createElement("div",{className:"post-list list"},t.map((function(t){var a=t.node.frontmatter;return n.a.createElement(m.a,{listPath:e.pathname,key:a.path,frontmatter:a})}))),n.a.createElement("div",{className:"pagination"},n.a.createElement("div",null,!r&&n.a.createElement(o.Link,{to:c,rel:"prev"},"← Previous Page")),n.a.createElement("div",null,!p&&n.a.createElement(o.Link,{to:h,rel:"next"},"Next Page →")))))},t}(r.Component);t.default=h},R5XJ:function(e,t,a){"use strict";var i=a("q1tI"),r=a.n(i),n=a("Wbzz"),o=a("vOnD").a.div.withConfig({displayName:"post-item__PostItemView",componentId:"kgki13-0"})(["margin:40px auto 20px;padding:0px 20px;box-sizing:border-box;width:50%;@media(max-width:1590px){width:50%}@media(max-width:1100px){width:55%}@media(max-width:878px){width:65%}@media(max-width:510px){width:98%;margin:40px auto 0px;padding:10px;}.post-wrapper{height:100%;.post-icon{margin-right:5px;width:8px;height:16px;background:url(",");border-radius:50%/25%;background-size:cover;background-position:center 1px;background-repeat:no-repeat;overflow:hidden;background-color:transparent;z-index:10;}.post-date{align-items:center;display:flex;margin:10px 0px 0px;font-size:12px;color:var(--primaryColor);}.post-title{align-items:center;display:flex;margin:20px 0px 20px;padding:0px;font-weight:800;line-height:1.2;font-size:26px;color:var(--tertiaryColor);font-family:'Montserrat',sans-serif;@media(max-width:510px){font-size:26px}a{text-decoration:none;color:var(--tertiaryColor) !important;}}.post-excerpt{display:block;font-size:15px;font-weight:regular;margin:3px 0 0;line-height:1.5;color:var(--primaryColor);font-weight:normal;}}"],(function(e){return e.icon}));t.a=function(e){var t=e.frontmatter,a=e.listPath;return r.a.createElement(o,{icon:t.icon.childImageSharp.fluid.src},r.a.createElement("div",{className:"post-wrapper"},r.a.createElement("div",{className:"post-container"},r.a.createElement("h2",{className:"post-title"},r.a.createElement(n.Link,{to:t.path,state:{prevPath:a}}," ",t.title," ")),r.a.createElement("div",{className:"post-date"},r.a.createElement(n.Link,{to:"/blog/category/"+t.category},r.a.createElement("img",{width:"10",src:t.icon.childImageSharp.fluid.src,alt:t.category}))," ",r.a.createElement("span",null,t.date)),r.a.createElement("div",{className:"post-excerpt"},t.excerpt))))}},cIgQ:function(e,t,a){e.exports=a.p+"static/juanma_perez-40d4cab48d604bbf01064e91c8a06018.jpg"},tBDR:function(e,t,a){"use strict";var i=a("q1tI"),r=a.n(i);t.a=function(e){var t=e.title,a=e.imageUrl;return r.a.createElement("img",{alt:t,src:a})}}}]);
//# sourceMappingURL=component---src-templates-blog-list-template-js-e085fc013ef4d8a7d21a.js.map