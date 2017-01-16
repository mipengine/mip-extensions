/**
 * @file mip-btn-down 组件
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
        var downbtn = $(element).find("#downbtn");
        var header = $(element).find(".header");
        var obj = downbtn.find(".title");
        $(window).scroll(function () {
            $scrollTop = $(this).scrollTop();
             var headerHeight = header.height() + 90;
                if ($scrollTop > headerHeight) {
                    downbtn.css({"position":"fixed","top":"50px"});
                    obj.css("background-color","#3dad0e"); 
                }else {
                   downbtn.css({"position":"relative","top":"0"});
                    obj.css("background-color","#3498db");
                }
         });
            
        //点击下载弹出页面  
        var screenHeight = $(window).height() + "px";
        $('.load_alert_hide').css("top",screenHeight);
        $('#downbtn').click(function(event) {
            $('.load_alert_hide').fadeIn(100);
            setTimeout(function(){
                 $('.load_alert_hide').animate({top:"0"},600);
            },2000)
        });
        $('.alertbtn').click(function(event) {
            $('.load_alert_hide').animate({top:screenHeight},600);
            $('.load_alert_hide').fadeOut(100);
           
        });
         $('.load_alert_hide').click(function(event) {
            $('.load_alert_hide').animate({top:screenHeight},600);
            $('.load_alert_hide').fadeOut(100);
          
        });

         //点击tab切换
        $(".top_menu .caption1 p ").click(function () {
            $num = $(this).index();
            $(".top_menu .caption1 p").eq($num).addClass("cur").siblings().removeClass("cur");
            $(".con_box1 .con").eq($num).stop().show().siblings().stop().hide();
        })
        $(".top_menu .caption2 p ").click(function () {
            $num = $(this).index();
            $(".top_menu .caption2 p").eq($num).addClass("cur").siblings().removeClass("cur");
            $(".con_box2 .con").eq($num).stop().show().siblings().stop().hide();
        })

    

    };

    return customElement;
});
