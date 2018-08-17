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
        this._openWin;
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
        var w = Math.floor(Math.min(700, screen.width * 0.9));
        var h = Math.floor(Math.min(450, screen.height * 0.9));
        var x = Math.floor((screen.width - w) / 2);
        var y = Math.floor((screen.height - h) / 2)
        var winParam = 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y
                        + ',resizable=yes,scrollbars=yes';
        loginUrl = this._splice(loginUrl);

        try {
            this._openWin = window.open(loginUrl, '_blank', winParam);
        } catch (e) {
            console.error('DOM', 'Failed to open url on target: _blank', e);
        }
        if (!this._openWin) {
            this._openWin = window.open(loginUrl, '_top');
        }
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
            credentials: 'include'
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
        var returnUrl = encodeURIComponent('https://c.mipcdn.com/static/v1/mip-login-done/mip-login-done.html?url=' + encodeURIComponent(this._href));
        if (search && search.length > 1) {
            url += '&returnUrl=' + returnUrl + '&url=' + this._href;
        }
        else {
            url += '?returnUrl=' + returnUrl + '&url=' + this._href;
        }
        return url;
    };

    return Login;
});
