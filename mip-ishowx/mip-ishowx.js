/**
 * @author tenni
 * @date 2016-11-23
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
		//返回顶部
        $(window).scroll(function(){
            if ($(window).scrollTop()>600){
                $(".backtop").show();
            } 
            else { 
                $(".backtop").hide();
            } 
        }); 
        $(".backtop").click(function(){
            scrollTo(0,0);
        });
    };

    return customElement;
});
