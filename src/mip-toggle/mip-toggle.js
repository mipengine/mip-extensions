/**
 * @file
 * @author oott123 <git@public.oott123.com>
 */

define(function (require) {
    var Toggle = require('customElement').create();
    var css = require('util').css;

    Toggle.prototype.build = function () {
        var element = this.element;
        this._hideTimeout = parseTimeout(element.getAttribute('hidetimeout'));
        this._display = element.getAttribute('display') || 'block';
        this._enterClass = element.getAttribute('enterclass');
        if (this._display !== 'block') {
            element.style.display = this._display;
        }

        var self = this;
        this.addEventAction('toggle', function (event) {
            self.toggle();
            event.preventDefault();
        });
        this.addEventAction('show', function (event, timeout) {
            self.show(timeout);
            event.preventDefault();
        });
        this.addEventAction('hide', function (event) {
            self.hide();
            event.preventDefault();
        });
    };

    Toggle.prototype.detachedCallback = function () {
        this._clearTimeout();
    };

    Toggle.prototype._clearTimeout = function () {
        clearTimeout(this._timeoutId);
    };

    Toggle.prototype._setHideTimeout = function (timeout) {
        if (timeout === Infinity) {
            return;
        }

        this._clearTimeout();
        var self = this;
        this._timeoutId = setTimeout(function () {
            self.hide();
        }, timeout);
    };

    Toggle.prototype.show = function (timeout) {
        // set timeout to default value if none given
        if (timeout === undefined || timeout === '') {
            timeout = this._hideTimeout;
        }
        else {
            timeout = parseTimeout(timeout);
        }
        if (this._enterClass) {
            this.element.classList.add(this._enterClass);
        }
        else {
            this.element.style.display = this._display;
        }
        this._setHideTimeout(timeout);
    };

    Toggle.prototype.hide = function () {
        if (this._enterClass) {
            this.element.classList.remove(this._enterClass);
        }
        else {
            this.element.style.display = 'none';
        }
    };

    Toggle.prototype.toggle = function () {
        if (this._isHidden()) {
            this.show(Infinity);
        }
        else {
            this.hide();
        }
    };

    Toggle.prototype._isHidden = function () {
        if (this._enterClass) {
            return !this.element.classList.contains(this._enterClass);
        }

        return this.element.style.display === 'none' || css(this.element, 'style') === 'none';
    };

    function parseTimeout(timeout) {
        if (timeout === 'Infinity') {
            timeout = Infinity;
        }
        else {
            timeout = parseInt(timeout, 10);
            if (isNaN(timeout)) {
                timeout = Infinity;
            }
        }
        return timeout;
    }
    return Toggle;
});
