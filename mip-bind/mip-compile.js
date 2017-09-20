/**
 * @file mip-bind DOM Compile funtion
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Watcher = require('./mip-watcher');
    var Deps = require('./mip-deps');

     /**
     * Compile Class
     *
     * @class
     * @param {Object} vm varible of bind module
     * @param {Object} data datasource
     */
    var Compile = function (vm, data) {
        this.vm = vm;
        this.data = data;
        this.el = document.body;
    };

    /**
     * Compile module entry function
     *
     */
    Compile.prototype.start = function () {
        this._fragment = this.cloneNode();
        this.compileElement(this._fragment);
        this.el.appendChild(this._fragment);
    };

    /**
     * Clone node to fragment
     *
     * @return {HTMLElement} cloned nodes
     */
    Compile.prototype.cloneNode = function () {
        var child;
        var fragment = document.createDocumentFragment();
        while (child = this.el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    };

    /**
     * Traversal nodes and compile node's attributes
     *
     * @param {HTMLElement} el compiled html element
     */
    Compile.prototype.compileElement = function (el) {
        var me = this;
        var nodes = el.childNodes;
        [].slice.call(nodes).forEach(function (node) {
            if (!me.isElementNode(node)) {
                return;
            }
            me.compileAttributes(node);
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    };

    /**
     * Determine whether it's directive
     *
     * @param {string} attr element's attribute
     * @return {boolean} whether result is directive
     */
    Compile.prototype.isDirective = function (attr) {
        return attr.indexOf('m-') === 0;
    };

    /**
     * Determine whether it's a html element type
     *
     * @param {Object} node data form mip data extension
     * @return {boolean} whether result is node type
     */
    Compile.prototype.isElementNode = function (node) {
        return node.nodeType === 1;
    };

    /**
     * Compile attributes and remove origin attirbutes
     *
     * @param {HTMLElement} node compiled html element
     */
    Compile.prototype.compileAttributes = function (node) {
        var me = this;
        if (!node) {
            return;
        }
        var attrs = node.attributes;
        [].slice.call(attrs).forEach(function (attr) {
            if (!me.isDirective(attr.name)) {
                return;
            }
            me.compileDirective(node, attr.name.slice(2), attr.value, function (data) {
                if (data) {
                    node.removeAttribute(attr.name);
                }
            });
        });
    };

    /**
     * Compile directive and add watcher
     *
     * @param {HTMLElement} node html element
     * @param {string} directive mip directive, such as m-*
     * @param {string} expression value of directive
     * @param {Function} cb callback in order to remove directive attributes
     */
    Compile.prototype.compileDirective = function (node, directive, expression, cb) {
        var me = this;
        var fnName = directive;
        if (/^bind:/.test(directive)) {
            fnName = 'bind';
        }
        var data = me.getVMVal(expression);
        data && cb && cb(data);
        me[fnName] && me[fnName](node, directive, data);
        var watcher = new Watcher(me.data, directive, expression, function (dir, newVal, oldVal) {
            me[fnName] && me[fnName](node, dir, newVal);
        });
        Deps.addWatcher(expression, watcher);
    };

    /**
     * Handle m-text directive
     *
     * @param {HTMLElement} node html element
     * @param {string} directive mip directive
     * @param {string} newVal new value
     */
    Compile.prototype.text = function (node, directive, newVal) {
        node.textContent = newVal;
    };

    /**
     * Handle m-bind directive
     *
     * @param {HTMLElement} node html element
     * @param {string} directive mip directive
     * @param {string} newVal new value
     */
    Compile.prototype.bind = function (node, directive, newVal) {
        var reg = /bind:(.*)/;
        var result = reg.exec(directive);
        if (result && result[1]) {
            node.setAttribute(result[1], newVal);
        }
    };

    /**
     * Handle expression value
     *
     * @param {string} exp value of directive
     * @return {string} data value
     */
    Compile.prototype.getVMVal = function (exp) {
        var val = this.data;
        exp = exp.split('.');
        exp.forEach(function (k) {
            val = val[k];
        });
        return val;
    };

    return Compile;
});
