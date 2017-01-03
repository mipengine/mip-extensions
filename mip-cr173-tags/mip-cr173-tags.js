/**
 * @file tags适配
 * @author Zhang
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var borwserFunc = function () {
        var u = navigator.userAgent;
        var mobileWebkit = !!u.match(/AppleWebKit.*Mobile/i);
        var mobilePhone = !!u.match(/Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/);
        var mobilePhone2 = !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod/);
        return {
            trident: u.indexOf('Trident') > -1,
            presto: u.indexOf('Presto') > -1,
            webKit: u.indexOf('AppleWebKit') > -1,
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
            mobile: mobileWebkit || mobilePhone || mobilePhone2,
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
            iPad: u.indexOf('iPad') > -1,
            webApp: u.indexOf('Safari') === -1,
            UCBrowser: u.indexOf('UCBrowser') > -1,
            MQQBrowser: u.indexOf('MQQBrowser') > -1,
            Safari: u.indexOf('Safari') > -1,
            ios9: u.indexOf('iPhone OS 9') > -1
        };
    };
    var browser = {
        versions: borwserFunc(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    var pageInfo = {
        id: $('.f-information').attr('data-id'),
        path: $('.f-information').attr('data-path'),
        categroyId: $('.f-information').attr('data-categroyId'),
        rootId: $('.f-information').attr('data-rootid'),
        commendid: $('.f-information').attr('data-commendid'),
        system: $('.f-information').attr('data-system'),
        ppaddress: $('.f-information').attr('data-ppaddress'),
        ismoney: $('.f-information').attr('data-ismoney')};
    function tagsChoose() {
        if ($('.g-tags-box').length > 0) {
            if (browser.versions.ios) {
                if ($('.g-tags-box .m-tags-ios li').length > 0) {
                    addTags($('.g-tags-box .m-tags-ios').html(),
                    $('.g-tags-box .m-tags-ios li').first().attr('data-system'),
                    $('.g-tags-box .m-tags-ios li').first().attr('data-id'),
                    $('.g-tags-box .m-tags-ios li a p').first().text(), 'iOS');
                } else {
                    $('.g-tags-box').remove();
                }
            } else {
                if ($('.g-tags-box .m-tags-android li').length > 0) {
                    addTags($('.g-tags-box .m-tags-android').html(),
					$('.g-tags-box .m-tags-android li').first().attr('data-system'),
					$('.g-tags-box .m-tags-android li').first().attr('data-id'),
                    $('.g-tags-box .m-tags-android li a p').first().text(), 'Android');
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
        $('.m-down-msg').after(tagsHtml);
        $('.g-tags-box').show();
        if (pageInfo.system.indexOf(systemName) === -1) {
            $('.m-down-msg .info .pic ul li b').each(function () {
                var systemText = $(this).text();
                if (systemText.indexOf('系统：') !== -1) {
                    $(this).text('系统：' + firstSystem);
                }
            });
            $('.m-down-msg h1').text(firstName);
            var windowUrl = window.location.href;
            if (windowUrl.indexOf('cr173.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.cr173.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('qqtn.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.qqtn.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('fxxz.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.fxxz.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('5577.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.5577.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('uzzf.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.uzzf.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('skycn.com') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.skycn.com/down.asp?id=' + firstId).attr('data-add', 'add');
            } else if (windowUrl.indexOf('962.net') !== -1) {
                $('.m-down-ul li a').attr('href', 'http://m.962.net/down.asp?id=' + firstId).attr('data-add', 'add');
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
