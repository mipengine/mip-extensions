define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var ua = navigator.userAgent;
    var device = {
        UC: ((function () {
            return /UCBrowser/i.test(ua);
        })()),

        QQ: ((function () {
            return /MQQBrowser/i.test(ua);
        })())
    };

    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            var $switchBlock = $('#week_hot_switch');
            $switchBlock.on('click', '.switch_tabs a', function(event) {
                event.preventDefault();
                var $currEle = $(this);
                $currEle.addClass('curr').siblings().removeClass('curr');
                var idx = $switchBlock.find('.switch_tabs a').index(this);
                $switchBlock.find('.switch_content').hide().eq(idx).show();
            });
        },
        // 换一换
        changMore: function () {
            $('.useful').on('click', function (event) {
                event.preventDefault();
                var clicked = $(this).attr('clicked');
                if (clicked) {
                    return;
                }
                var countEle = $(this).find('.count');
                var currCount = Number(countEle.text());
                countEle.text(currCount + 1);
                $(this).attr('clicked', 'yes');
            });
        },
        // 变换颜色
        changeColor: function () {
            $('.c_ad_title p,.c_ad_title p a').css('color', $('.navigate').css('background-color'));
        },
        // uc/qq浏览器加载反屏蔽网盟代码
        loadUCad: function () {
            var ucAd1 = '<mip-embed type="baidu-wm-ext" '
                + 'domain="a.iy.com.cn" token="ky3a1ecf91f3c2f03cdb1c3e82b8b034e058acde0a">'
                + '<div id="ky3a1ecf91f3c2f03cdb1c3e82b8b034e058acde0a"></div></mip-embed>';
            var ucAd2 = '<mip-embed type="baidu-wm-ext"'
                + 'domain="a.iy.com.cn" token="qh3a1ecf92f2c3ff3adb1c3e82b8b034e058acde0a">'
                + '<div id="qh3a1ecf92f2c3ff3adb1c3e82b8b034e058acde0a"></div></mip-embed>';
            var dom2ad = {
                '[mip-ck-ad-bd-2-uc-1]': ucAd1,
                '[mip-ck-ad-bd-2-uc-2]': ucAd2
            };
            if (device.QQ) {
                $.each(dom2ad, function (k, v) {
                    $(k).html(v);
                });
            }
        },
        // 加载两性ad列表
        init: function () {
            this.switchBlock();
            this.changMore();
            this.changeColor();
            this.loadUCad();
        }
    };

    customElement.prototype.build = function () {
        effects.init();
    };

    return customElement;
});

