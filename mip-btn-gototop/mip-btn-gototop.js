/**
 * @file mip-btn-gototop 组件
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
        $(element).hide();
        $(window).scroll(function(){
        	$scrollTop = $(this).scrollTop();
        	if($scrollTop  > 100){
        		$(element).fadeIn(1000);
        	}else{
        		$(element).fadeOut(1000);
        	}
        })
        $(element).on('click',function(){
        	var speed = 200;
        	$("body,html").animate({
        		scrollTop:0
        	},speed);
        	 return false;
        })
    };

    return customElement;
});
