/**
 * @file mip-login 组件
 * @author
 */

define(function (require) {
    var util = require('util');
    var fn = util.fn;
    var EventEmitter = require('util').EventEmitter;

    /**
     * Login Class
     *
     */
    function Login (data) {
        this._loginMap = [];
        this._loginConfig = data;
        this._href = window.location.href;
    }

    /**
     * Bind login tap evetn
     *
     */
    Login.prototype.bindEvent = function () {
        if (!this._checkParam()) {
            return;
        }
        var login = document.querySelectorAll("[on='tap:mip-access.login']");
        var logout = document.querySelectorAll("[on='tap:mip-access.logout']");
        for (key in login) {
            if (login[key].addEventListener) {
                login[key].addEventListener('click', this._login.bind(this));
            }
        }
        for (key in logout) {
            if (logout[key].addEventListener) {
                logout[key].addEventListener('click', this._logout.bind(this));
            }
        }
    }

    /**
     * Check login params
     *
     * @return {boolean} if params is not empty
     */
    Login.prototype._checkParam = function () {
        var lc = this._loginConfig;
        if (!lc) {
            return false;
        }
        if (fn.isPlainObject(lc)) {
            for (var k in lc) {
                if (!!k) {
                    this._loginMap[k] = lc[k];
                }
            }
        }
        return true;
    }

    /**
     * Login function
     *
     */
    Login.prototype._login = function () {
        if (!this._loginMap || !this._loginMap.login) {
            return;
        }
        var loginUrl = this._loginMap.login;
        var winParam = 'toolbar=yes,location=yes,directories=no'
                        + ',status=no,menubar=yes,scrollbars=yes'
                        + ',resizable=no,copyhistory=yes,width=400,height=400';
        loginUrl = this._splice(loginUrl);
        window.open(loginUrl, '_blank', winParam);
    }

    /**
     * Login function
     *
     */
    Login.prototype._logout = function () {
        if (!this._loginMap || !this._loginMap.logout) {
            return;
        }
        var logoutUrl = this._loginMap.logout;
        fetch(logoutUrl, {
            method: 'POST'
        }).then(function (res) {
            if (res.ok) {
                window.location.reload();
            }
        });
    }

    /**
     * Splice function
     *
     * @param {string} login url
     * @return {string} splice login url
     */
    Login.prototype._splice = function (url) {
        var search = url.split('?');
        // warning: test, need delete
        var returnUrl = encodeURIComponent('https://mipcache.bdstatic.com/static/v1/mip-access/mip-login-done.html?url=' + encodeURIComponent(this._href));
        if (search && search.length > 1) {
            url += '&returnUrl=' + returnUrl;
        } else {
            url += '?returnUrl=' + returnUrl;
        }
        return url;
    }

    return Login;
});
