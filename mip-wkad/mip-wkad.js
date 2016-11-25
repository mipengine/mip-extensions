define(function(require){

    var $ = require('zepto');
    var customElem = require('customElement').create();
	var loadAd = function(elem, className, content){
		var el = document.createElement('div');
		var script = document.createElement('script');
		var json = JSON.parse(content);
		el.className = className;
		script.type = 'text/javascript';
		script.innerHTML = json.join('');
		$(elem).append(el);
		$(el).append(script);
	};
	
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
       var elem = this.element;
	   var elStr = $(elem).attr('el');
	   var adStr = $(elem).attr('ads');
	   loadAd(elem, elStr, adStr);
	}
	
	return customElem;
});