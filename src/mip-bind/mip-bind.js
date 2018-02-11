/**
 * @file mip-bind extension
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Compile = require('./mip-compile');
    var viewer = require('viewer');
    var util = require('util');
    var fn = util.fn;
    var Observer = require('./mip-observer');


    /**
     * Bind Class
     *
     * @class
     */
    var Bind = function () {
        var me = this;
        this._win = window;
        // require mip data extension runtime
        this._compile = new Compile();
        this._observer = new Observer();
        this._bindEvent();
        // from=0 called by html attributes
        // from=1 refers the method called by mip.js
        MIP.setData = function (action, from) {
            me._bindTarget(false, action, from);
        };
        MIP.$set = function (action, from) {
            me._bindTarget(true, action, from);
        }
    };

    /**
     * Bind target
     *
     */
    Bind.prototype._bindTarget = function (compile, action, from) {
        var data = from ? action.arg : action;
        var evt = from ? action.event.target: {};
        if (typeof data === 'string') {
            data = (new Function('DOM', 'return ' + data))(evt);
        }
        if (typeof data === 'object') {
            fn.extend(window.m, data);
            if (compile) {
                this._observer.start(this._win.m);
                this._compile.start(this._win.m);
            }
        }
        else {
            console.error('setData method must accept an object!');
        }
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
                MIP.$set(event.data.m);
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
        MIP.$set(this._dataSource.m);
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
