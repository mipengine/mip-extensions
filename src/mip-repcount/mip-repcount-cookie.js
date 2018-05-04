define(function(require) {
    'use strict';
    var md5 = require('./mip-repcount-md5');
    /**
     */
    /*
     * cookie方法集
     */
    /*
     * Is property a string?
     */
    function isString(property) {
        return typeof property === 'string' || property instanceof String;
    }

    function parseCookieString(text, shouldDecode) {
        var cookies = {};

        if (isString(text) && text.length > 0) {

            var decodeValue = shouldDecode ? decodeURIComponent : same;
            var cookieParts = text.split(/;\s/g);
            var cookieName;
            var cookieValue;
            var cookieNameValue;

            for (var i = 0, len = cookieParts.length; i < len; i++) {

                // Check for normally-formatted cookie (name-value)
                cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
                if (cookieNameValue instanceof Array) {
                    try {
                        cookieName = decodeURIComponent(cookieNameValue[1]);
                        cookieValue = decodeValue(cookieParts[i]
                            .substring(cookieNameValue[1].length + 1));
                    } catch (ex) {
                        // Intentionally ignore the cookie -
                        // the encoding is wrong
                    }
                } else {
                    // Means the cookie does not have an "=", so treat it as
                    // a boolean flag
                    cookieName = decodeURIComponent(cookieParts[i]);
                    cookieValue = '';
                }

                if (cookieName) {
                    cookies[cookieName] = cookieValue;
                }
            }

        }

        return cookies;
    }

    function isNonEmptyString(s) {
        return isString(s) && s !== '';
    }

    function validateCookieName(name) {
        if (!isNonEmptyString(name)) {
            throw new TypeError('Cookie name must be a non-empty string');
        }
    }

    function same(s) {
        return s;
    }
    /*
     * cookie方法集
     */

    /*
     * 从url中获取域名
     */
    function getHostName(url) {
        // scheme : // [username [: password] @] hostame [: port] [/ [path] [? query] [# fragment]]
        var e = new RegExp('^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)'),
            matches = e.exec(url);

        return matches ? matches[1] : url;
    }
    /*
     * 获取主域名
     */
    function getDomain(url) {
        var url = url || location.href;
        url = getHostName(url);

        var domainInfo = url.split('.');

        if (domainInfo.length >= 3) {
            domainInfo.splice(0, 1);
        }

        return domainInfo.join('.');
    }

    function createGuid() {
        for (var t = "", e = 1; 32 >= e; e++) {
            var i = Math.floor(16 * Math.random()).toString(16),
                t = t + i;
            8 != e && 12 != e && 16 != e && 20 != e || (t += "")
        }
        return this.guid = t += Math.ceil(1e6 * Math.random())
    }
    /*
     * 获取当前时间戳
     * 单位 ms
     */
    function getCurTimestamp() {
        return new Date().getTime();
    }
    /*
     * 获取8位随机字符串
     */
    function randomWord() {
        var str = '0123456789abcdefghijklmnopqrstuvwxyz',
            strLenth = str.length,
            ranLength = 8,
            ranStr = '';

        for (var i = 0; i < ranLength; i++) {
            ranStr += str.substr(Math.floor(Math.random() * strLenth), 1);
        }

        return ranStr;
    }

    function initReacteTo() { //跟有关
        var domain = getDomain();
        var cookieId = cookie.get("to8tocookieid");
        var session_id = cookie.get('to8tosessionid');
        if (!cookieId) {
            cookieId = createGuid();
            cookie.set("to8tocookieid", cookieId, { path: '/', domain: domain, expires: 2592e6 });
        }

        if (!session_id) {
            session_id = 's_' + md5(getCurTimestamp() + randomWord() + cookieId);
            cookie.set("to8tosessionid", session_id, { path: '/', domain: domain, expires: 18e5 });
        }

        cookie.getMid = function(sid) {
            var mid = 'm_' + md5(getCurTimestamp() + randomWord() + sid);
            return mid;
        };
        // var sid = session_id;
        // var mid = 'm_' + md5(getCurTimestamp() + randomWord() + sid);
        // cookie.mid = mid;

    }
    var cookie = {


        init: function(config) {
            var obj = {};
            for (var i in config) {
                if (config[i] || i) {
                    if (i == 'to8tocookieid') {
                        initReacteTo();
                    }
                    obj[config[i] || i] = cookie.get(i) || '';
                }
            }
            // if (cookie.mid) {
            //     obj.mid = cookie.mid;
            // }
            return obj;
        },

        get: function(name, options) {
            validateCookieName(name);

            if (typeof options === 'function') {
                options = {
                    converter: options
                };
            } else {
                options = options || {};
            }

            var cookies = parseCookieString(document.cookie, !options['raw']);
            return (
                options.converter || same)(cookies[name]);
        },

        set: function(name, value, options) {
            validateCookieName(name);

            options = options || {};
            var expires = options['expires'] || 5000;
            var domain = options['domain'];
            var path = options['path'];

            if (!options['raw']) {
                value = encodeURIComponent(String(value));
            }

            var text = name + '=' + value;

            // expires
            var date = expires;
            if (typeof date === 'number') {
                date = new Date();
                date.setTime(date.getTime() + expires);
            }
            if (date instanceof Date) {
                text += '; expires=' + date.toGMTString();
            }

            // domain
            if (isNonEmptyString(domain)) {
                text += '; domain=' + domain;
            }

            // path
            if (isNonEmptyString(path)) {
                text += '; path=' + path;
            }

            // secure
            if (options['secure']) {
                text += '; secure';
            }

            document.cookie = text;
            return text;
        },
        remove: function(name, options) {
            options = options || {};
            options['expires'] = new Date(0);
            return this.set(name, '', options);
        }
    };
    return cookie;
});