(window.MIP=window.MIP||[]).push({name:"mip-adsense",func:function(){define("mip-adsense/mip-adsense",["require","customElement"],function(e){var t=e("customElement").create();return t.prototype.createdCallback=function(){var e=this.element,t=e.getAttribute("ad-client"),i=e.getAttribute("ad-slot"),n=e.getAttribute("ad-format"),a=document.createElement("ins");a.classList.add("adsbygoogle"),a.setAttribute("style","display:block"),a.setAttribute("data-ad-client",t),a.setAttribute("data-ad-slot",i),a.setAttribute("data-ad-format",n);var o=document.createElement("script");o.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",o.setAttribute("async","true");var r=document.createElement("script");r.innerHTML="(adsbygoogle = window.adsbygoogle || []).push({});",e.appendChild(o),e.appendChild(a),e.appendChild(r)},t}),define("mip-adsense",["mip-adsense/mip-adsense"],function(e){return e}),function(){function e(e,t){e.registerMipElement("mip-adsense",t)}if(window.MIP)require(["mip-adsense"],function(t){e(window.MIP,t)});else require(["mip","mip-adsense"],e)}()}});