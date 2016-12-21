/**
 * @file pp助手下载
 * @author Zhou
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
    function ppzsAd() {
        var webInfoPpid = $('#down-href').attr('ppid');
        if (browser.versions.android && localStorage.getItem('ppzs') !== 'Yes'
        && $('#plat_Android').attr('TypeID') !== '58') {
            var sc = document.createElement('script');
            sc.src = 'http://a.img.pp.cn/upload_files/js/pp-dl-highspeed.js';
            sc.charset = 'UTF-8';
            var c = document.getElementsByTagName('script')[0];
            c.parentNode.insertBefore(sc, c);
            var oflag = true;
            $('#info #btns').after('<div class="newBox"><div class="topBox"><div class="btn-checkbox">'
            + '<em class="icon-check"></em>PP助手高速下载</div><a href="' + $('#btns a').attr('href')
            + '" class="pptvHref">高速下载</a></div><div class="normal">'
			+ '<div class="main"><em class="icon"></em><span></span></div></div></div>');
            $('#info .normal span').html('PP助手是全面、专业的应用市场，将为您安装PP手机助手，启动高速引擎，安全无毒、极速下载应用！');
            $('#info #btns').hide();
            $('.newBox').show();
            $('.btn-checkbox').click(function () {
                if (oflag) {
                    $(this).find('em').addClass('icon-active');
                    $(this).siblings('a').addClass('noBg').html('普通下载');
                    $(this).parents().find('.normal').addClass('tipShow');
                    $('#info .normal span').html('使用普通下载无法避免流量劫持、下载较慢等问题，建议选择PP手机助手安全高速下载！');
                }
                else {
                    $(this).find('em').removeClass('icon-active');
                    $(this).siblings('a').removeClass('noBg').html('高速下载');
                    $(this).parents().find('.normal').removeClass('tipShow');
                    $('#info .normal span').html('PP助手是全面、专业的应用市场，将为您安装PP手机助手，启动高速引擎，安全无毒、极速下载应用！');
                }
                oflag = !oflag;
            });
            $('.newBox a').click(function (e) {
                if ($(this).html() === '普通下载' || typeof webInfoPpid === 'undefined') {
                    return;
                }
                localStorage.setItem('ppzs', 'Yes');
                $(this).html('高速下载中...');
                var mode = webInfoPpid > 0 ? 0 : 1;
                Pdlh.downloadFast({
                    channel: 'PM_5118',
                    ch_src: 'pm_pc6',
                    ch: 'default',
                    appId: webInfoPpid,
                    durl: $('#btns a').attr('href'),
                    bs: 1,
                    mode: mode,
                    debug: false
                });
                return false;
            });
        }
        // pptv下载悬浮
        function xfNav2() {
            var headerHeight = $('header').height() + 90;
            $(window).scroll(function () {
                var $nav = $('.newBox');
                if ($(window).scrollTop() >= headerHeight) {
                    $nav.css({'position': 'fixed', 'top': 0}).addClass('newBox-on');
                }
                else {
                    $nav.css({'position': 'relative'}).removeClass('newBox-on');
                }
            });
        }
        if ($('#down-page .newBox').length > 0) {
            xfNav2();
        }
    }
    customElem.prototype.build = function () {
        ppzsAd();
    };

    return customElem;
});
