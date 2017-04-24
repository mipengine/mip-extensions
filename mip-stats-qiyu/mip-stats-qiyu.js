/**
 * @file mip-stats-qiyu 组件
 * @author marhey
 */
define(function(require) {
	var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function() {
        var element = this.element;
        var token = element.getAttribute('token');
        var qiyu = document.createElement('script');
        qiyu.src = "https://qiyukf.com/script/" + token + ".js";
        $(element).append(qiyu);
    };
    return customElement;
});
