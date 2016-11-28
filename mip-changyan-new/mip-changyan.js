/**
* 畅言插件
* @author smileU
* @version 1.0.0
*/
define(function(require) {
	var $ = require('zepto');
	
	var customElement = require('customElement').create();
	
	customElement.prototype.createdCallback = function () {
		
		var _element = this.element;

		var appid = _element.getAttribute('appid'),
		conf = _element.getAttribute("conf");
		
		var width = window.innerWidth || document.documentElement.clientWidth; 
		if (width < 960) { 
			window.document.write('<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="http://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + appid + '&conf=' + conf + '"><\/script>'); 
		} else { 
			var loadJs=function(d,a){
				var c=document.getElementsByTagName("head")[0]||document.head||document.documentElement;
				var b=document.createElement("script");
				b.setAttribute("type","text/javascript");
				b.setAttribute("charset","UTF-8");
				b.setAttribute("src",d);
				if(typeof a==="function"){
					if(window.attachEvent){
						b.onreadystatechange=function(){
							var e=b.readyState;
							if(e==="loaded"||e==="complete"){
								b.onreadystatechange=null;
								a()
							}
						}
					}else{
						b.onload=a
					}
				}c.appendChild(b)
			};
			loadJs("http://changyan.sohu.com/upload/changyan.js",function(){
				window.changyan.api.config({appid:appid,conf:conf})
			});
		} 
	}

	return customElement;
	
});
