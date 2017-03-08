/**
 * @file mip-hf-btn 组件
 * @author
 */

define(function (require) {
	var $ = require("jquery");
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;
    	var html = "<div></div>";
        $(element).append(html);
        
        
    };


    return customElement;
});
