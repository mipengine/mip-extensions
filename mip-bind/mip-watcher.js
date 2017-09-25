/**
 * @file mip-bind watcher module
 * @author
 */

define(function (require) {

    var Deps = require('./mip-deps');

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
            var fn = this.getWithResult.bind(this, exp);
            this._getter = fn.call(this._data);
        }
        this._cb = cb;
        this._value = this._get();
    };

    /**
     * Simplified variable writing, such as m.name.firstName, we can write as name.firstName
     *
     * @param {string} exp value of directive
     * @return {string} anonymous funtion which change runtime scope and return expression
     */
    Watcher.prototype.getWithResult = function (exp) {
        return new Function((""
            + "with(this){"
            +   "try {"
            +       "debugger;return " + exp
            +   "} catch (e) {"
            +       "console.error(e)"
            +   "}"
            + "}"
        ));
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
        var value;
        Deps.target = this;
        if (this._getter) {
            value = this._getter.call(this._data, this._data);
        }
        Deps.target = null;
        return value;
    };

    Watcher.prototype.addWatcher = function (dep) {
        dep.subs.push(this);
    }

    return Watcher;
});
