define('mip-wkad-config', ['require', 'customElement', 'zepto'], function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();
	var loadJs = function(elem, url){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        $(elem).append(script);
	};
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
       var elem = this.element;
	   var attr = $(elem).attr('aid');
	   
	   switch(attr){
		   case 'take_ip': 
			loadJs(elem, 'http://ip.display.xywy.com/take_ip');
		    break;
		   case 'display_load':
			loadJs(elem, 'http://a.xywy.com/display/display_load.js');
		    break;
		   case 'stat':
			loadJs(elem, 'http://a.xywy.com/stat.js');
		    break;
			default:
			break;
	   }
		
	}
	return customElem;
});

require(['mip-wkad-config'], function (plugindemo) {
    MIP.registerMipElement('mip-wkad-config', plugindemo);
});