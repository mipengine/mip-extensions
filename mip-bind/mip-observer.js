/**
 * @file mip-bind Observer Module
 * @author
 */

define(function (require) {

    var Deps = require('./mip-deps');

    /**
     * Observer Class
     *
     * @class
     */
    var Observer = function () {
    };

    /**
     * Traversal data, Let it have defineProperty function
     *
     * @param {Object} data the data of publisher
     */
    Observer.prototype.walk = function (data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        var me = this;
        Object.keys(data).forEach(function (key) {
            me.define(data, key, data[key]);
        });
    };

    /**
     * Define data getter, setter
     *
     * @param {Object} data data value
     * @param {Object} key the key of single data
     * @param {Object} value the value of single data
     */
    Observer.prototype.define = function (data, key, value) {
        var me = this;
        if (value && typeof value === 'object') {
            this.start(value);
        }
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                return value;
            },
            set: function (newVal) {
                if (newVal === value) {
                    return;
                }
                value = newVal;
                me.walk(newVal);
                Deps.notify(key);
            }
        });
    };

    /**
     * Observer module entry function
     *
     * @param {Object} data the value of data
     */
    Observer.prototype.start = function (data) {
        this.walk(data);
    };

    return Observer;
});
