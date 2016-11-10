/**
 * @file 前瞻网页面导航组件
 * @author ningsong
 * @time 2016.11.08
 */
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
    * 构造元素，只会运行一次
    */
    customElement.prototype.build = function () {
        var element = this.element;
        if (element.isRender) {
            return;
        }
        element.isRender = true;

        var $element = $(element);

        $element.find(".sel2").bind("click", function () {
            $element.addClass("open");
            $element.find("ul").css({ "width": "", "position": "" });
        });
        
        $element.find(".sel, .close").bind("click", function () {
            $(element).removeClass("open");
            $(element).find("ul").css({ "width": "2000px", "position": "relative" });
        });
    };
    
    /**
    * 向文档中插入节点回调
    */
    customElement.prototype.attachedCallback = function () {
        var $element = $(this.element);
        var rawUrl = this.element.getAttribute("rawurl") || "/";
        var matchObj, matchLen = 0;
        var left2 = 0;
        $element.find("ul li").each(function (i) {
            if (i == 2)
                left2 = $(this).offset().left;
            var href = $(this).find("a:first").attr("href");
            if (href != "/" && rawUrl.indexOf(href) != -1) {
                if (href.length > matchLen) {
                    matchObj = this;
                    matchLen = href.length;
                }
            }
        });
        if (matchLen > 0) {
            var leftCur = $(matchObj).offset().left;
            if (leftCur > left2 && left2 > 0) {
                //滚动效果
                $element.find("ul").animate({
                    left: (left2 - leftCur).toString() + 'px'
                }, 600, function () {

                });
            }
            $(matchObj).parent().children().removeClass("cur");
            $(matchObj).addClass("cur");
        }
    };
    
    return customElement;

});

