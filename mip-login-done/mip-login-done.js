/**
 * @file mip-login-done 组件
 * @author
 */

define(function (require) {

    /**
     * Login Done Class
     *
     * @class
     */
    function LoginDone() {
        this._timeout = 3000;
    }

    /**
     * Start to handle login result
     *
     */
    LoginDone.prototype.start = function () {
        this._win = window;
        this._opener = this._win.opener;
        this._href = this._win.location.href;
        this._handle = function (event) {
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._win.close();
        }.bind(this);
        this._bindEvent();
        this._postMessage();
    };

    /**
     * Post message to origin page to refresh page
     *
     */
    LoginDone.prototype._postMessage = function () {
        var url;
        var self = this;
        var params = this._href.split('?');
        this._timer = setTimeout(function () {
            var close = document.querySelector('#closeWin');
            if (self._win && self._win.removeEventListener) {
                self._win.removeEventListener('message', this._handle);
            }
            close.classList.remove('error-section');
        }, self._timeout);

        if (params && params.length > 1) {
            var queryArr = params[1].split('&');
            for (var i = 0; i < queryArr.length; i++) {
                var item = queryArr[i].split('=');
                if (item && item.length > 1 && item[0] === 'url') {
                    url = item[1];
                    break;
                }
            }
        }
        if (!url) {
            return;
        }
        if (!self._opener || this._win.opener === this._win) {
            this._win.location.replace(decodeURIComponent(url));
        } else {
            var originUrl = decodeURIComponent(url);
            var ele = document.createElement('a');
            ele.href = originUrl;
            var domain = ele.protocol + '//' + ele.host;
            if (!domain) {
                return;
            }
            self._opener.postMessage({
                type: 'refresh'
            }, domain);
        }
    };

    /**
     * Bind event
     *
     */
    LoginDone.prototype._bindEvent = function () {
        var self = this;
        var closeBtn = document.querySelector('#closeButton');
        if (self._win.addEventListener) {
            if (self._win) {
                self._win.addEventListener('message', this._handle);
            }
            closeBtn.addEventListener('click', self._handle);
        }
    };

    return new LoginDone().start();
});
