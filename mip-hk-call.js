(window.MIP=window.MIP||[]).push({name:"mip-hk-call",func:function(){define("mip-hk-call/mip-hk-call",["require","zepto","customElement","util"],function(t){function e(){var t=this.element,e=n(t).attr("type"),i=n(t).attr("urlKey"),r=n(t).attr("apk"),o=n(t).attr("page"),s="";if(void 0!==r&&"ios"!==c.os())if("1"===r)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504p.apk",o="index_hk",s="1018504p";else if("2"===r)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504q.apk",o=o,s="1018504q";else if("3"===r)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504r.apk",o=o,s="1018504r";else if("4"===r)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504s.apk",o="erji_index_level",s="1018504s";else if("5"===r)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504p.apk",o=o,s="1018504p";else if(parseInt(r,10)>5)a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan"+r+".apk",o=o,s=r+"&act="+n(t).attr("act");var p="http://wapsite.baidu.com/haokan/"+("article"===e?"doc":e)+"/detail?url_key="+encodeURIComponent(i),h="",m="";if(""!==e&&""!==i)h=e+"?url="+encodeURIComponent(i);if("ios"===c.os())m=l;else m=a;var g="baiduhaokan://"+h;if(u.match(/MicroMessenger/i))m=p;var v="";if(n(t).find(".J_app_call").attr("href",p),!d())n(t).find(".J_app_call").bind("click",function(t){if(void 0!==r&&"ios"!==c.os())(new Image).src="/tj.gif?page="+o+"&pos="+s+"&t="+(new Date).getTime();var e=Date.now();if("android"===c.os()&&1===f){if(window.location.href=g,"android"===c.os()&&1!==f||"android"===c.os()&&/baidubrowser/.test(u))v=setTimeout(function(){if(Date.now()-e<1200)window.location.href=m;clearTimeout(v)},1e3)}else if("ios"===c.os())window.location.href=g,v=setTimeout(function(){if(Date.now()-e<1200)window.location.href=m;clearTimeout(v)},1e3);else window.location.href=m;return!1})}function i(t,e,i){var n=i||"_Hao"+Math.floor(1e4*Math.random()),r=document.createElement("script");r.src=t+"&cb="+n+"&t="+(new Date).getTime(),r.type="text/javascript",r.setAttribute("charset","utf-8"),document.getElementsByTagName("head")[0].appendChild(r),window[n]=function(t){if("function"==typeof e)e(t);var i=setTimeout(function(){document.getElementsByTagName("head")[0].removeChild(r),clearTimeout(i)},20)}}var n=t("zepto"),r=t("customElement").create(),o=t("util"),s=o.platform,a="http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1015351w.apk",l="https://itunes.apple.com/cn/app/id1092031003?mt=8",c=function(){var t=new RegExp("iPhone|iPad|iPod|iPh|iPd|iOS","i"),e=new RegExp("Android|Linux","i"),i=new RegExp("^.*OS\\s(\\d.*?)\\s.*$","i"),n=new RegExp("^.*Android\\s(.*?);.*$","i"),r=window.navigator.userAgent;return{os:function(){if(s.isIos())return"ios";else return"android"},osv:function(){if(e.test(r))return r.replace(n,"$1");else if(t.test(r))return r.replace(i,"$1").replace(/_/,".");return""}}}(),u=navigator.userAgent,d=function(){if(u.match(/iPhone/i)||u.match(/iPod/i))return Boolean(u.match(/OS (9|10)_\d[_\d]* like Mac OS X/i));else return!1},f=0;if("android"===c.os())i("http://127.0.0.1:41333/ping/?callback=ping",function(t){if(0===t.error)if(f=1,!/baidubrowser/.test(navigator.userAgent))n(".J_dl_content").html("打开")},"ping");return r.prototype.firstInviewCallback=e,r}),define("mip-hk-call",["mip-hk-call/mip-hk-call"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-hk-call",e)}if(window.MIP)require(["mip-hk-call"],function(e){t(window.MIP,e)});else require(["mip","mip-hk-call"],t)}()}});