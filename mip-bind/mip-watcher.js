/**
 * @file mip-bind watcher module
 * @author
 */

define(function (require) {

    /**
     * Watcher Class
     *
     * @class
     * @param {Object} data value
     * @param {string} dir directive
     * @param {string} exp expression
     * @param {Function} cb callback
     */
    var Watcher = function (data, dir, exp, cb) {
        this._data = data;
        this._dir = dir;
        if (typeof exp === 'function') {
            this._getter = exp;
        }
        else {
            this._getter = this._parseGetter(exp);
        }
        this._cb = cb;
        this._value = this._get();
    };

    /**
     * Parse get function
     *
     * @param {string} exp expression
     * @return {string} data value
     */
    Watcher.prototype._parseGetter = function (exp) {
        if (/[^\w.$]/.test(exp)) {
            return;
        }
        return function (data) {
            var exps = exp.split('.');
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!data) {
                    return;
                }
                data = data[exps[i]];
            }
            return data;
        };
    };

    /**
     * Watcher module entry function
     *
     * @param {Object} value the value of single data
     */
    Watcher.prototype.update = function () {
        var newVal = this._get();
        var oldVal = this._value;
        if (newVal !== oldVal) {
            this._value = newVal;
            this._cb.call(this._data, this._dir, newVal, oldVal);
        }
    };

    /**
     * Get value
     *
     * @return {string} data value
     */
    Watcher.prototype._get = function () {
        return this._getter.call(this._data, this._data);
    };

    return Watcher;
});
