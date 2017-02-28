/**
 * @file 百度好看调起客户端
 * @author  liujunqiu
 * @time 2016.11.29
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var util = require('util');
    var platform = util.platform;

    var androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1015351w.apk';
    var iosLink = 'https://itunes.apple.com/cn/app/id1092031003?mt=8';
    /**
     * 获取手机系统及版本号
     * return object: os 获取机型; osv 获取机型版本
     */
    var brower = (function () {
        // 系统
        var isiPhone = new RegExp('iPhone|iPad|iPod|iPh|iPd|iOS', 'i');
        var isAndroid = new RegExp('Android|Linux', 'i');
        // 版本号
        var iosVer = new RegExp('^.*OS\\s(\\d.*?)\\s.*$', 'i');
        var androidVer = new RegExp('^.*Android\\s(.*?);.*$', 'i');

        var userAgent = window.navigator.userAgent;

        var brower = {
            os: function () {
                if (platform.isIos()) {
                    return 'ios';
                }

                return 'android';
            },
            osv: function () {
                if (isAndroid.test(userAgent)) {
                    return userAgent.replace(androidVer, '$1');
                }
                else if (isiPhone.test(userAgent)) {
                    return userAgent.replace(iosVer, '$1').replace(/_/, '.');
                }

                return '';
            }
        };

        return brower;
    })();
    // 调起类型
    // var callType = ['article', 'topic', 'video', 'gallery', 'beauty', 'activity'];
    var userAgent = navigator.userAgent;
    var isIos9 = function () {
        if ((userAgent.match(/iPhone/i) || userAgent.match(/iPod/i))) {
            return Boolean(userAgent.match(/OS (9|10)_\d[_\d]* like Mac OS X/i));
        }

        return false;
    };
    var installApp = 0;

    function firstInviewCallback() {
        var element = this.element;

        var type = $(element).attr('type');
        var urlKey = $(element).attr('urlKey');
        var apk = $(element).attr('apk');
        var page = $(element).attr('page');
        var pos = '';

        if (typeof apk !== 'undefined' && brower.os() !== 'ios') {
            if (apk === '1') { // 首页底部浮层
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504p.apk';
                page = 'index_hk';
                pos = '1018504p';
            }
            else if (apk === '2') { // 详情页查看评论图集
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504q.apk';
                page = page;
                pos = '1018504q';
            }
            else if (apk === '3') { // 详情页精彩推荐
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504r.apk';
                page = page;
                pos = '1018504r';
            }
            else if (apk === '4') { // 个人中心
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504s.apk';
                page = 'erji_index_level';
                pos = '1018504s';
            }
            else if (apk === '5') {  // 详情页顶部浮层
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan1018504p.apk';
                page = page;
                pos = '1018504p';
            }
            else if (parseInt(apk, 10) > 5) {
                androidLink = 'http://dl.hao123.com/waphao123/tn_apk/baiduhaokan' + apk + '.apk';
                page = page;
                pos = apk + '&act=' + $(element).attr('act');
            }
        }

        var jump = 'http://wapsite.baidu.com/haokan/' + (type === 'article' ? 'doc' : type)
                    + '/detail?url_key=' + encodeURIComponent(urlKey);
        var schemaUrl = '';
        var appLink = '';
        if (type !== '' && urlKey !== '') {
            schemaUrl = type + '?url=' + encodeURIComponent(urlKey);
        }
        if (brower.os() === 'ios') {
            appLink = iosLink;
        }
        else {
            appLink = androidLink;
        }
        var schema = 'baiduhaokan://' + schemaUrl;

        // 判断微信
        var isWx = userAgent.match(/MicroMessenger/i);
        if (isWx) {
            appLink = jump;
        }

        var timer = '';
        $(element).find('.J_app_call').attr('href', jump);
        if (!isIos9()) {
            $(element).find('.J_app_call').bind('click', function (e) {
                if (typeof apk !== 'undefined' && brower.os() !== 'ios') {
                    new Image().src = '/tj.gif?page=' + page + '&pos=' + pos + '&t=' + new Date().getTime();
                }

                var nowTime = Date.now();
                // 安卓检测到安装才调起客户端
                if (brower.os() === 'android' && installApp === 1) {
                    window.location.href = schema;

                    if (
                        (brower.os() === 'android' && installApp !== 1)
                        || (brower.os() === 'android' && /baidubrowser/.test(userAgent))
                    ) {
                        timer = setTimeout(function () {
                            if (Date.now() - nowTime < 1200) {
                                window.location.href = appLink;
                            }
                            clearTimeout(timer);
                        }, 1000);
                    }
                }
                else if (brower.os() === 'ios') {
                    window.location.href = schema;
                    timer = setTimeout(function () {
                        if (Date.now() - nowTime < 1200) {
                            window.location.href = appLink;
                        }
                        clearTimeout(timer);
                    }, 1000);
                }
                else {
                    window.location.href = appLink;
                }

                return false;
            });
        }
    }

    function getJson(url, callback, cbName) {
        var cbFunName = cbName || '_Hao' + Math.floor(1e4 * Math.random());
        var scriptElm = document.createElement('script');
        scriptElm.src = url + '&cb=' + cbFunName + '&t=' + new Date().getTime();
        scriptElm.type = 'text/javascript';
        scriptElm.setAttribute('charset', 'utf-8');
        document.getElementsByTagName('head')[0].appendChild(scriptElm);
        window[cbFunName] = function (data) {
            if (typeof callback === 'function') {
                callback(data);
            }
            var tmpTimer = setTimeout(function () {
                document.getElementsByTagName('head')[0].removeChild(scriptElm);
                clearTimeout(tmpTimer);
            }, 20);
        };
    }

    if (brower.os() === 'android') {
        getJson('http://127.0.0.1:41333/ping/?callback=ping', function (ret) {
            if (ret.error === 0) {
                installApp = 1;
                if (!/baidubrowser/.test(navigator.userAgent)) {
                    $('.J_dl_content').html('打开');
                }
            }
        }, 'ping');
    }

    customElem.prototype.firstInviewCallback = firstInviewCallback;

    return customElem;
});
