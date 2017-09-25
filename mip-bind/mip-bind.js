/**
 * @file mip-bind extension
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Compile = require('./mip-compile');
    var Observer = require('./mip-observer');

    /**
     * Bind Class
     *
     * @class
     */
    var Bind = function () {
    };

    /**
     * Start mip bind
     *
     */
    Bind.prototype.start = function () {
        // require mip data extension runtime
        require('./mip-data');
        this._dataSource = {
            m: window.m ? window.m : {}
        }
        // require mip data extension runtime
        this._compile = new Compile();
        // Dom compile
        this._compile.start(this._dataSource.m);
    };

    /**
     * Traversal data and proxy it on window varible m
     *
     */
    Bind.prototype._proxy = function () {
        var me = this;
        Object.keys(this._dataSource).forEach(function (key) {
            me._proxyData(key);
        });
    };

    /**
     * Proxy data via varible m
     *
     * @param {string} key the key of the data
     */
    Bind.prototype._proxyData = function (key) {
        var me = this;
        Object.defineProperty(this._win, key, {
            configurable: false,
            enumerable: true,
            get: function () {
                return me._dataSource[key];
            },
            set: function (newVal) {
                me._dataSource[key] = newVal;
            }
        });
    };

    return new Bind().start();
});
