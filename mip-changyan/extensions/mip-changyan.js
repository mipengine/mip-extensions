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

		var $_element = $(_element);
		var html = [
		    '<script type="text/javascript">',
			'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "//changyan.sohu.com/upload/changyan.js?appid=' + appid + '&conf=' + conf + '";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();',
		    '</script>'
		];

		$_element.append(html.join(''));
	}

	return customElement;
	
});
