define(function(require) {
    'use strict';
    /*
     * 获取公共参数
     */
    /*
     * Is property a string?
     */

    const arrKeys = ["lang", "dpi", "title", "curTime", "sendTime", "osVer", "refer", "url"];

    function isSupport(key) {
        return arrKeys.indexOf(key);
    }

    function getVal(i) {
        var fnObj = {
            'lang': function() {
                // console.log(Math.random() + 'lang');
                return (navigator.language || navigator.systemLanguage).toLowerCase();
            },
            'title': function() {
                return document.title;
            },
            'dpi': function() {
                return parseInt(screen.width, 10) + '*' + parseInt(screen.height, 10);
            },
            'url': function() {
                return location.href;
            },
            'curTime': function() {
                return new Date().getTime();
            },
            'sendTime': function() {
                return new Date().getTime();
            },
            'osVer': function() {
                var util = require('util');
                if (util.platform.isIos) {
                    return 'os-iOS';
                } else {
                    return 'os-Android';
                }
                // var MobileDetect = require('./mip-mobile-detect');

                // var u = navigator.userAgent;
                // var md = new MobileDetect(u);
                // var os = md.os();
                // if (os == 'iOS') {
                //     return 'os-iOS ' + md.version('iPhone');
                // } else {
                //     return 'os-Android ' + md.version('Android');
                // }
            },
            'refer': function() {
                var referrer = '';

                try {
                    referrer = window.top.document.referrer;
                } catch (e) {
                    if (window.parent) {
                        try {
                            referrer = window.parent.document.referrer;
                        } catch (e) {
                            referrer = '';
                        }
                    }
                }

                if (referrer === '') {
                    referrer = document.referrer;
                }

                return referrer;
            },
            'url': function() {
                return location.href;
            }
        };
        return fnObj[i].call();

    }

    var obj = {};
    var getComParam = {
        init: function(config) {
            for (var i in config) {
                if (isSupport(i) != -1 && !obj[config[i] || i]) {
                    obj[config[i] || i] = getVal(i);
                }
            }
            return obj;
        }

    };
    return getComParam;
});