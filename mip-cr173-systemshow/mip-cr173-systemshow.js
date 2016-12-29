/**
 * @file 高速下载,显示相应内容
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
    var keyword = {
        introductionShow: function () {
            $('#g-look-desc,.g-cont-scroll,#g-black-bg,#g-desc-bg').click(function () {
                var winHeight = $(window).height();
                var showHeight = $('.g-cont-scroll').height() + 36;
                if (showHeight <= winHeight * 0.7) {
                    var descHtml = $('.g-cont-scroll').html();
                    $('body').append('<div class="m-desc-alert">' + descHtml
                    + '<b id="m-close-desc">' + '关闭' + '</b>' + '</div>' + '<b id="m-alert-bg">' + '</b>');
                    $('html,body').css('overflow', 'hidden');
                    var topHeight = (winHeight - showHeight) / 2;
                    $('.m-desc-alert,#m-close-desc').css('top', topHeight);
                }
                else {
                    var descHtml = $('.g-cont-scroll').html();
                    $('body').append('<div class="m-desc-alert">' + descHtml
                    + '<b id="m-close-desc">' + '关闭' + '</b>' + '</div>' + '<b id="m-alert-bg">' + '</b>');
                    $('html,body').css('overflow', 'hidden');
                }

                $('#m-close-desc,#m-alert-bg').click(function () {
                    $('.m-desc-alert,#m-alert-bg').remove();
                    $('html,body').css('overflow', 'auto');
                });
            });
        },
        systemShow: function () {
            var allSize = $('.g-newgame-ul li').length;
            var androidHtml = $('.g-newgame-ul li[data-system*=\'Android\']');
            var androidSzie = $('.g-newgame-ul li[data-system*=\'Android\']').size();
            $('.g-newgame-ul li[data-system*=\'Android\']').remove();
            var iosHtml = $('.g-newgame-ul li[data-system*=\'苹果iOS\']');
            var iosSzie = $('.g-newgame-ul li[data-system*=\'苹果iOS\']').size();
            var pcSize = allSize - androidSzie - iosSzie;
            var androidTitle = '<li class="m-game-title">' + '共有' + '<span>' + androidSzie
            + '</span>' + '款安卓应用' + '</li>';
            var iosTitle = '<li class="m-game-title">' + '共有' + '<span>' + iosSzie + '</span>' + '款ios应用' + '</li>';
            var pcTitle = '<li class="m-game-title">' + '共有' + '<span>' + pcSize + '</span>' + '款电脑应用' + '</li>';

            $('.g-newgame-ul li[data-system*=\'苹果iOS\']').remove();
            if (browser.versions.ios) {
                if (pcSize > 0) {
                    $('.g-newgame-ul').prepend(pcTitle);
                }

                if (androidSzie > 0) {
                    $('.g-newgame-ul').prepend(androidHtml);
                    $('.g-newgame-ul').prepend(androidTitle);
                }

                if (iosSzie > 0) {
                    $('.g-newgame-ul').prepend(iosHtml);
                    $('.g-newgame-ul').prepend(iosTitle);
                }
            }
            else { // 安卓设备
                if (pcSize > 0) {
                    $('.g-newgame-ul').prepend(pcTitle);
                }

                if (iosSzie > 0) {
                    $('.g-newgame-ul').prepend(iosHtml);
                    $('.g-newgame-ul').prepend(iosTitle);
                }

                if (androidSzie > 0) {
                    var keyAd = '<li data-system="Android"><a href="/x/255858" class="g-a-left"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-5/2016541414541509_120_120.png" /><p><strong>网易阴阳师安卓版</strong><b>角色扮演 / 518M / 安卓版</b></p></a><a href="http://73.tui.6071.com/36/167" class="g-a-right">下载</a></li><li data-system="Android"><a href="/x/354335" class="g-a-left"><mip-img src="http://pic1.cr173.com/cr173/mb/up/2016-11/20161156407705_120_120.jpg" /><p><strong>究极数码暴龙下载</strong><b>动作卡牌 / 101.8M / 安卓版</b></p></a><a href="http://73.tui.6071.com/53/167" class="g-a-right">下载</a></li>';
                    $('.g-newgame-ul').prepend(androidHtml);
                    $('.g-newgame-ul').prepend(androidTitle);
                }
            }
            $('.g-newgame-ul li strong').each(function () {
                var liText = $(this).text();
                var re = '';
                re = /(破解版|修改版|去验证版|无限金币版|无限钻石版|无限道具版|无敌版|全解锁版|公测版|官方版|360版|uc版|百度版|官方安卓版|IOS越狱版|电脑版|助手|修改器|辅助)/g;
                liText = liText.replace(re, '<font color="red">$1</font>');
                $(this).html(liText);
            });
        },
        init: function () {
            this.introductionShow(); // 点击显示简介
            this.systemShow(); // 根据系统重新排序内容
        }
    };
    customElem.prototype.build = function () {
        keyword.init();
    };
    return customElem;
});
