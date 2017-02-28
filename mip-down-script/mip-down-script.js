/**
 * @file 页面逻辑脚本
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var browser = {
        versions: (function () {
            var u = navigator.userAgent;
            // var app = navigator.appVersion;
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
    var down = {
        webInfoId: $('#down-href').attr('downid'),
        webInfoCid: $('#down-href').attr('cid'),
        webInfoRid: $('#down-href').attr('rid'),
        platAndroidId: $('#plat_Android').attr('platid'),
        platAndroidAddress: $('#plat_Android').attr('Address'),
        platAndroidResSystem: $('#plat_Android').attr('ResSystem'),
        platAndroidResName: $('#plat_Android').attr('ResName'),
        platAndroidResVer: $('#plat_Android').attr('ResVer'),
        platAndroidCid: $('#plat_Android').attr('cid'),
        platAndroidRid: $('#plat_Android').attr('rid'),
        platIPhoneId: $('#plat_iPhone').attr('platid'),
        platIPhoneAddress: $('#plat_iPhone').attr('Address'),
        platIPhoneResSystem: $('#plat_iPhone').attr('ResSystem'),
        platIPhoneResName: $('#plat_iPhone').attr('ResName'),
        platIPhoneResVer: $('#plat_iPhone').attr('ResVer'),
        platIPhoneCid: $('#plat_iPhone').attr('cid'),
        platIPhoneRid: $('#plat_iPhone').attr('rid'),
        assid: parseInt($('#info #Associate').html(), 10),
        mrtit: function () {
            var otit = $('#cataName');
            var ohref = otit.attr('href');
            var wyArr = [631, 632, 633, 634, 636, 694, 695, 696, 697, 700, 727, 728, 729, 730, 731, 732, 733, 734,
735, 797, 798, 799, 800, 801, 806];
            var djArr = [830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 813, 814, 815, 816, 817, 818,
819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 802, 803, 804, 805, 807, 808, 809, 810, 758, 759, 760, 761, 762,
763, 764, 765, 766, 767, 768, 769, 770, 771, 673, 672, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685,
686, 687, 688, 689, 690, 618, 619, 620, 621, 622, 623, 624, 625, 591, 592, 593, 594, 595, 596, 597, 598, 637, 638,
711, 712, 713, 714, 842, 465, 466, 467, 468, 469, 470, 471, 472, 473, 476, 477, 386, 387, 388, 389, 390, 391, 414,
415, 416, 417, 571, 572, 573, 574, 422, 285, 282, 284, 286, 287, 288, 535, 616, 508, 384, 299, 304, 345, 478, 479,
480, 482, 506, 298, 561, 562, 629, 557];
            function jcTit(arr, tit, href) {
                for (var i = 0; i < arr.length; i++) {
                    if (ohref.indexOf(arr[i]) > 0) {
                        otit.html(tit).attr('href', href);
                    }
                }
            }
            otit.html('软件').attr('href', 'http://m.pc6.com/ruanj.html');
            jcTit(wyArr, '网游', 'http://m.pc6.com/wangyou.html');
            jcTit(djArr, '单机', 'http://m.pc6.com/youxi.html');
        },
        xfNav: function () {
            var headerHeight = $('header').height() + 90;
            $(window).scroll(function () {
                var $nav = $('#btns');
                if ($(window).scrollTop() >= headerHeight) {
                    $nav.css({'position': 'fixed', 'top': 0}).addClass('on');
                }
                else {
                    $nav.css({'position': 'relative'}).removeClass('on');
                }
                if (($('#wrapper').offset().top + $('#wrapper').height() - 35) <= $(window).scrollTop()) {// k标签
                    $('#xgk').addClass('fix');
                }
                else {
                    $('#xgk').removeClass('fix');
                }
            });
        },
        downHref: function () {
            if (this.assid > 0) {
                $('#info #btns a').attr('href', 'http://m.pc6.com/down.asp?id=' + this.assid);
            }
            if (browser.versions.android && typeof (this.platAndroidAddress) !== 'undefined') {
                if (this.platAndroidAddress.indexOf('http:') >= 0 || this.platAndroidAddress.indexOf('ftp:') >= 0
                    || this.platAndroidAddress.indexOf('https:') >= 0) {
                    $('#info #btns a').attr('href', this.platAndroidAddress);
                }
                else {
                    $('#info #btns a').attr('href', 'http://download.pc6.com/down/' + this.platAndroidId + '/');
                }
                $('#ResSystem').html(this.platAndroidResSystem);
                // 排除不修改标题的应用
                if (',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',') < 0) {
                    if ($('body.dnb').length < 1) {
                        $('#info .name').html('<h1>' + this.platAndroidResName + '</h1>' + this.platAndroidResVer);
                    }
                }
            }
            else if (browser.versions.ios && typeof (this.platIPhoneAddress) !== 'undefined') {
                if (this.platIPhoneAddress.indexOf('http:') >= 0 || this.platIPhoneAddress.indexOf('ftp:') >= 0
                    || this.platIPhoneAddress.indexOf('https:') >= 0) {
                    $('#info #btns a').attr('href', this.platIPhoneAddress);
                }
                else {
                    $('#info #btns a').attr('href', 'http://download.pc6.com/down/' + this.platIPhoneId + '/');
                }
                $('#ResSystem').html(this.platIPhoneResSystem);
                // 排除不修改标题的应用
                if (',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',') < 0) {
                    if ($('body.dnb').length < 1) {
                        $('#info .name').html('<h1>' + this.platIPhoneResName + '</h1>' + this.platIPhoneResVer);
                    }
                }
            }
        },
        titTab: function () {
            if ($('.xgwz ul li').length > 0) {
                $('.xgwz').show();
            }
            else {
                $('.xgwz').hide();
                $('#tab span').eq(1).hide();
            }
            $('#tab span').click(function () {
                if ($(this).text() === '简介') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xyc,.cont,#comment,.xgwz,.similar,#tcsyy,.guess,#xgk').show();
                }
                else if ($(this).text() === '教程') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xgwz,#comment').show();
                    $('.cont,.xyc,.similar,#tcsyy,#xgk,.guess').hide();
                }
                else if ($(this).text() === '评论') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xgwz,.cont,.xyc,.similar,#tcsyy,#xgk,.guess').hide();
                    $('#comment').show();
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
            var onavLi = $('#wrapert ul li');
            var ospan = '<span class="active"></span>';
            var windowW = parseInt($(window).width() - 16, 10);
            var touch = {s: [], d: ''};
            var iNow = 0;
            oli.width(windowW);
            $('#tags-main').width(windowW);
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
                bugImg();
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
                bugImg();
                $('.pagenum span').eq(iNow).addClass('active').siblings().removeClass('active');
                $('.guess-nav li').eq(iNow).addClass('active').siblings().removeClass('active');
            }
            // 解决横向滚动图片无法出现
            if ($('#wrapper2').length > 0) {
                $('#wrapper2')[0].addEventListener('touchend', function (e) {
                    bugImg();
                }, false);
            }
            if ($('#wrapper4').length > 0) {
                $('#wrapper4')[0].addEventListener('touchend', function (e) {
                    bugImg();
                }, false);
            }
            // bug
            function bugImg() {
                setTimeout(function () {
                    $('body').scrollTop($('body').scrollTop() + 1).scrollTop($('body').scrollTop() - 1);
                }, 150);
            }

        },
        hotRec: function () {
            var keys = []; // K关键词
            var curPlatform = 2; // 平台类型
            var pid = 0;   // 关联平台资源ID
            var rCid = 0; // 关联资源的分类ID
            var rRid = 0; // 关联资源的根分类ID
            var that = this;
            // 平台类型
            if (browser.versions.android) {
                curPlatform = 0;
                if (typeof this.platAndroidAddress !== 'undefined') {
                    rCid = this.platAndroidCid;
                    rRid = this.platAndroidRid;
                    pid = this.platAndroidId;
                }
            }
            else if (browser.versions.ios) {
                curPlatform = 1;
                if (typeof this.platIPhoneAddress !== 'undefined') {
                    rCid = this.platIPhoneCid;
                    rRid = this.platIPhoneRid;
                    pid = this.platAndroidId;
                }
            }

            // 只处理android和iphone
            if (curPlatform !== 2) {
                // K关键字获取
                $('#xgk a').each(function () {
                    keys.push($(this).text());
                });
                keys.length === 0 ? keys = '' : keys = keys.join(',');

                $.ajax({
                    method: 'get',
                    data: {
                        keys: keys,
                        id: that.webInfoId,
                        platform: curPlatform,
                        pid: pid,
                        cid: (typeof (that.webInfoCid) !== 'undefined') ? that.webInfoCid : 0,
                        rid: (typeof (that.webInfoRid) !== 'undefined') ? that.webInfoRid : 0,
                        rcid: rCid,
                        rrid: rRid
                    },
                    url: 'https://apis.pc6.com/ajax.asp?action=998',
                    dataType: 'json',
                    success: function (data) {
                        if (typeof data.list === 'undefined') {
                            return;
                        }
                        var list = data.list;
                        var lisHttml = '';
                        if (curPlatform === 0) {
                            for (var i = 0; i < list.length; ++i) {
                                lisHttml += '<li><a href="http://m.pc6.com/down.asp?id=' + list[i].ID + '"><mip-img src="'
                                + list[i].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian'
                                + (i + 1) + '\',\'' + list[i].ResName + '\'])"></mip-img>'
                                + list[i].ResName + '</a></li>';
                            }
                        }
                        else if (curPlatform === 1) {
                            for (var i = 0; i < list.length; ++i) {
                                lisHttml += '<li><a href="http://m.pc6.com/mipd/' + list[i].ID + '.html" target="_blank"><mip-img src="'
                                + list[i].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian'
                                + (i + 1) + '\',\'' + list[i].ResName + '\'])"></mip-img>'
                                + list[i].ResName + '</a></li>';
                            }
                        }
                        $('.tjyxph #thelist3').append(lisHttml);
                    },
                    error: function () {}
                });
            }
        },
        init: function () {
            this.mrtit();// 标题大分类修改
            this.xfNav();// 悬浮下载
            this.titTab();// 菜单切换
            this.downHref();// 动态下载地址
            this.hotRec(); // 热门推荐
            this.touchSlide();// 滑动切换
        }
    };
    customElem.prototype.build = function () {
        down.init();
    };
    return customElem;
});
