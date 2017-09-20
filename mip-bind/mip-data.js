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
            this.getData(src);
        }
        else if (ele) {
            var data = ele.textContent.toString();
            var result = this.parse(data);
            if (result) {
                this.merge(result);
            }
        }
    };

    /**
     * Bild Constructor
     *
     * @param {Object} data data value
     * @return {Object} pased data
     */
    customElement.prototype.parse = function (data) {
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
     * Merge data to window vm
     *
     * @param {Object} data data value
     */
    customElement.prototype.merge = function (data) {
        Object.assign(window.vm, data);
        var observer = new Observer();
        observer.start(window.vm);
        Deps.notify();
    };

    /**
     * Get mip data via fetch
     *
     * @param {string} url fetch url
     */
    customElement.prototype.getData = function (url) {
        if (!url) {
            return;
        }
        var me = this;
        fetch(url).then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    me.merge(data);
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
