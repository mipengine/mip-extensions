/**
 * @file
 * @author oott123 <git@public.oott123.com>
 */

define(function () {
    var Toggle = require('customElement').create();
    var css = require('util').css;
    /**
     * Build callback, which will bind events
     */
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
    /**
     * Detached callback, remove timeout
     */
    Toggle.prototype.detachedCallback = function () {
        this._clearTimeout();
    };
    /**
     * Clear all timeout
     */
    Toggle.prototype._clearTimeout = function () {
        clearTimeout(this._timeoutId);
    };
    /**
     * Set element hide timeout
     * 
     * @param {Number} timeout timeout miliseconds
     */
    Toggle.prototype._setHideTimeout = function (timeout) {
        if (timeout === Infinity) {
            return;
        }
        this._clearTimeout();
        this._timeoutId = setTimeout((function () {
            this.hide();
        }).bind(this), timeout);
    };
    /**
     * Show the element; hide it after {timeout}
     * 
     * @param {Number} timeout hidden timeout miliseconds
     */
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
    /**
     * Hide the element
     */
    Toggle.prototype.hide = function () {
        if (this._enterClass) {
            this.element.classList.remove(this._enterClass);
        }
        else {
            this.element.style.display = 'none';
        }
    };
    /**
     * Toggle show or hide of the element
     */
    Toggle.prototype.toggle = function () {
        if (this._isHidden()) {
            this.show(Infinity);
        }
        else {
            this.hide();
        }
    };
    /**
     * Determine if the element is hidden
     */
    Toggle.prototype._isHidden = function() {
        if (this._enterClass) {
            return !this.element.classList.contains(this._enterClass);
        }
        return this.element.style.display === 'none'
            || css(this.element, 'style') === 'none';
    };
    /**
     * Parse timeout string to Number
     *
     * @param {String} timeout 
     */
    function parseTimeout(timeout) {
        if (timeout === 'Infinity') {
            timeout = Infinity;
        }
        else {
            timeout = parseInt(timeout);
            if (isNaN(timeout)) {
                timeout = Infinity;
            }
        }
        return timeout;
    }
    return Toggle;
});
