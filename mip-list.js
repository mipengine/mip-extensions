(window.MIP=window.MIP||[]).push({name:"mip-list",func:function(){define("mip-list/mip-list",["require","customElement","templates","fetch-jsonp"],function(t){function e(t){var e=this;if(t&&t.items&&t.items instanceof Array)s.render(e.element,t.items).then(i.bind(e));else console.error("数据不符合规范")}function i(t){var e=this;t.map(function(t){var i=document.createElement("div");i.innerHTML=t;var n=i.childNodes[1];if(!n.hasAttribute("role"))n.setAttribute("role","listitem");e.container.appendChild(n)})}function n(t){var i=this;if(!i.isEnd){i.button=document.querySelector(".mip-list-more"),i.button.innerHTML="加载中...";var n=o(t,i.pnName,i.pn++);a(n,{jsonpCallback:"callback"}).then(function(t){return t.json()}).then(function(t){if(!t.status&&t.data){if(e.call(i,t.data),i.button.innerHTML="点击查看更多",t.data.isEnd)i.isEnd=t.isEnd,i.button.innerHTML="已经加载完毕"}else i.button.innerHTML="加载失败"})}}function o(t,e,i){if(!t)return void console.error("mip-list 的 src 属性不能为空");if(e&&i){var n=t;if(t.indexOf("?")>0)n+="?"===t[t.length-1]?"":"&",n+=e+"="+i;else n+="?"+e+"="+i;return n}}var r=t("customElement").create(),s=t("templates"),a=t("fetch-jsonp");return r.prototype.firstInviewCallback=function(){var t=this,i=this.element;if(t.container=document.createElement("div"),t.applyFillContent(this.container),t.element.appendChild(this.container),!t.container.hasAttribute("role"))t.container.setAttribute("role","list");if(i.hasAttribute("synchronous-data")){var r=i.querySelector('script[type="application/json"]'),s=r?JSON.parse(r.textContent.toString()):null;return void e.call(t,s)}var l=i.getAttribute("src")||"",c=l;if(!l)console.error("mip-list 的 src 属性不能为空");if(t.pnName=i.getAttribute("pnName")||"pn",t.pn=i.getAttribute("pn")||1,i.hasAttribute("has-more"))t.addEventAction("more",function(){n.call(t,l)});if(i.hasAttribute("preLoad"))c=o(l,t.pnName,t.pn++),a(c,{jsonpCallback:"callback"}).then(function(t){return t.json()}).then(function(i){if(!i.status&&i.data)e.call(t,i.data)})},r}),define("mip-list",["mip-list/mip-list"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-list",e)}if(window.MIP)require(["mip-list"],function(e){t(window.MIP,e)});else require(["mip","mip-list"],t)}()}});