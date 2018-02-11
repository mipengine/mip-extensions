/**
 * click switch
 * @file click component
 * @author lin156635304@163.com
 * @version 1.0
 * @copyright 2016 yiqibazi.com, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function labelSwitching() {
        var $liuniannav = $('.mip-liunian .title span');
        var $liuniancon = $('.mip-liunian .answer-box');
        $liuniannav.on('click', function () {
            var index = $(this).index();
            $liuniannav.removeClass('navs-active');
            $(this).addClass('navs-active');
            $liuniancon.eq(index).addClass('mip-show').siblings().removeClass('mip-show');
        });
        var $liunianyunnav = $('.mip-liunianyun .title span');
        var $liunianyuncon = $('.mip-liunianyun .answer-box');
        $liunianyunnav.on('click', function () {
            var index = $(this).index();
            if (index === 2) {
                location.href = 'http://wap.yiqijixiang.com/sx2017/?referraluserid=ydyiqibazi';
            }
            else {
                $liunianyunnav.removeClass('navs-active');
                $(this).addClass('navs-active');
                $liunianyuncon.eq(index).addClass('mip-show').siblings().removeClass('mip-show');
            }
        });
    }
    function load() {
        $('.mip-liunian').children('.list-con').children('.answer-box').eq(0).addClass('mip-show');
        $('.mip-liunianyun').children('.list-con').children('.answer-box').eq(0).addClass('mip-show');
    }
    function init() {
        load();
        labelSwitching();
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
