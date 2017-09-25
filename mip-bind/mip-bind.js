/**
 * @file mip-bind extension
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Compile = require('./mip-compile');

    /**
     * Bind Class
     *
     * @class
     */
    var Bind = function () {
        this._win = window;
        this._bindEvent();
    };

    /**
     * Bind event for post message when fetch data returned, then compile dom again
     *
     */
    Bind.prototype._bindEvent = function () {
        var me = this;
        window.addEventListener('message', function (event) {
            var loc = me._win.location;
            var domain = loc.protocol + '//' + loc.host;
            if (event.origin === domain
                && event.source && event.data
                && event.data.type === 'bind'
                && event.source === me._win) {
                me._compile.start(me._win.m);
            }
        });
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
        };
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
