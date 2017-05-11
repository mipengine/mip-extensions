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
     * start handle login done event
     *
     */
    LoginDone.prototype.start = function () {
        var self = this;
        self._win = window;
        self._opener = self._win.opener;
        self._href = self._win.location.href;
        self._handle = function (event) {
            self._win.close();
        };
        self._bindEvent();
        self._postMessage();
    };

    /**
     * post message to origin page if login success
     *
     */
    LoginDone.prototype._postMessage = function () {
        var url;
        var self = this;
        var params = self._href.split('?');
        setTimeout(function () {
            var close = document.querySelector('#closeWin');
            if (self._win && self._win.removeEventListener) {
                self._win.removeEventListener('message', self._handle);
            }
            close.classList.remove('error-section');
        }, self._timeout);

        if (!params || params.length <= 1) {
            return;
        }
        var queryArr = params[1].split('&');
        for (var i = 0; i < queryArr.length; i++) {
            var item = queryArr[i].split('=');
            if (item && item.length > 1 && item[0] === 'url') {
                url = item[1];
                break;
            }
        }

        if (!url) {
            return;
        }
        var ele = document.createElement('a');
        ele.href = decodeURIComponent(url);
        var domain = !ele.search ? ele.href
                    : ele.href.substr(0, ele.href.indexOf(ele.search));
        if (domain) {
            self._opener.postMessage({
                type: 'refresh'
            }, domain);
        }
    };

    /**
     * bind event and handle
     *
     */
    LoginDone.prototype._bindEvent = function () {
        var self = this;
        var closeBtn = document.querySelector('#closeButton');
        if (self._win.addEventListener) {
            if (self._win) {
                self._win.addEventListener('message', self._handle);
            }
            closeBtn.addEventListener('click', self._handle);
        }
    };

    return new LoginDone().start();
});
