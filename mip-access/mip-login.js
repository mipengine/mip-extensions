/**
 * @file mip-login 组件
 * @author
 */

define(function (require) {
    var util = require('util');
    var fn = util.fn;

    /**
     * Login Class
     *
     * @param {Object} data url
     * @class
     */
    function Login(data) {
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
        var login = document.querySelectorAll('[on="tap:mip-access.login"]');
        var logout = document.querySelectorAll('[on="tap:mip-access.logout"]');
        for (var i = 0; i < login.length; i++) {
            login[i].addEventListener('click', this._login.bind(this));
        }
        for (var j = 0; j < logout.length; j++) {
            logout[j].addEventListener('click', this._logout.bind(this));
        }
    };

    /**
     * Check login params
     *
     * @return {boolean} if params is not empty
     */
    Login.prototype._checkParam = function () {
        var lc = this._loginConfig;
        if (!lc || !fn.isPlainObject(lc)) {
            return false;
        }
        for (var k in lc) {
            if (lc.hasOwnProperty(k)) {
                this._loginMap[k] = lc[k];
            }
        }
        return true;
    };

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
    };

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
    };

    /**
     * Splice function
     *
     * @param {string} url url
     * @return {string} splice login url
     */
    Login.prototype._splice = function (url) {
        var search = url.split('?');
        // warning: test, need delete
        var returnUrl = encodeURIComponent('http://localhost:3000/mip_access/mip-login-done?url=' + encodeURIComponent(this._href));
        if (search && search.length > 1) {
            url += '&returnUrl=' + returnUrl;
        }
        else {
            url += '?returnUrl=' + returnUrl;
        }
        return url;
    };

    return Login;
});
