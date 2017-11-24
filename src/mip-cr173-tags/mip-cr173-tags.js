/**
 * @file tags适配
 * @author Zhang
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var browser = {
        versions: (function () {
            var u = navigator.userAgent;
            return {
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf('Android') > -1, // android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, // 是否iPad
                ios9: u.indexOf('iPhone OS 9') > -1,
                MQQBrowser: u.indexOf('MQQBrowser') > -1, // 是否MQQBrowser
                UCBrowser: u.indexOf('UCBrowser') > -1, // UCBrowser
                Safari: u.indexOf('Safari') > -1
            };
        })(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    var pageInfo = {
        id: $('.f-information').attr('data-id'),
        path: $('.f-information').attr('data-path'),
        categroyId: $('.f-information').attr('data-categroyId'),
        rootId: $('.f-information').attr('data-rootid'),
        commendid: $('.f-information').attr('data-commendid'),
        system: $('.f-information').attr('data-system').toUpperCase(),
        ppaddress: $('.f-information').attr('data-ppaddress'),
        ismoney: $('.f-information').attr('data-ismoney')};
    function tagsChoose() {
        if ($('.g-tags-box').length > 0) {
            if (browser.versions.ios) {
                if ($('.g-tags-box .m-tags-ios li').length > 0) {
                    addTags($('.g-tags-box .m-tags-ios').html(),
                    $('.g-tags-box .m-tags-ios li').first().attr('data-system'),
                    $('.g-tags-box .m-tags-ios li').first().attr('data-id'),
                    $('.g-tags-box .m-tags-ios li a p').first().text(), 'IOS');
                } else {
                    $('.g-tags-box').remove();
                }
            } else {
                if ($('.g-tags-box .m-tags-android li').length > 0) {
                    addTags($('.g-tags-box .m-tags-android').html(),
					$('.g-tags-box .m-tags-android li').first().attr('data-system'),
					$('.g-tags-box .m-tags-android li').first().attr('data-id'),
                    $('.g-tags-box .m-tags-android li a p').first().text(), 'ANDROID');
                } else {
                    $('.g-tags-box').remove();
                }
            }
        } else {
            $('.g-tags-box').remove();
        }
    }
    function addTags(tagsHtml, firstSystem, firstId, firstName, systemName) {
        tagsHtml = '<div class=\'g-tags-box\'><ul>' + tagsHtml + '</ul></div>';
        $('.g-tags-box').remove();
        $('.g-game-msg').after(tagsHtml);
        $('.g-tags-box').show();
        if (pageInfo.system.indexOf(systemName) === -1) {
            $('.m-down-msg .info .pic ul li b').each(function () {
                var systemText = $(this).text();
                if (systemText.indexOf('系统：') !== -1) {
                    $(this).text('系统：' + firstSystem);
                }
            });
            var urlArray = ['cr173.com', 'qqtn.com', 'fxxz.com', '5577.com', 'uzzf.com', 'skycn.com', '962.net'];
            var windowUrl = window.location.href;
            var i = 0;
            for (i = 0; i < urlArray.length; i++) {
                if (windowUrl.indexOf(urlArray[i]) !== -1) {

                    $('.m-down-ul li a').attr('href', 'http://m.' + urlArray[i] + '/down.asp?id=' + firstId).attr('data-add', 'add');
                }
            }
        }
        if ($('.g-tags-box ul li').length <= 0) {
            $('.g-tags-box').hide();
        }
        $('.g-tags-box ul li a p').each(function () {
            var liText = $(this).text();
            var re = /(官方最新版|官网最新版|官方正式版|官方安卓版|官方版|日服版|九游版|最新版|360版|百度版|uc版|九游版|安峰版|草花版|益玩版|破解版|修改版|无限金币版|中文版)/;
            liText = liText.replace(re, '<font color=\'red\'>$1</font>');
            $(this).html(liText);
        });
    }
    customElem.prototype.build = function () {
        tagsChoose();
    };
    return customElem;
});
