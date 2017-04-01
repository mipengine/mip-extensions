/**
 * @file 高速下载,显示相应内容
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
        categroyId: Math.ceil($('.f-information').attr('data-categroyId')),
        rootId: $('.f-information').attr('data-rootid'),
        commendid: $('.f-information').attr('data-commendid'),
        system: $('.f-information').attr('data-system'),
        ppaddress: $('.f-information').attr('data-ppaddress'),
        ismoney: $('.f-information').attr('data-ismoney')
    };
    var downFunction = {
        getScript: function () {
            var getScript = function (url, callback) {
                var head = document.getElementsByTagName('head')[0];
                var js = document.createElement('script');
                js.setAttribute('type', 'text/javascript');
                js.setAttribute('src', url);
                head.appendChild(js);
                var callbackFn = function () {
                    if (typeof callback === 'function') {
                        callback();
                    }

                };
                if (document.all) {
                    js.onreadystatechange = function () {
                        if (js.readyState === 'loaded' || js.readyState === 'complete') {
                            callbackFn();
                        }

                    };
                }
                else {
                    js.onload = function () {
                        callbackFn();
                    };
                }
            };
            if (Zepto) {
                $.getScript = getScript;
            }

        },
        tanCentShow: function () {
            var catearr = [151, 156, 158, 159, 160, 161, 162, 163, 164,
                256, 257, 258, 178, 179, 180, 181, 182, 183, 184, 185, 186, 207, 208,
                81, 209, 210, 211, 212, 218, 219, 220, 221, 222, 223, 224, 225, 226, 230,
                237, 238, 239, 240, 241, 308, 309, 310, 311, 328, 322, 323, 324, 325, 326, 329]; // 安卓分类
            var catearrIos = [141, 214, 215, 216, 227, 228, 229, 231, 232, 233, 234,
                235, 312, 313, 314, 315, 316, 317, 318, 319, 327, 330]; // ios分类
            var AppArray = [435, 368]; // 应用宝的id数
            var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D',
                'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z'];
            function generateMixed(n) {
                var res = '';
                for (var i = 0; i < n; i++) {
                    var id = Math.ceil(Math.random() * 35);
                    res += chars[id];
                }
                return res;
            }
            var webUrl = ['L5645.net', 'L5645.com', 'i8543.net', 'i8543.com', 'u7897.net',
                'u7897.com', 'w2546.net', 'w2546.com', 'a2353.net', 'a2353.com', 'q58723.net', 'q58723.com'];
            var AppID = AppArray[Math.floor(Math.random() * (AppArray.length))];
            var downDomain = webUrl[Math.floor(Math.random() * (webUrl.length))];
            var downUrl = 'http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + AppID + generateMixed(3) + '/setup.apk';
            var myazdownLoad = [];
            myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '888' + generateMixed(3) + '/setup.apk');
            myazdownLoad.push('http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '386' + generateMixed(3) + '/setup.apk');
            var isAds = false;
            var downHref = $('.m-down-ul li a').attr('href');
            var noAd = ['6071.com', '1030.apk', 'duokoo.baidu.com', 'ugame.uc.cn', 'ugame.9game.cn', '360.cn', 'ewan.cn', 'anfan.com', 'caohua.com', 'open.play.cn', 'tj.tt1386.com', 'http://g.', 'http://tj.', 'yiwan.com', 'x1.241804.com', 'moban.com', 's.qq.com', '456.com.cn', 'xinkuai.com', 'g.hgame.com', 'yxgames.com', 'qianghongbaoyo.com', 'down1.qianghongbaoyo.com', 'down2.guopan.cn', 'dl.guopan.cn', 'guopan.cn', 'duowan.com'];
            var i = 0;
            for (i = 0; i < noAd.length; i++) {
                if (downHref.indexOf(noAd[i]) > -1) {
                    isAds = true;
                }

            }
            if (pageInfo.ismoney === 1) {
                isAds = true;
            }

            var RefUrl = document.referrer;
            var showAdsRef = ['baidu.com', 'sm.cn', 'sogou.com', 'so.com', 'google.com', 'bing.com', 'www.cr173.com', 'http://cr173.com'];
            var isShowPicAds = '';
            isShowPicAds = $.inArray(RefUrl, showAdsRef);
            if (!browser.versions.ios) {
                var idArray = [];
                var downHref = $('.m-down-ul li a').attr('href');
                idArray = downHref.split('.');
                if (downHref.indexOf('mo.L5645.net') !== -1 && $('.g-tags-box ul li').length <= 0) {
                    $('.m-down-ul li a').attr('href', '/down.asp?id=' + idArray[4]);
                    $('.m-down-msg .type b:last').html('系统：Android');
                }
                else {
                    if ($.inArray(pageInfo.categroyId, catearr) === -1 && $('.g-tags-box ul li').length <= 0) {
                        $('.m-down-ul li a').attr({href: 'javascript:;', ispc: true});
                    }
                    else {
                        $('.m-down-ul li a').attr('issw', true);
                    }
                }
                if (!isAds) {
                    addhighLab();
                }
            }
            else {
                if ($.inArray(pageInfo.categroyId, catearrIos) === -1 && $('.g-tags-box ul li').length <= 0) {
                    $('.m-down-ul li a').attr({href: 'javascript:;', ispc: true});
                }
                else {
                    $('.m-down-ul li a').attr('issw', true);
                }                
                if (!isAds) {
                    iossoftAdd();
                }
            }        
            function addhighLab() {
                $.getScript('https://ca.6071.com/?id=cr1731002333_utf8', function () {});
            }
            function iossoftAdd() {
                $.getScript('https://ca.6071.com/?id=cr17310023331_utf8', function () {});
            }
        },
        init: function () {
            this.getScript(); // getScript插件
            this.tanCentShow(); // 点击下载
        }
    };
    customElem.prototype.build = function () {
        downFunction.init();
    };
    return customElem;
});
