/**
 * @file mip-bind watcher module
 * @author
 */

define(function (require) {

    /**
     * Watcher Class
     *
     * @class
     * @param {Object} vm 'this' variable belong to mip bind module
     * @param {string} dir directive
     * @param {string} exp expression
     * @param {Function} cb callback
     */
    var Watcher = function (vm, dir, exp, cb) {
        this.vm = vm;
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
        return function (vm) {
            var exps = exp.split('.');
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!vm) {
                    return;
                }
                vm = vm[exps[i]];
            }
            return vm;
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
            this.cb.call(this.vm, this.dir, newVal, oldVal);
        }
    };

    /**
     * Get value
     *
     * @return {string} data value
     */
    Watcher.prototype.get = function () {
        return this.getter.call(this.vm, this.vm);
    };

    return Watcher;
});
