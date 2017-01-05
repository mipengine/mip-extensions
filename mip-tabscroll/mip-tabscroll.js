/**
 * @file 选项卡
 * @author yml
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    // 详情页选项卡
    function tabScroll() {
        var flag = false;
        var flagt = true;
        $('.tab1 li').on('click', function () {
            var index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.dtbox').eq(index).addClass('cur').siblings().removeClass('cur');
            if (flag) {
                if (flagt) {
                    var sdheight = $('.show-detail .list1').height();
                    $('html,body').animate({
                        scrollTop: $('.dtbox').eq(index).offset().top - $('.tab1').height() - sdheight
                    }, 1000);
                }
                else {
                    $('html,body').animate({
                        scrollTop: $('.dtbox').eq(index).offset().top - $('.tab1').height() - $('header').height()
                    }, 1000);
                }
            }

        });

        $(window).scroll(function () {
            var sofftop = $('.tab1').offset().top;
            var dtiltop = $('.show-detail .list2').offset().top;
            var sctop = $(window).scrollTop();
            var tab1 = $('#tab1 ul');
            if (flagt) { // 如果是安装
                if (sctop > sofftop) {
                    tab1.addClass('on ont');
                    flag = true;
                }
                else {
                    tab1.removeClass('on ont');
                    flag = false;
                }

                if (sctop > dtiltop) {
                    $('.show-detail .list1').fadeIn();
                }
                else {
                    $('.show-detail .list1').fadeOut();
                }
            }
            else {
                if (sctop > sofftop) {
                    tab1.addClass('on');
                    flag = true;
                }
                else {
                    tab1.removeClass('on');
                    flag = false;
                }
            }

        });
    }

    customElem.prototype.build = function () {
        if ($('.tab1').length > 0) {
            tabScroll();
        }

    };
    return customElem;
});
