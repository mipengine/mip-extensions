define("mip-ad/mip-ad-baidussp",["require"],function(e){function t(e,t){var i=e.getAttribute("sspId"),n=document.createElement("script");n.src="//dup.baidustatic.com/js/os.js",e.appendChild(n),n.onload=function(){var n=document.createElement("div");n.id="_"+Math.random().toString(36).slice(2),e.appendChild(n);var r=document.createElement("script");r.innerHTML='BAIDU_CLB_fillSlotAsync("'+i+'","'+n.id+'");',e.appendChild(r),t.applyFillContent(n,!0)}}return{render:t}});