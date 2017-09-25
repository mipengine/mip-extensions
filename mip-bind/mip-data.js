/**
 * @file mip-bind Handle data
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var Observer = require('./mip-observer');
    var Deps = require('./mip-deps');

    /**
     * Build Constructor
     *
     */
    customElement.prototype.build = function () {
        var src = this.element.getAttribute('src');
        var ele = this.element.querySelector('script[type="application/json"]');
        if (src) {
            this._getData(src);
        }
        else if (ele) {
            var data = ele.textContent.toString();
            var result = this._parse(data);
            if (result) {
                this._merge(result);
            }
        }
    };

    /**
     * Bild Constructor
     *
     * @param {Object} data data value
     * @return {Object} pased data
     */
    customElement.prototype._parse = function (data) {
        var result = {};
        if (!data) {
            return result;
        }
        try {
            result = JSON.parse(data);
        }
        catch (e) {
            console.error('Json invalid and parse failed!');
        }
        return result;
    };

    /**
     * Merge data to window m
     *
     * @param {Object} data data value
     */
    customElement.prototype._merge = function (data) {
        window.m = window.m ? window.m : {};
        Object.assign(window.m, data);
        var observer = new Observer();
        observer.start(window.m);
    };

    /**
     * Get mip data via fetch
     *
     * @param {string} url fetch url
     */
    customElement.prototype._getData = function (url) {
        if (!url) {
            return;
        }
        var me = this;
        fetch(url).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    me._merge(data);
                });
            }
            else {
                console.error('Fetch rquest failed!');
            }
        }).catch(function (e) {
            console.error(e);
        });
    };

    // alias mip data extension and register
    MIP.registerMipElement('mip-data', customElement);

    return customElement;
});
