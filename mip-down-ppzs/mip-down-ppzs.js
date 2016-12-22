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
            !function (t) {
                function e(c) {
                    if (n[c]) {
                        return n[c].exports;
                    }

                    var o = n[c] = {exports: {}, id: c, loaded: !1};
                    return t[c].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports;
                }
                var n = {};
                return e.m = t, e.c = n, e.p = '', e(0);
            }([function (t, e, n) {
                'use strict';n(7);
                var c = n(1).errcode;
                var o = n(2);
                var r = function () {
                        var t = {};
                        return t.downloadFast = function (t, e) {
                                if (e = 'function' == typeof e ? e : function () {}, 'object' != typeof t) {
                                    return e(c.PARAM, {
                                        msg: 'param "config" required'
                                    });
                                }

                                if (!t.channel) {
                                    return e(c.PARAM, {
                                        msg: '缺少参数: channel（该参数请向PP助手申请）'
                                    });
                                }

                                if (!t.ch_src) {
                                    return e(c.PARAM, {
                                        msg: '缺少参数: ch_src（该参数请向PP助手申请）'
                                    });
                                }

                                if (!t.mode && !t.packageName && !t.appId) {
                                    return e(c.PARAM, {
                                        msg: 'mode=0或者不传时，packageName或者appId必填一个'
                                    });
                                }

                                if (1 == t.mode && !t.durl) {
                                    return e(c.PARAM, {
                                        msg: 'mode=1时，durl必填'
                                    });
                                }

                                var n = Object.assign({
                                    channel: null,
                                    ch_src: null,
                                    ch: null,
                                    packageName: null,
                                    appId: null,
                                    durl: null,
                                    bs: 0,
                                    mode: 0,
                                    server: 'http://server.m.pp.cn',
                                    debug: !1
                                }, t);
                                1 == n.mode && (n.packageName = null, n.appId = null), o.activity({ch_src: n.ch_src, ch: 'dlf_start'}, n.server), $.ajax({
                                    type: 'get',
                                    url: n.server + '/download/url/new',
                                    dataType: 'json',
                                    data: {
                                        channel: n.channel,
                                        ch_src: n.ch_src,
                                        packageName: n.packageName,
                                        appId: n.appId,
                                        durl: n.durl,
                                        bs: n.bs,
                                        ch: n.ch
                                    },
                                    xhrFields: {
                                        withCredentials: !0
                                    },
                                    success: function (t) {
                                        t && t.state && 2e6 === t.state.code && t.data && t.data.downloadUrl ? 1 == n.mode ? t.data.durlKey ? (!!n.debug && console.log('尝试呼起PP助手进行高速下载(加密方式)'), Pcae.Wapi.doSomething(t.data.durlKey, function (r) {
                                            r ? (!!n.debug && console.log('成功呼起PP助手进行高速下载'), e(c.OK, {
                                                msg: '成功呼起PP助手进行高速下载'
                                            }), o.activity({ch_src: n.ch_src, ch: 'dlf_launch_success'}, n.server)) : (o.activity({ch_src: n.ch_src, ch: 'dlf_launch_fail'}, n.server), !!n.debug && console.log('呼起PP助手进行高速下载失败（可能PP没安装 或者 PP已安装但没进程在跑），将直接下载PP助手/目标应用'), e(c.OK, {
                                                msg: '呼起PP助手进行高速下载失败，将直接下载PP助手/目标应用'
                                            }), window.location.href = t.data.downloadUrl);
                                        })) : (!!n.debug && console.log('服务器返回durlKey错误，将直接下载PP助手/目标应用'), e(c.OK, {
                                            msg: '服务器返回durlKey错误，将直接下载PP助手/目标应用'
                                        }), window.location.href = t.data.downloadUrl) : t.data.appId ? (!!n.debug && console.log('尝试呼起PP助手进行高速下载(appId)'), Pcae.Wapi.downloadFast(t.data.appId, function (r) {
                                            r ? (!!n.debug && console.log('成功呼起PP助手进行高速下载'), e(c.OK, {
                                                msg: '成功呼起PP助手进行高速下载'
                                            }), o.activity({ch_src: n.ch_src, ch: 'dlf_launch_success'}, n.server)) : (o.activity({ch_src: n.ch_src, ch: 'dlf_launch_fail'}, n.server), !!n.debug && console.log('呼起PP助手进行高速下载失败（可能PP没安装 或者 PP已安装但没进程在跑），将直接下载PP助手/目标应用'), e(c.OK, {
                                                msg: '呼起PP助手进行高速下载失败，将直接下载PP助手/目标应用'
                                            }), window.location.href = t.data.downloadUrl);
                                        })) : (!!n.debug && console.log('服务器返回appId错误，将直接下载PP助手/目标应用'), e(c.OK, {
                                            msg: '服务器返回appId错误，将直接下载PP助手/目标应用'
                                        }), window.location.href = t.data.downloadUrl) : (!!n.debug && console.log('PP服务器返回出错，或者PP资源库查无此应用'), e(c.INTERNAL_ERROR, {
                                            msg: 'PP服务器返回出错，或者PP资源库查无此应用'
                                        }));
                                    },
                                    error: function () {
                                        !!n.debug && console.log('网络请求失败'), e(c.NETWORK_ERROR, {
                                            msg: '网络请求失败'
                                        });
                                    }
                                });
                            }, t;
                    }();
                window.Pdlh = r, t.exports = r;
            }, function (t, e) {
                'use strict';
                t.exports = {
                    errcode: {OK: 0, PARAM: 1, INTERNAL_ERROR: 2, NETWORK_ERROR: 3, UNKNOWED: 100}
                };
            }, function (t, e) {
                'use strict';
                t.exports = function () {
                    function t(t, e) {
                        if ('object' == typeof e) {
                            var n = t + '?uc_param_str=frvecpeimintnidnut';
                            e && e.ch_src && (n += '&ch_src=' + e.ch_src), e && e.ch && (n += '&ch=' + e.ch), (new Image).src = n;
                        }
                    }
                    var e = {};
                    var n = 'http://server.m.pp.cn';
                    return e.access = function (e, c) {
                            !c && (c = n), t(c + '/log/access', e);
                        }, e.click = function (e, c) {
                            !c && (c = n), t(c + '/log/click', e);
                        }, e.activity = function (e, c) {
                            !c && (c = n), t(c + '/log/activity', e);
                        }, e;
                }();
            },,, function (t, e) {
                'use strict';
                function n(t) {
                    return null !== t && ('object' == typeof t || 'function' == typeof t);
                }
                function c(t) {
                    if (null === t || void 0 === t) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    return Object(t);
                }
                function o(t, e, c) {
                    var o = e[c];
                    void 0 !== o && null !== o && (i.call(t, c) && n(o) ? t[c] = r(Object(t[c]), e[c]) : t[c] = o);
                }
                function r(t, e) {
                    if (t === e) {
                        return t;
                    }

                    e = Object(e);
                    for (var n in e) {
                        i.call(e, n) && o(t, e, n);
                    }
                    if (Object.getOwnPropertySymbols) {
                        for (var c = Object.getOwnPropertySymbols(e), r = 0; r < c.length; r++) {
                            s.call(e, c[r]) && o(t, e, c[r]);
                        }

                    }
                    return t;
                }
                function a(t) {
                    t = c(t);
                    for (var e = 1; e < arguments.length; e++) {
                        r(t, arguments[e]);

                    }
                    return t;
                }
                var i = Object.prototype.hasOwnProperty;
                var s = Object.prototype.propertyIsEnumerable;
                'function' != typeof Object.assign && (Object.assign = r), Object.deepAssign = a;
            }, function (t, e) {
                'use strict';
                var n = {};
                window.Pcae = n, void 0 === window.pcae && (window.pcae = n), t.exports = n;
            }, function (t, e, n) {
                'use strict';
                var c = n(8);
                var o = n(6);
                'function' == typeof $ && $.ajax && (c = $);
                var r = function () {
                    function t(e, n) {
                        try {
                            c.ajax({
                                type: 'get',
                                contentType: 'text/plain',
                                data: {},
                                timeout: i,
                                url: o(e),
                                success: function () {
                                    n(!0);
                                },
                                error: function () {
                                    48333 === e ? t(48433, n) : n(!1);
                                }
                            });
                        }
                        catch (r) {
                            console.error('e:' + r), n(!1);
                        }
                    }
                    function e(t, n, r) {
                        try {
                            c.ajax({
                                type: 'post',
                                contentType: 'text/plain',
                                data: JSON.stringify({type: 1, id: n}),
                                timeout: i,
                                url: o(t),
                                success: function () {
                                    r(!0);
                                },
                                error: function () {
                                    48333 === t ? e(48433, n, r) : r(!1);
                                }
                            });
                        }
                        catch (a) {
                            console.error('e:' + a), r(!1);
                        }
                    }
                    function n(t, e, r) {
                        try {
                            c.ajax({
                                type: 'post',
                                contentType: 'text/plain',
                                data: JSON.stringify({type: 6, info: e}),
                                timeout: i,
                                url: o(t),
                                success: function () {
                                    r(!0);
                                },
                                error: function () {
                                    48333 === t ? n(48433, e, r) : r(!1);
                                }
                            });
                        }
                        catch (a) {
                            console.error('e:' + a), r(!1);
                        }
                    }
                    function o(t) {
                        return 'http://127.0.0.1:' + t;
                    }
                    var r = {};
                    var a = 48333;
                    var i = 200;
                    return r.checkPP = function (e) {
                            t(a, e);
                        }, r.downloadFast = function (t, n) {
                            e(a, t, n);
                        }, r.doSomething = function (t, e) {
                            n(a, t, e);
                        }, r;
                }();
                o.Wapi = r, t.exports = o;
            }, function (t, e, n) {
                'use strict';n(5), t.exports = function () {
                    function t() {
                        if (!(!window.XMLHttpRequest || window.location && 'file:' === window.location.protocol && window.ActiveXObject)) {
                            return new XMLHttpRequest;
                        }

                        try {
                            return new ActiveXObject('Microsoft.XMLHTTP');
                        }
                        catch (t) {}
                        try {
                            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
                        }
                        catch (t) {}
                        try {
                            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
                        }
                        catch (t) {}
                        try {
                            return new ActiveXObject('Msxml2.XMLHTTP');
                        }
                        catch (t) {}
                        throw Error('Could not find XHR')
                    }
                    function e(t) {
                        if ('string' == typeof t) {
                            return t;
                        }

                        var e = [];
                        for (var n in t) {
                            e.push(n + '=' + t[n]);
                        }
                        return e.join('&');
                    }
                    var n = {};
                    return n.ajax = function (n) {
                            var c = Object.assign({
                                    url: '',
                                    type: 'GET',
                                    header: {},
                                    contentType: 'application/x-www-form-urlencoded',
                                    async: !0,
                                    data: {}
                                }, n);
                            var o = t();
                            o.open(c.type.toUpperCase(), c.url, c.async);
                            var r = c.header || {};
                            r['Content-Type'] = c.contentType;
                            for (var a in r) {
                                o.setRequestHeader(a, r[a]);
                            }
                            o.onreadystatechange = function () {
                                if (4 === o.readyState) {
                                    if (o.status >= 200 && o.status < 300 || 304 === o.status) {
                                        var t = c.success;
                                        'function' == typeof t && t(o);
                                    }
                                    else {
                                        var e = c.error;
                                        'function' == typeof e && e(o);
                                    }
                                    var n = c.complete;
                                    'function' == typeof n && n(o);
                                }

                            }, o.send(e(c.data) || null);
                        }, n;
                }();
            }]);
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
                    $nav.css({position: 'fixed', top: 0}).addClass('newBox-on');
                }
                else {
                    $nav.css({
                        position: 'relative'
                    }).removeClass('newBox-on');
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
