/**
 * @file 页面逻辑脚本
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var util = require('util');
    var platform = util.platform;
    var customElem = require('customElement').create();
    var down = {
        webInfoId: $('.down-href').attr('downid'),
        webInfoCid: $('.down-href').attr('cid'),
        webInfoRid: $('.down-href').attr('rid'),
        platAndroidId: $('.plat_Android').attr('platid'),
        platAndroidAddress: $('.plat_Android').attr('Address'),
        platAndroidResSystem: $('.plat_Android').attr('ResSystem'),
        platAndroidResName: $('.plat_Android').attr('ResName'),
        platAndroidResVer: $('.plat_Android').attr('ResVer'),
        platAndroidCid: $('.plat_Android').attr('cid'),
        platAndroidRid: $('.plat_Android').attr('rid'),
        platIPhoneId: $('.plat_iPhone').attr('platid'),
        platIPhoneAddress: $('.plat_iPhone').attr('Address'),
        platIPhoneResSystem: $('.plat_iPhone').attr('ResSystem'),
        platIPhoneResName: $('.plat_iPhone').attr('ResName'),
        platIPhoneResVer: $('.plat_iPhone').attr('ResVer'),
        platIPhoneCid: $('.plat_iPhone').attr('cid'),
        platIPhoneRid: $('.plat_iPhone').attr('rid'),
        assid: parseInt($('.info .Associate').html(), 10),
        scrollNav: function () {
            var h = $('.tabNav').offset().top; // 浮动距顶
            viewport.on('scroll', function () {
                viewport.getScrollTop() >= h ? $('.tabNav').addClass('fix') : $('.tabNav').removeClass('fix');
            });
        },
        downHref: function () {
            if (platform.isAndroid() && typeof (this.platAndroidAddress) !== 'undefined') {
                if (this.platAndroidAddress.indexOf('http:') >= 0 || this.platAndroidAddress.indexOf('ftp:') >= 0
                    || this.platAndroidAddress.indexOf('https:') >= 0) {
                    $('.game-detail-main .bxz').attr('href', this.platAndroidAddress);
                }
                else {
                    $('.game-detail-main .bxz').attr('href', 'http://m.9ht.com/down.asp?id=' + this.platAndroidId);
                }
                $('.game-detail-main h1').html(this.platAndroidResName);
            }
            else if (platform.isIos() && typeof (this.platIPhoneAddress) !== 'undefined') {
                if (this.platIPhoneAddress.indexOf('http:') >= 0 || this.platIPhoneAddress.indexOf('ftp:') >= 0
                    || this.platIPhoneAddress.indexOf('https:') >= 0) {
                    $('.game-detail-main .bxz').attr('href', this.platIPhoneAddress);
                }
                else {
                    $('.game-detail-main .bxz').attr('href', 'http://m.9ht.com/down.asp?id=' + this.platIPhoneId);
                }
                $('.game-detail-main h1').html(this.platIPhoneResName);
            }

        },
        titTab: function () {
            $('.tabNav span').on('click', function () {
                if ($('.fix').length > 0) {
                    $('.tabNav.fix').removeClass('fix');
                    viewport.setScrollTop($('.tabNav').offset().top);
                }

                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).text() === '详情') {
                    $('.game-focus,.tagsk,.intro-main,.tcsyy,.xgxz,.xg-news,.tags-wrap,.comment').show();
                }
                else if ($(this).text() === '评论') {
                    $('.comment').show();
                    $('.game-focus,.tagsk,.intro-main,.tcsyy,.xgxz,.xg-news,.tags-wrap').hide();
                }
                else if ($(this).text() === '相关') {
                    $('.game-focus,.tagsk,.intro-main').hide();
                    $('.tcsyy,.xgxz,.xg-news,.tags-wrap,.comment').show();
                }

            });
        },
        touchSlide: function () {
            var obj = $('.guess');
            if (obj.length === 0) {
                return;
            }

            var oul = obj.find('.tags-main-ul');
            var oli = oul.find('.tags-main-box');
            var onavLi = $('.tags-tab ul li');
            var ospan = '<span class="active"></span>';
            var windowW = parseInt($(window).width() - 16, 10);
            var touch = {s: [], d: ''};
            var iNow = 0;
            oli.width(windowW);
            $('.tags-main').width(windowW);
            for (var i = 1; i < oli.length; i++) {
                ospan += '<span></span>';
            }
            $('.pagenum').html(ospan);
            oul.width(oli.length * oli.width());
            // 点击li
            onavLi.eq(0).addClass('active');
            onavLi.click(function () {
                var i = $(this).index();
                iNow = i;
                onavLi.eq(i).addClass('active').siblings().removeClass('active');
                oul.css({
                    '-webkit-transform': 'translate3d(' + -windowW * i + 'px, 0px, 0px)'
                });
            });
            // 滑动事件
            oul[0].addEventListener('touchstart', function (e) {
                touch.s[0] = e.targetTouches[0].pageX;
                touch.s[1] = e.targetTouches[0].pageY;
                touch.s[2] = (new Date()).getTime();
            }, false);
            // 滑动过程
            oul[0].addEventListener('touchmove', function (e) {
                if (Math.abs(e.targetTouches[0].pageX - touch.s[0]) >= Math.abs(
                        e.targetTouches[0].pageY - touch.s[1]) && touch.d === '') {
                    touch.d = 1; // 左右
                }
                else if (touch.d === '') {
                    touch.d = 0; // 上下或者偏上下
                }

                if (touch.d === 1) { // 左右滚动
                    e.preventDefault();
                    oul.css({
                        '-webkit-transform': 'translate3d(' + -(windowW * iNow - e.targetTouches[0].pageX
                            + touch.s[0]) + 'px, 0px, 0px)'
                    });
                }

            }, false);

            oul[0].addEventListener('touchend', function (e) {
                if (touch.d === 1) {
                    if ((new Date()).getTime() - touch.s[2] > 700) {
                        if (e.changedTouches[0].pageX - touch.s[0] > windowW / 3) {
                            auto('right');
                        }
                        else if (touch.s[0] - e.changedTouches[0].pageX > windowW / 3) {
                            auto('left');
                        }
                        else {
                            auto('reset');
                        }
                    }
                    else {
                        if (e.changedTouches[0].pageX > touch.s[0]) {
                            auto('right');
                        }
                        else if (touch.s[0] > e.changedTouches[0].pageX) {
                            auto('left');
                        }
                    }
                }

                touch.d = '';
            }, false);
            // 运动函数
            function auto(dir) {
                if (dir === 'left') {
                    iNow >= oli.length - 1 ? iNow === oli.length - 1 : iNow++;
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }
                else if (dir === 'reset') {
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }
                else if (dir === 'right') {
                    iNow <= 0 ? iNow = 0 : iNow--;
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }

                $('.pagenum span').eq(iNow).addClass('active').siblings().removeClass('active');
                $('.tags-tab ul li').eq(iNow).addClass('active').siblings().removeClass('active');
            }
        },
        init: function () {
            this.scrollNav();
            this.titTab(); // 菜单切换
            this.downHref(); // 动态下载地址
            this.touchSlide(); // 滑动切换
        }
    };
    customElem.prototype.createdCallback = function () {
        down.init();
    };
    return customElem;
});
