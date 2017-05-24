define(function (require) {
	var customElem = require('customElement').create();
	var $ = require('jquery');
    customElem.prototype.build = function () {
		$.getScript("http://ui.tiantis.com/Scripts/ShopDec/jquery.js?version=v2", function(){
				$.getScript("http://ui.tiantis.com/Scripts/MShopDec/PublishNew.js?version=v2&t="+Math.random(), function(){
				});
		});
		$.getScript("/weixin/JSBridge?t="+Math.random(), function(){
		});
        
    };
	return customElem
});