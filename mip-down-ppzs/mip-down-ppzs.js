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
        var curappPpid = 0;
        var webInfoPpid = $('#down-href').attr('platid');
        if (browser.versions.android && localStorage.getItem('ppzs') !== 'Yes'
        && $('#plat_Android').attr('TypeID') !== '58') {
            var oflag = true;
            var pphref = '';
            if (webInfoPpid > 0) {
                curappPpid = webInfoPpid;
                pphref = 'http://server.m.pp.cn/download/apk/new?appId=' + curappPpid
                + '&ch=default&ch_src=pm_pc6&channel=PM_5118';
            }
            else {
                pphref = 'https://server-m.pp.cn/download/apk/new?channel=PM_5118&ch=default&ch_src=pm_pc6&bs=1&durl='
                + encodeURI($('#info #btns a').attr('href'));
            }
            $('#info #btns').after('<div class="newBox"><div class="topBox"><div class="btn-checkbox">'
            + '<em class="icon-check"></em>PP助手高速下载</div><a href="" class="pptvHref">高速下载</a></div><div class="normal">'
			+ '<div class="main"><em class="icon"></em><span></span></div></div></div>');
            $('#info .normal span').html('PP助手是全面、专业的应用市场，将为您安装PP手机助手，启动高速引擎，安全无毒、极速下载应用！');
            $('#info #btns').hide();
            $('.newBox').show();
            $('.newBox .pptvHref').attr('href', pphref);
            $('.btn-checkbox').click(function () {
                if (oflag) {
                    $(this).find('em').addClass('icon-active');
                    $(this).siblings('a').addClass('noBg').html('普通下载').attr('href', $('#info #btns a').attr('href'));
                    $(this).parents().find('.normal').addClass('tipShow');
                    $('#info .normal span').html('使用普通下载无法避免流量劫持、下载较慢等问题，建议选择PP手机助手安全高速下载！');
                }
                else {
                    $(this).find('em').removeClass('icon-active');
                    $(this).siblings('a').removeClass('noBg').html('高速下载').attr('href', pphref);
                    $(this).parents().find('.normal').removeClass('tipShow');
                    $('#info .normal span').html('PP助手是全面、专业的应用市场，将为您安装PP手机助手，启动高速引擎，安全无毒、极速下载应用！');
                }
                oflag = !oflag;
            });
            $('.newBox a').click(function (e) {

                if ($(this).prop('href').indexOf('channel=PM_') >= 0) {
                    localStorage.setItem('ppzs', 'Yes');
                    $(this).html('高速下载中...');
                    ppcheck.checkPP(function (r) {
                        if (r === true && curappPpid > 0) {
                            ppcheck.downloadFast(curappPpid, function (d) {
                                // console.log(d);
                            });
                        }
                        else {
                            window.location.href = pphref;
                        }
                    });
                    return false;
                }
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
    /**
    * PP安卓客户端私有协议（网络）
    */
    var ppcheck = (function () {
        var oe = {};
        var oport = 48333;
        var otimeout = 500; // 超时时间(ms)

        // 检测PP是否安装
        oe.checkPP = function (callback) {
            doCheck(oport, callback);
        };
        // 高速下载
        oe.downloadFast = function (appId, callback) {
            doDownload(oport, appId, callback);
        };
        // 加密方式调起PP进行对应操作
        oe.doSomething = function (key, callback) {
            doDoSomething(oport, key, callback);
        };
        function doCheck(port, callback) {
            $.ajax({
                type: 'get',
                dataType: 'text',
                timeout: otimeout,
                data: {},
                url: getLocalPPAddr(port),
                complete: function (res, textStatus) {
                    if (res.status === 200) {
                        callback(true);
                    }
                    else {
                        if (port === 48333) {
                            doCheck(48433, callback);
                        }
                        else {
                            callback(false);
                        }
                    }
                }
            });
        }

        function doDownload(port, appId, callback) {
            $.ajax({
                type: 'post',
                dataType: 'text',
                timeout: otimeout,
                data: JSON.stringify({type: 1, id: appId}),
                url: getLocalPPAddr(port),
                complete: function (res, textStatus) {
                    if (res.status === 200) {
                        callback(true);
                    }
                    else {
                        if (port === 48333) {
                            doDownload(48433, appId, callback);
                        }
                        else {
                            callback(false);
                        }
                    }
                }
            });
        }
        function doDoSomething(port, key, callback) {
            $.ajax({
                type: 'post',
                dataType: 'text',
                timeout: otimeout,
                data: JSON.stringify({type: 6, info: key}),
                url: getLocalPPAddr(port),
                complete: function (res, textStatus) {
                    if (res.status === 200) {
                        callback(true);
                    }
                    else {
                        if (port === 48333) {
                            doDoSomething(48433, key, callback);
                        }
                        else {
                            callback(false);
                        }
                    }
                }
            });
        }
        function getLocalPPAddr(port) {
            return 'http://127.0.0.1:' + port;
        }
        return oe;
    })();

    customElem.prototype.build = function () {
        ppzsAd();
    };

    return customElem;
});
