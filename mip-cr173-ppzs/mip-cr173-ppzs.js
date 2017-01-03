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
        d1GameShow: function () {
            var appendAndroidHtml = '<li><a href="http://tj.tt1386.com/971254134/0870004"><img class="ico" src="http://m.cr173.com/skin/new2016/images/zsad6.png"><h3 class="name">皇家AAA</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/793215927/4640004"><img class="ico" src="http://pic1.cr173.com/cr173/mb/up/2016-8/14714220369786146_100_100.png"><h3 class="name">热血赛车</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/832364445/4610004"><img class="ico" src="http://m.cr173.com/skin/new2016/images/xhjkg-ad.png"><h3 class="name">新黄金矿工</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/121183088/7860004"><img class="ico" src="http://pic1.cr173.com/cr173/mb/up/2016-8/14714220365419767_100_100.png"><h3 class="name">水果忍者天天闯关</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/257364547/6840004"><img class="ico" src="http://m.cr173.com/skin/new2016/images/ssdzz-ad.png"><h3 class="name">蛇蛇大作战</h3></a></li>';
            var appendIosHtml = '<li><a href="http://tj.tt1386.com/249235356/7320005"><img class="ico" src="http://m.cr173.com/img/iosad1.png"><h3 class="name">我的世界</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/262029296/0080005"><img class="ico" src="http://m.cr173.com/img/iosad2.png"><h3 class="name">去吧皮卡丘</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/315045178/8880005"><img class="ico" src="http://m.cr173.com/img/iosad3.png"><h3 class="name">口袋妖怪复刻</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/142006155/3580005"><img class="ico" src="http://m.cr173.com/img/iosad4.png"><h3 class="name">小冰冰传奇</h3></a></li>'
                + '<li><a href="http://tj.tt1386.com/262006271/8420005"><img class="ico" src="http://m.cr173.com/img/iosad5.png"><h3 class="name">全民枪战</h3></a></li>';
            if (!browser.versions.ios) {
                $('.m-down-msg').after('<ul class="group" id="down_d1_1">' + appendAndroidHtml + '</ul>');
            }
            else {
                $('.m-down-msg').after('<ul class="group" id="down_d1_1">' + appendIosHtml + '</ul>');
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
                androidTanceng();
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
                iosTancent();
                if (!isAds) {
                    iossoftAdd();
                }
            }
            $('.m-down-ul li a').click(function () {
                var setTimer = setTimeout(function () {
                    $('.m-click-show').show();
                }, 100);
            });
            $('.m-close-btn,.m-black-bg').click(function () {
                $('.m-click-show').hide();
            });
            function androidTanceng() { // 安卓弹层
                var androidHtml = '<ul class="m-hideshow-top">'
                    + '<li><a href="http://tj.tt1386.com/570226851/1960004"><img src="http://m.cr173.com/skin/new2016/images/androidad-1.jpg" /><p><strong>红色复仇</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/171226946/9480004"><img src="http://m.cr173.com/skin/new2016/images/androidad-2.jpg" /><p><strong>屠龙战</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/406209839/1370004"><img src="http://m.cr173.com/skin/new2016/images/androidad-3.jpg" /><p><strong>最佳阵容</strong><b>下载</b></p></a></l'
                    + 'i><li><a href="http://tj.tt1386.com/841057445/4090004"><img src="http://m.cr173.com/skin/new2016/images/androidad-4.jpg" /><p><strong>决战沙城</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/593384125/4310000"><img src="http://m.cr173.com/skin/new2016/images/androidad-5.jpg" /><p><strong>免费wifi</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/638384264/5000000"><img src="http://m.cr173.com/skin/new2016/images/androidad-6.jpg" /><p><strong>微信多开</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/066386059/0900000"><img src="http://pic1.cr173.com/cr173/mb/up/2016-6/20166281645503883_120_120.png" /><p><strong>PPTV</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/498373944/0530000"><img src="http://m.cr173.com/skin/new2016/images/androidad-8.jpg" /><p><strong>今日头条</strong><b>下载</b></p></a></li>'
                    + '</ul><strong class="g-show-title">游戏排行榜</strong><ul class="m-hideshow-middle">'
                    + '<li><a href="http://tj.tt1386.com/305209160/8950004"><img src="http://m.cr173.com/skin/new2016/images/androidad-9.jpg" /><p><strong><i>1</i>江湖侠客令</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li>'
                    + '<li><a href="http://tj.tt1386.com/650305409/9880004"><img src="http://m.cr173.com/skin/new2016/images/androidad-10.jpg" /><p><strong><i>2</i>劲舞团</strong><span>音乐舞蹈 / 中文</span></p><b>下载</b></a></li>'
                    + '<li><a href="http://tj.tt1386.com/889290569/9090004"><img src="http://m.cr173.com/skin/new2016/images/androidad-11.jpg" /><p><strong><i>3</i>天将雄兵</strong><span>卡牌策略 / 中文</span></p><b>下载</b></a></li>'
                    + '</ul><strong class="g-show-title">相关应用</strong><ul class="m-hideshow-top">'
                    + '<li><a href="http://tj.tt1386.com/805232152/2810004"><img src="http://m.cr173.com/skin/new2016/images/androidad-12.jpg" /><p><strong>手机百度</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/892321139/5240004"><img src="http://m.cr173.com/skin/new2016/images/androidad-13.jpg" /><p><strong>微信多开助手</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/975247891/1770004"><img src="http://m.cr173.com/skin/new2016/images/androidad-14.jpg" /><p><strong>wifi万能钥匙</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/250291131/2190004"><img src="http://m.cr173.com/skin/new2016/images/androidad-15.jpg" /><p><strong>猎豹清理大师</strong><b>下载</b></p></a></li>'
                    + '</ul>';
                var province = '';
                var city = '';
                var html = '';
                if ($('.m-down-ul li a').attr('ispc')) {
                    html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>该软件无安卓版，'
                        + '大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>' + androidHtml
                        + '</div><b class="m-black-bg"></b></div>';
                }
                else {
                    html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>大家<span>'
                        + '还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>' + androidHtml
                        + '</div><b class="m-black-bg"></b></div>';
                }
                if ($('.m-click-show').length <= 0) {
                    $('body').append(html);
                }

                var remotIpInfo = {
                    ret: 1,
                    start: -1,
                    end: -1,
                    country: '\u4e2d\u56fd',
                    province: '\u6e56\u5317',
                    city: '\u6b66\u6c49',
                    district: '',
                    isp: '',
                    type: '',
                    desc: ''
                };
                province = remotIpInfo.province;
                city = remotIpInfo.city;
                if (city !== '北京' && city !== '上海' && city !== '武汉') {
                    var girlAd1 = '<li><a href="http://tj.tt1386.com/426380548/5690000"><img src="http://m.cr173.com/skin/new2016/images/androidad-16.jpg" /><p><strong>微信抢红包神器 </strong><b>下载</b></p></a></li>'
                        + '<li><a href="http://tj.tt1386.com/385389716/0330000"><img src="http://pic.cr173.com/up/2016-3/201633850162327.jpg" /><p><strong>平安好医生</strong><b>下载</b></p></a></li>'
                        + '<li><a href="http://tj.tt1386.com/119380772/7510000"><img src="http://m.cr173.com/skin/new2016/images/androidad-18.jpg" /><p><strong>捕鱼大师</strong><b>下载</b></p></a></li>'
                        + '<li><a href="http://l.mugua123.net/a9706.html"><img src="http://m.cr173.com/skin/new2016/images/zsad1.png" /><p><strong>夜色影院</strong><b>下载</b></p></a></li>';
                    var girlAd2 = '<li><a href="http://tj.tt1386.com/847368667/6710000"><img src="http://img.itmop.com/upload/2016-3/20163251551457802.png" /><p><strong><i>1</i> BB直播</strong><span>直播TV / 中文</span></p><b>下载</b></a></li>'
                        + '<li><a href="http://u.qiusai8.net/a9718.html"><img src="http://m.cr173.com/skin/new2016/images/zsad2.png" /><p><strong><i>2</i>极欲视频</strong><span>美女视频 / 中文</span></p><b>下载</b></a></li>';
                    var wdjHref = 'http://' + generateMixed(2) + '.' + downDomain + '/' + generateMixed(6) + '884' + generateMixed(3) + '/setup.apk';
                    var wdjAd = '<a href="' + wdjHref + '"class="u-wdj-img"><img src = "http://m.cr173.com/skin/new2016/images/wdjad.jpg" /></a>';
                    for (i = 0; i < 4; i++) {
                        $('.m-hideshow-top').first().find('li').eq(i).remove();
                    }
                    $('.m-hideshow-topt').first().prepend(girlAd1);
                    for (i = 0; i < 2; i++) {
                        $('.m-hideshow-middle').first().find('li').eq(i).remove();
                    }
                    $('.m-hideshow-middle').prepend(girlAd2);
                    $('.m-hideshow-top').first().before(wdjAd);
                }
            }
            function iosTancent() {
                var ioshtml = '<ul class="m-hideshow-top">'
                    + '<li><a href="http://tj.tt1386.com/262029296/0080005"><img src="http://m.cr173.com/skin/new2016/images/iosad-1.jpg" /><p><strong>去吧皮卡丘</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/315045178/8880005"><img src="http://m.cr173.com/skin/new2016/images/iosad-2.jpg" /><p><strong>口袋妖怪复刻</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/142006155/3580005"><img src="http://m.cr173.com/skin/new2016/images/iosad-3.jpg" /><p><strong>小冰冰传奇</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/262006271/8420005"><img src="http://m.cr173.com/skin/new2016/images/iosad-4.jpg" /><p><strong>全民枪战</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/415266950/9140005"><img src="http://m.cr173.com/skin/new2016/images/iosad-5.jpg" /><p><strong>口袋妖怪起源</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/027053379/7900005"><img src="http://m.cr173.com/skin/new2016/images/iosad-6.jpg" /><p><strong>我在大清当皇帝</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/249235356/7320005"><img src="http://m.cr173.com/skin/new2016/images/iosad-7.jpg" /><p><strong>我的世界</strong><b>下载</b></p></a></li>'
                    + ' <li><a href="http://tj.tt1386.com/825312968/2660005"><img src="http://m.cr173.com/skin/new2016/images/iosad-8.jpg" /><p><strong>东方头条</strong><b>下载</b></p></a></li>'
                    + '</ul><strong class="g-show-title">游戏排行榜</strong>'
                    + '<ul class="m-hideshow-middle">'
                    + '<li><a href="http://tj.tt1386.com/645185551/0070005"><img src="http://m.cr173.com/skin/new2016/images/iosad-9.jpg" /><p><strong><i>1</i>死神觉醒</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li>'
                    + '<li><a href="http://tj.tt1386.com/799027351/9960005"><img src="http://m.cr173.com/skin/new2016/images/iosad-10.jpg" /><p><strong><i>2</i>少年三国志</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li>'
                    + '<li><a href="http://tj.tt1386.com/016087028/3190005"><img src="http://m.cr173.com/skin/new2016/images/iosad-11.jpg" /><p><strong><i>3</i>究极数码暴龙</strong><span>卡牌养成 / 中文</span></p><b>下载</b></a></li>'
                    + '</ul><strong class="g-show-title">相关推荐</strong>'
                    + '<ul class="m-hideshow-top">'
                    + '<li><a href="http://tj.tt1386.com/471099000/2960005"><img src="http://m.cr173.com/skin/new2016/images/iosad-12.jpg" /><p><strong>神奇宝贝绿宝石</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/575302538/1400005"><img src="http://m.cr173.com/skin/new2016/images/iosad-13.jpg" /><p><strong>口袋妖怪重制</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/527321473/0960005"><img src="http://m.cr173.com/skin/new2016/images/iosad-14.jpg" /><p><strong>热血战神</strong><b>下载</b></p></a></li>'
                    + '<li><a href="http://tj.tt1386.com/533052612/2250005"><img src="http://m.cr173.com/skin/new2016/images/iosad-15.jpg" /><p><strong>血族</strong><b>下载</b></p></a></li>'
                    + '</ul>';
                if ($('.m-click-show').length <= 0) {
                    if ($('.m-down-ul li a').attr('ispc')) {
                        $('body').append('<div class="m-click-show"><div class="m-show-cont">'
                            + '<strong class="g-show-title"><p>该软件无苹果版，'
                            + '大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>' + ioshtml
                            + '</div><b class="m-black-bg"></b></div>');
                        $('.m-down-ul li a').attr('href', 'javascript:;');
                    }
                    else {
                        $('body').append('<div class="m-click-show"><div class="m-show-cont">'
                            + '<strong class="g-show-title"><p>大家<span>还喜欢</span>这些：</p></strong>'
                            + '<b class="m-close-btn">+</b>' + ioshtml
                            + '</div><b class="m-black-bg"></b></div>');
                    }
                }
            }
            function addhighLab() {
                $.getScript('http://ca.6071.com/?id=cr1731002333_utf8', function () {});
            }
            function iossoftAdd() {
                $.getScript('http://ca.6071.com/?id=cr17310023331_utf8', function () {});
            }
        },
        init: function () {
            this.getScript(); // getScript插件
            this.d1GameShow(); // 展示相应内容
            this.tanCentShow(); // 点击下载
        }
    };
    customElem.prototype.build = function () {
        downFunction.init();
    };
    return customElem;
});
