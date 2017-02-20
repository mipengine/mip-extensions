/**
 * @file mip-qbb-isweixin 组件
 * @author yml
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var scrollFlagt = false;
    // 判断是否在微信中打开
    var isweixin = function () {
        var browser = {
            versions: function () {
                var u = navigator.userAgent;
                var app = navigator.appVersion;
                return { // 移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, // IE内核
                    presto: u.indexOf('Presto') > -1, // opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, // 是否iPad
                    webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
                };
            }()
        };
        var uaa = navigator.userAgent.toLowerCase();
        var odocumentH = $(document).height();
        var owindowW = $(window).width();
        var kg = true;
        if (uaa.indexOf('micromessenger') > 0) {
            if (browser.versions.ios) { // if ios
                $('body').append('<div class="mask main-bg">'
                    + '<img src="/Public/Down/qbaobeimobile/image/pgwx.png"></div>');
            }

            if (browser.versions.android) { // if android
                $('body').append('<div class="mask main-bg">'
                    + '<img src="/Public/Down/qbaobeimobile/image/tipwx.png"></div>');
            }

            $('.mask img').css({position: 'fixed', right: '22px', top: '15px'});
            document.addEventListener('touchmove', function (e) { // 清除底层文档默认滑动；
                if (kg) {
                    e.preventDefault();
                    e.stopPropagation();
                }

            }, false);
            $('.mask').click(function () {
                $('.mask').remove();
                kg = false;
            });
            return false;
        }

    };

    function setDownUrl() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            $('a.down').attr('href', $('#android-down').val());
            $('a.downscroll').attr('href', $('#android-down').val());
            scrollFlagt = true;
        }
        else if (u.indexOf('iPhone') > -1) {
            $('a.down').attr('href', $('#iphone-down').val());
            $('a.downscroll').attr('href', $('#iphone-down').val());
            scrollFlagt = true;
        }
        else if (u.indexOf('iPad') > -1) {
            $('a.down').attr('href', $('#ipad-down').val());
            $('a.downscroll').attr('href', $('#ipad-down').val());
            scrollFlagt = true;
        }
        else {
            $('a.down').addClass('sc');
            $('a.down').html('正在上架...');
            $('a.down').attr('href', 'javascript:void(0);');
        }
        if (u.indexOf('MicroMessenger') > -1) {
            scrollFlagt = false;
            $('a.down').attr('href', 'javascript:isweixin();');
        }

        var url = $('a.down').attr('href');
        if (url === '') {
            scrollFlagt = false;
            $('a.down').addClass('sc');
            $('a.down').html('正在上架...');
            $('a.down').attr('href', 'javascript:void(0);');
        }

        $('a.down').show();
    }

    customElement.prototype.build = function () {
        setDownUrl();
    };

    return customElement;
});
