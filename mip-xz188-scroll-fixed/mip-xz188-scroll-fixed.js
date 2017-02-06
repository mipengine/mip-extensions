/**
 * @file mip-xz188-scroll-fixed 组件
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
        var obj = $(element).find(".title");
        var game_load =$(element).find(".game_load");
        $(window).scroll(function () {
             var scrollTop = $("body").scrollTop();
             var headerHeight = $(".header").height() + 90;
                if (scrollTop > headerHeight) {
                    game_load.css({"position":"fixed","top":"50px"});
                    obj.css("background-color","#3dad0e"); 
                }else {
                   game_load.css({"position":"relative","top":"0"});
                    obj.css("background-color","#3498db");
                }
         });
    };

    return customElement;
});
