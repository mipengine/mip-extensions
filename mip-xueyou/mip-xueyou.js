/**
* 学优网mip改造 javascript功能插件
* @file 网页主要功能
* @author myoa@163.com
* @version 1.0.0
*/
define(function(require) {
    var $ = require("zepto");
    $(function($) {
        //以self方式重置a标签
        $(".openself").attr("target", "_self");
        //加载搜索框
        var searbar = [ 
			'<section id="sbar" class="searchbar">', 
			'<form method="get" action="http://mip.gkstk.com/wenku/">', 
			'<input type="text" placeholder="请输入" id="search" name="keyword" page="1" value="">', 
			'<i class="icon_search">&nbsp;</i><a class="icon_close openself" href="#top">&nbsp;</a>', 
			"</form>", "</section>" ].join("");
        $("header").after(searbar);
        //查看更多按钮功能
        var docmax = false;
        var btnMax = $("#btnToMax");
        var timeOutEvent = 0;
        btnMax.on({
            touchstart:function(e) {
                timeOutEvent = setTimeout(function() {
                    timeOutEvent = 0;
                    maxpage();
                }, 500);
                e.preventDefault();
            },
            touchmove:function() {
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            touchend:function() {
                clearTimeout(timeOutEvent);
                if (timeOutEvent != 0) {
                    maxpage();
                }
                return false;
            }
        });
        function maxpage() {
            var artbox = $("#artbox");
            var docheight = $(document).height();
            artbox.removeClass("minbox");
            btnMax.remove();
            docmax = true;
            docheight = $(document).height();
        }
        //广告控制
        var admnum = 2;
        var admtop_init = getCookie("admtop");
        var admbottom_init = getCookie("admbottom");
        var admtop = $("#mip-adm-top");
        var admbottom = $("#mip-adm-bottom");
        if (admtop_init == "close") {
            //头部广告单元以嵌入方式加载
            admnum--;
            admtop.removeClass("hide");
            admtop.removeClass("fix");
        } else {
            var body = $("body");
            body.on("touchmove", function() {
                var gt = getScrollTop();
                if (gt > 100) {
                    admtop.removeClass("hide");
                    admtop.addClass("fix");
                }
                if (gt < -50) {
                    admtop.removeClass("fix");
                }
            });
        }
        if (admbottom_init == "close") {
            admnum--;
            admbottom.removeClass("fix");
        }
        if (admnum > 0) {
            var admbtn = $(".btnclose");
            admbtn.on("click", function() {
                if ($(this).parent().attr("id") == "mip-adm-top") {
                    setCookie("admtop", "close");
                    admtop.remove();
                } else {
                    setCookie("admbottom", "close");
                    admbottom.removeClass("fix");
                }
            });
        }
    });
    function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    }
    function setCookie(name, value) {
        var Days = .5;
        //12个小时过期
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1e3);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    }
});
