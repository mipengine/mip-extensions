/**
 * @file mip-access 组件
 * @author wupeng10@baidu.com
 */

define(function (require) {
    var util = require('util');
    var viewer = require('viewer');
    var md5 = require('./mip-access-md5');
    var LoginModule = require('./mip-login');
    var evaluateAccessExpr = require('./mip-access-expr');

    var fn = util.fn;
    var AccessType = {
        CLIENT: 'client',
        SERVER: 'server',
        OTHER: 'other'
    };
    var TAG = 'mip-access';
    var CustomStorage = util.customStorage;
    var storage = new CustomStorage(0);
    var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;

    /**
     * Access Class
     *
     * @class
     */
    function Access() {
        var elements = document.querySelectorAll('[mip-access-hide]');
        for (var i = 0; i < elements.length; i++) {
            elements[i]._display = util.css(elements[i], 'display');
        }
    }

    /**
     * Start parsing access process
     *
     */
    Access.prototype._start = function () {
        this._init();
        if (!this._enabled) {
            return;
        }
        this._startInternal();
    };

    /**
     * Access type distinction
     *
     */
    Access.prototype._startInternal = function () {
        switch (this._type) {
            case AccessType.CLIENT:
                this._runAuthorization();
                this._runPingback();
                break;
            case AccessType.SERVER:
            case AccessType.OTHER:
                break;
        }
    };

    /**
     * Initialize the variable
     *
     */
    Access.prototype._init = function () {
        var accessElement = document.querySelector('script[mip-access]');
        this._enabled = !!accessElement;
        if (!this._enabled) {
            return;
        }
        var configJson = JSON.parse(accessElement.textContent);
        this._rid = this._buildRid();
        this._type = this._buildConfigType(configJson);
        this._loginConfig = this._buildConfigLoginMap(configJson);
        this._login = new LoginModule(this._loginConfig);
        this._login.bindEvent();
        this._authorization = this._buildUrl(configJson.authorization);
        this._noPingback = configJson.noPingback;
        this._pingback = this._buildUrl(configJson.pingback);
        this._hideType = configJson.hideType ? configJson.hideType : 0;
        this._authorizationFallback = configJson.authorizationFallbackResponse;
        this._bindEvent();
    };

    /**
     * Build type config
     *
     * @param {Object} configJson config param
     * @return {string} type
     */
    Access.prototype._buildConfigType = function (configJson) {
        return configJson.type ? configJson.type : AccessType.CLIENT;
    };

    /**
     * Build login config
     *
     * @param {Object} configJson config param
     * @return {Object|string} login url
     */
    Access.prototype._buildConfigLoginMap = function (configJson) {
        var loginMap = {};
        var loginConfig = configJson.login;
        if (typeof loginConfig === 'string') {
            loginMap.signIn = this._buildUrl(loginConfig);
        }
        else if (fn.isPlainObject(loginConfig)) {
            for (var k in loginConfig) {
                if (!!k && loginConfig.hasOwnProperty(k)) {
                    loginMap[k] = this._buildUrl(loginConfig[k]);
                }
            }
        }
        return loginMap;
    };

    /**
     * Build rid config
     *
     * @return {string} reader id
     */
    Access.prototype._buildRid = function () {
        var rid = storage.get(TAG);
        if (!rid) {
            rid = this._buildCryptoRid();
            storage.set(TAG, rid);
        }
        return rid;
    };

    /**
     * Build crypto id
     *
     * @return {string} md5 reader id
     */
    Access.prototype._buildCryptoRid = function () {
        return 'mip-'
        + md5(String(window.location.href + Date.now()
        + window.Math.random() + window.screen.width + window.screen.height));
    };

    /**
     * Ping back to publisher server when dom ready
     *
     */
    Access.prototype._runPingback = function () {
        if (document.readyState === 'complete') {
            this._applyPingback();
        }
        else {
            var handle = this._applyPingback.bind(this);
            window.addEventListener('load', handle, false);
        }
    };

    /**
     * Request ping back interface
     *
     */
    Access.prototype._applyPingback = function () {
        fetch(this._pingback, {
            credentials: 'include'
        }).then(function (res) {});
    };

    /**
     * Start run authorization
     *
     */
    Access.prototype._runAuthorization = function () {
        this._hideElements();
        this._applyAuthorization();
    };

    /**
     * Hide element which has mip-access-hide attribute before authorization
     *
     */
    Access.prototype._hideElements = function () {
        var elements = document.querySelectorAll('[mip-access-hide]');
        for (var i = 0; i < elements.length; i++) {
            if (this._hideType) {
                var tagName = elements[i].tagName.toLowerCase();
                switch (tagName) {
                    case 'mip-img':
                        elements[i].removeAttribute('src');
                        elements[i].classList.add('blur-bg');
                        break;
                    case 'mip-video':
                        elements[i].removeAttribute('src');
                        elements[i].classList.add('blur-bg');
                        break;
                    default:
                        elements[i].classList.add('elide');
                        break;
                }
            }
            else {
                util.css(elements[i], 'display', 'none');
            }
        }
    };

    /**
     * Request authorization interface and parse it
     *
     */
    Access.prototype._applyAuthorization = function () {
        var self = this;
        fetch(self._authorization, {
            credentials: 'include'
        }).then(function (res) {
            if (res.ok) {
                res.text().then(function (data) {
                    self._authorizationFallback = JSON.parse(data);
                    self._applyAuthorizationToElement();
                });
            }
            else {
                self._applyAuthorizationToElement();
            }
        }).catch(function () {
            self._applyAuthorizationToElement();
        });
    };

    /**
     * Determin whether dom element show or hide
     *
     */
    Access.prototype._applyAuthorizationToElement = function () {
        if (this._authorizationFallback) {
            var elements = document.querySelectorAll('[mip-access]');
            for (var i = 0; i < elements.length; i++) {
                var on = true;
                var expr = elements[i].getAttribute('mip-access');
                if (expr) {
                    on = evaluateAccessExpr(expr, this._authorizationFallback);
                }
                if (!on) {
                    if (this._hideType) {
                        elements[i].classList.add('elide');
                    }
                    else {
                        util.css(elements[i], 'display', 'none');
                    }
                }
                else {
                    if (this._hideType) {
                        elements[i].classList.remove('elide');
                    }
                    else {
                        var display = elements[i]._display;
                        display = display ? display : 'block';
                        util.css(elements[i], 'display', elements[i]._display);
                    }
                }
                elements[i]._display = undefined;
            }
        }
    };

    /**
     * Instead varible to value in url
     *
     * @param {string} url url
     * @return {string} url of authorization
     */
    Access.prototype._buildUrl = function (url) {
        var vars = this._prepareUrlVars();
        return this._urlReplacements(url, vars);
    };

    /**
     * Prepare varible, it can be used in url
     *
     * @return {Object} varibles list object
     */
    Access.prototype._prepareUrlVars = function () {
        var sourceUrl = window.location.href;
        var canonical = document.head.querySelector('link[rel="canonical"]');
        canonical = canonical ? canonical.href : sourceUrl;
        var mipUrl = sourceUrl;
        var matchs = sourceUrl.match(reg);
        if (viewer.isIframed && matchs.length > 1) {
            var domain = matchs[1];
            var pth = mipUrl.slice(mipUrl.indexOf(domain));
            var protocol = sourceUrl.match(/\/s\//) ? 'https://' : 'http://';
            mipUrl = protocol + pth;
        }
        var vars = {
            READER_ID: this._rid,
            SOURCE_URL: this._getUrlWithoutFragment(sourceUrl),
            MIPDOC_URL: this._getUrlWithoutFragment(mipUrl),
            CANONICAL_URL: this._getUrlWithoutFragment(canonical),
            DOCUMENT_REFERRER: document.referrer,
            RANDOM: Math.random()
        };
        vars.AUTHDATA = function (field) {
            if (this._authorizationFallback) {
                return this._authorizationFallback[field];
            }
            return undefined;
        };
        return vars;
    };

    /**
     * Get url without fragmeent
     *
     * @param {string} url url
     * @return {string} url of authorization
     */
    Access.prototype._getUrlWithoutFragment  = function (url) {
        if (!url) {
            return;
        }
        var ele = document.createElement('a');
        ele.href = url;
        return ele.protocol + '//' + ele.host + ele.port + ele.pathname;
    };

    /**
     * Instead varible
     *
     * @param {string} url url
     * @param {Object} vars varibles list
     * @return {Object} url of authorization
     */
    Access.prototype._urlReplacements = function (url, vars) {
        for (var key in vars) {
            if (vars.hasOwnProperty(key)) {
                var val = key === 'AUTHDATA' ? vars[key]() : vars[key];
                var reg = new RegExp('=' + key, 'g');
                url = url.replace(reg, '=' + encodeURIComponent(val));
            }
        }
        return url;
    };

    /**
     * Bind event for login
     *
     */
    Access.prototype._bindEvent = function () {
        var self = this;
        window.addEventListener('message', function (event) {
            if ((event.origin === 'https://mipcache.bdstatic.com'
                || event.origin === 'https://c.mipcdn.com')
                && event.source && event.data
                && event.data.type === 'refresh') {
                if (event.source && event.source === self._login._openWin) {
                    location.reload();
                    event.source.postMessage({
                        type: 'success'
                    }, event.origin);
                }
            }
        });
    };

    return new Access()._start();
});
