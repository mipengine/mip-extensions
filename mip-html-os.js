(window.MIP=window.MIP||[]).push({name:"mip-html-os",func:function(){define("mip-html-os/mip-html-os",["require","customElement"],function(t){function e(t,e){var i=!1,n=navigator.userAgent.toLowerCase();switch(e){case"android":i=n.indexOf("android")>-1;break;case"ios":i=!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i)}if(i)t.style.display="block";else t.parentNode.removeChild(t)}var i=t("customElement").create();return i.prototype.build=function(){var t=this,i=t.element.getAttribute("os");e(t.element,i)},i}),define("mip-html-os",["mip-html-os/mip-html-os"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-html-os",e)}if(window.MIP)require(["mip-html-os"],function(e){t(window.MIP,e)});else require(["mip","mip-html-os"],t)}()}});