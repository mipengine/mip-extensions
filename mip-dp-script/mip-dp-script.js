/**
 * @author: yh
 * @date:  2016-11-10
 * @time: 15:35
 * @file: mip-dp-script.js
 * @contact: lz55.cn
 * @description: #
 */
define('extensions/mip-dp-script/0.1/mip-dp-script', ['require', 'zepto', 'customElement'], function (require) {
    var $ = require('zepto');

    var customElem = require('customElement').create();

    // 加载js文件
    var loadJSFile = function (url, callback) {

        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
		if(callback){
			// Then bind the event to the callback function.
			// There are several events for cross browser compatibility.
			script.onload = callback;
			script.onreadystatechange = function(){
				if( this.readyState=='loaded' || this.readyState=='complete'   // 这是IE的判断语句
				){
					callback();
				}
			};
		}
        // Fire the loading
        head.appendChild(script);
    };
	var evalGlobal=function (strScript){
		with(window){
			eval(strScript);
		}
	}
	var evalGlobal2=function (strScript){
        var a = document .createElement ("script" );
        a.type= "text/javascript" ;
        a.text= strScript ;
        document.getElementsByTagName ("head" )[0 ].appendChild (a) ;
	}
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        console.log('build');
        document.writeln('build');
        var $element = $(this.element);
        var geval_pre = $element.attr('geval-pre');
        var geval = $element.attr('geval');
        var loadjs = $element.attr('loadjs');
        var loadjs_end = $element.attr('loadjs-end');
        var adtag = $element.attr('adtag');
		adtag = adtag ?(adtag=='false'||adtag=='0'?false:adtag): true;	
		
		var scriptstr='';
		if(geval_pre){
			scriptstr+='<script>'+geval_pre+'</script>';
		} 
		if(loadjs){
			var loadjss=loadjs.split("\n");
			$.each(loadjss,function(index,js){
				js = $.trim(js);
				if(js){
					scriptstr+='<script src="'+js+'"></script>';
				}
			});
		}
		if(geval){
			scriptstr+='<script>'+geval+'</script>';
		} 
		if(adtag){
			$.each($('.adwraper'),function(index,obj){
				var adtag = $.trim($(obj).attr('id'));
				if(adtag){
					scriptstr+='<div id="'+adtag+'_temp" style="display:none;"><script>showads("'+adtag+'");$("#'+adtag+'").append($("#'+adtag+'_temp").children().not("script"));</script></div>';
				}
			});
			var adtags=adtag.split(',');
			for(var index in adtags){
				var adtag = $.trim(adtags[index]);
				if(adtag){
					if($("#"+adtag).length>0){
						scriptstr+='<div id="'+adtag+'_temp" style="display:none;"><script>showads("'+adtag+'");$("#'+adtag+'").append($("#'+adtag+'_temp").children().not("script"));</script></div>';
					}
					else{
						scriptstr+='<div id="'+adtag+'"><script>showads("'+adtag+'");</script></div>';
					}
				}
			}
		}
		if(loadjs_end){
			var loadjss=loadjs_end.split("\n");
			for(var i=loadjss.length-1;i>=0;i--){
				if($.trim(loadjss[i])){
					var js = $.trim(loadjss[i]);
					scriptstr+='<script src="'+js+'"></script>';
				}
			}
		}
		
		if(scriptstr){
			document.write(scriptstr);
		}
		
    };
    return customElem;
});
// 注册mip业务标签组件
require(['extensions/mip-dp-script/0.1/mip-dp-script'], function (plugindemo) {
    MIP.registerMipElement('mip-dp-script', plugindemo);
});