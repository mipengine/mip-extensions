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
     * @param {HTMLElement} node html element
     * @param {Object} data value
     * @param {string} dir directive
     * @param {string} exp expression
     * @param {Function} cb callback
     */
    var Watcher = function (node, data, dir, exp, cb) {
        this._data = data;
        this._dir = dir;
        this._exp = exp;
        this._node = node;
        this._depIds = {};
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
        return new Function((''
            + 'with(this){'
            +   'try {'
            +       'return ' + exp
            +   '} catch (e) {'
            +   '}'
            + '}'
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

    /**
     * Add watcher to deps, if watcher existed, ignore it
     *
     * @param {Object} dep Dep module
     */
    Watcher.prototype.addWatcher = function (dep) {
        if (!this._depIds.hasOwnProperty(dep.id)) {
            dep.subs.push(this);
            this._depIds[dep.id] = dep;
        }
    };

    return Watcher;
});
