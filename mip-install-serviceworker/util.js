/**
 * @file util
 * @author sekiyika(pengxing@baidu.com)
 */

define(function (require, exports) {

    /**
     * 判断 URL 是否是 service worker 安全
     *
     * @param {string} url url
     * @return {boolean}
     */
    exports.isSecureUrl = function (url) {
        if (typeof url === 'string') {
            url = this.parseUrl(url);
        }

        return (url.protocol === 'https:'
            || url.hostname === 'localhost'
            || this.endsWith(url.hostname, '.localhost'));
    };

    /**
     * string endsWith
     *
     * @param {string} str string
     * @param {string} suffix suffix
     * @return {boolean}
     */
    exports.endsWith = function (str, suffix) {
        var index = str.length - suffix.length;
        return index >= 0 && str.indexOf(suffix, index) === index;
    };

    /**
     * 缓存 a 标签
     *
     * @type {HTMLAnchorElement}
     */
    var a;

    /**
     * 缓存 URL 和处理后的结果
     *
     * @type {Object<string, !Location>}
     */
    var cache = {};

    /**
     * Returns a Location-like object for the given URL. If it is relative,
     * the URL gets resolved.
     * Consider the returned object immutable. This is enforced during
     * testing by freezing the object.
     *
     * @param {string} url url
     * @return {!Location}
     */
    exports.parseUrl = function (url) {
        if (!a) {
            a = document.createElement('a');
        }

        var fromCache = cache[url];
        if (fromCache) {
            return fromCache;
        }

        return cache[url] = parseUrlWithA(a, url);
    };

    /**
     * 返回链接处理后的结果，Location lke
     *
     * @param {!HTMLAnchorElement} a a element
     * @param {string} url url
     * @return {!Location}
     */
    function parseUrlWithA(a, url) {
        a.href = url;

        // IE11 doesn't provide full URL components when parsing relative URLs.
        // Assigning to itself again does the trick #3449.
        if (!a.protocol) {
            a.href = a.href;
        }

        /* eslint-disable eqeqeq */
        var info = {
            href: a.href,
            protocol: a.protocol,
            host: a.host,
            hostname: a.hostname,
            port: a.port == '0' ? '' : a.port,
            pathname: a.pathname,
            search: a.search,
            hash: a.hash,
            origin: null
        };

        // Some IE11 specific polyfills.
        // 1) IE11 strips out the leading '/' in the pathname.
        if (info.pathname[0] !== '/') {
            info.pathname = '/' + info.pathname;
        }

        // 2) For URLs with implicit ports, IE11 parses to default ports while
        // other browsers leave the port field empty.
        if ((info.protocol === 'http:' && info.port == 80)
            || (info.protocol === 'https:' && info.port == 443)) {
            info.port = '';
            info.host = info.hostname;
        }
        /* eslint-enable eqeqeq */

        // For data URI a.origin is equal to the string 'null' which is not useful.
        // We instead return the actual origin which is the full URL.
        if (a.origin && a.origin !== 'null') {
            info.origin = a.origin;
        }
        else if (info.protocol === 'data:' || !info.host) {
            info.origin = info.href;
        }
        else {
            info.origin = info.protocol + '//' + info.host;
        }

        return info;
    }

    /**
     * Returns the URL without fragment. If URL doesn't contain fragment, the same string is returned.
     *
     * @param {string} url source url
     * @return {string}
     */
    exports.removeFragment = function (url) {
        var index = url.indexOf('#');
        if (index === -1) {
            return url;
        }
        return url.substring(0, index);
    };

});
