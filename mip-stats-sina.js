(window.MIP=window.MIP||[]).push({name:"mip-stats-sina",func:function(){define("mip-stats-sina/mip-stats-sina",["require","zepto","customElement"],function(t){function e(t,e,i){n(t);n.each(e,function(e,o){i[o]=n(t).attr(o)||""})}function i(t){return new Promise(function(e,i){var o=document.createElement("script");o.src=t,n("body").append(o),o.onload=function(){e()}})}var n=t("zepto"),o=t("customElement").create();window.sudaMapConfig={uId:"",pageId:""};var r=location.protocol,s=r+"//mjs"+("https:"===r?"s":"")+".sinaimg.cn/wap/public/suda/201607111020/";return o.prototype.build=function(){var t=this.element;i(s+"suda_log.min.js").then(function(){return i(s+"suda_map.min.js")}).then(function(){if(e(t,["uId","pageId"],window.sudaMapConfig),window.suda_init)window.suda_init(window.sudaMapConfig.pageId,100)})},o}),define("mip-stats-sina",["mip-stats-sina/mip-stats-sina"],function(t){return t}),function(){function t(t,e){t.registerMipElement("mip-stats-sina",e)}if(window.MIP)require(["mip-stats-sina"],function(e){t(window.MIP,e)});else require(["mip","mip-stats-sina"],t)}()}});