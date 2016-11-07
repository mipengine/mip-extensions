define('mip-yiqibazi', ['require', 'customElement', 'zepto'], function (require) {
    var $ = require('zepto');

    var customElem = require('customElement').create();

    function labelSwitching() {
        var $liuniannav = $("#liunian .title span");
        var $liuniancon = $("#liunian .answer-box");
        $liuniannav.on("click", function () {
            var index = $(this).index();
            $liuniannav.removeClass("navs-active");
            $(this).addClass("navs-active");
            $liuniancon.eq(index).addClass("mip-show").siblings().removeClass("mip-show");
        });
        var $liunianyunnav = $("#liunianyun .title span");
        var $liunianyuncon = $("#liunianyun .answer-box");
        $liunianyunnav.on("click", function () {
            var index = $(this).index();
            if (index == 2) {
                location.href = "http://wap.yiqijixiang.com/sx2017/?referraluserid=ydyiqibazi"
            } else {
                $liunianyunnav.removeClass("navs-active");
                $(this).addClass("navs-active");
                //$liunianyuncon.removeClass("mip-show")
                $liunianyuncon.eq(index).addClass("mip-show").siblings().removeClass("mip-show");
            }
        });
    }

    function load() {
        $("#liunian").children(".list-con").children(".answer-box").eq(0).addClass("mip-show")
        $("#liunianyun").children(".list-con").children(".answer-box").eq(0).addClass("mip-show")
    }

    function init() {
        load();
        labelSwitching();
    }
    customElem.prototype.build = function () {
        var _element = this.element;
        init();
    }
    return customElem;
});

require(['mip-yiqibazi'], function (plugindemo) {
    MIP.registerMipElement('mip-yiqibazi', plugindemo);
});