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
        this.data = data;
        this.dir = dir;
        this.exp = exp;
        if (typeof exp === 'function') {
            this.getter = exp;
        }
        else {
            this.getter = this.parseGetter(exp);
        }
        this.cb = cb;
        this.value = this.get();
    };

    /**
     * Parse get function
     *
     * @param {string} exp expression
     * @return {string} data value
     */
    Watcher.prototype.parseGetter = function (exp) {
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
        var newVal = this.get();
        var oldVal = this.value;
        if (newVal !== oldVal) {
            this.value = newVal;
            this.cb.call(this.data, this.dir, newVal, oldVal);
        }
    };

    /**
     * Get value
     *
     * @return {string} data value
     */
    Watcher.prototype.get = function () {
        return this.getter.call(this.data, this.data);
    };

    return Watcher;
});
