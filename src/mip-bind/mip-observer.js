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
    Observer.prototype._walk = function (data) {
        if (!data || typeof data !== 'object') {
            return;
        }

        var me = this;
        Object.keys(data).forEach(function (key) {
            me._define(data, key, data[key]);
        });
    };

    /**
     * Define data getter, setter
     *
     * @param {Object} data data value
     * @param {Object} key the key of single data
     * @param {Object} value the value of single data
     */
    Observer.prototype._define = function (data, key, value) {
        // if value has observed, stop it
        if (value.__ob__) {
            return;
        }

        // if value is object, define it's value
        var me = this;
        if (value && typeof value === 'object') {
            this.start(value);
        }

        var property = Object.getOwnPropertyDescriptor(data, key);
        if (property && property.configurable === false) {
            return;
        }
        var getter = property && property.get;
        var setter = property && property.set;

        var deps = new Deps();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                value = getter ? getter.call(data) : value;
                if (Deps.target) {
                    deps.addWatcher();
                }
                return value;
            },
            set: function (newVal) {
                value = getter ? getter.call(data) : value;
                if (newVal === value) {
                    return;
                }
                value = newVal;
                if (setter) {
                    setter.call(data, newVal);
                }
                else {
                    me._walk(newVal);
                    deps.notify();
                }
            }
        });
        value.__ob__ = this;
    };

    /**
     * Observer module entry function
     *
     * @param {Object} data the value of data
     */
    Observer.prototype.start = function (data) {
        this._walk(data);
    };

    return Observer;
});
