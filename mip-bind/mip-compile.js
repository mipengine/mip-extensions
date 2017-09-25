/**
 * @file mip-bind DOM Compile funtion
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Watcher = require('./mip-watcher');
    var Deps = require('./mip-deps');
    var Observer = require('./mip-observer');

     /**
     * Compile Class
     *
     * @class
     */
    var Compile = function () {
        this._el = document.body;
    };

    /**
     * Compile module entry function
     *
     * @param {Object} data datasource
     */
    Compile.prototype.start = function (data) {
        this.data = data;
        this._fragment = this._cloneNode();
        this._compileElement(this._fragment);
        this._el.appendChild(this._fragment);
    };

    /**
     * Clone node to fragment
     *
     * @return {HTMLElement} cloned nodes
     */
    Compile.prototype._cloneNode = function () {
        var child;
        var fragment = document.createDocumentFragment();
        while (child = this._el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    };

    /**
     * Traversal nodes and compile node's attributes
     *
     * @param {HTMLElement} el compiled html element
     */
    Compile.prototype._compileElement = function (el) {
        var me = this;
        var nodes = el.childNodes;
        [].slice.call(nodes).forEach(function (node) {
            if (!me._isElementNode(node)) {
                return;
            }
            me._compileAttributes(node);
            if (node.childNodes && node.childNodes.length) {
                me._compileElement(node);
            }
        });
    };

    /**
     * Determine whether it's directive
     *
     * @param {string} attr element's attribute
     * @return {boolean} whether result is directive
     */
    Compile.prototype._isDirective = function (attr) {
        return attr.indexOf('m-') === 0;
    };

    /**
     * Determine whether it's a html element type
     *
     * @param {Object} node data form mip data extension
     * @return {boolean} whether result is node type
     */
    Compile.prototype._isElementNode = function (node) {
        return node.nodeType === 1;
    };

    /**
     * Compile attributes and remove origin attirbutes
     *
     * @param {HTMLElement} node compiled html element
     */
    Compile.prototype._compileAttributes = function (node) {
        var me = this;
        if (!node) {
            return;
        }
        var attrs = node.attributes;
        [].slice.call(attrs).forEach(function (attr) {
            if (!me._isDirective(attr.name)) {
                return;
            }
            me._compileDirective(node, attr.name.slice(2), attr.value, function () {
                node.removeAttribute(attr.name);
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
    Compile.prototype._compileDirective = function (node, directive, expression, cb) {
        var me = this;
        var fnName = directive;
        if (/^bind:/.test(directive)) {
            fnName = 'bind';
        }
        var data = me._getMVal(expression);
        me[fnName] && me[fnName](node, directive, data);
        var watcher = new Watcher(me.data, directive, expression, function (dir, newVal, oldVal) {
            cb && cb();
            me[fnName] && me[fnName](node, dir, newVal);
        });
    };

    /**
     * Handle m-text directive
     *
     * @param {HTMLElement} node html element
     * @param {string} directive mip directive
     * @param {string} newVal new value
     */
    Compile.prototype.text = function (node, directive, newVal) {
        node.textContent = newVal ? newVal : '';
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
    Compile.prototype._getMVal = function (exp) {
        if (!exp) {
            return;
        }
        var fn = this.getWithResult(exp);
        return fn.call(this.data);
    };

    /**
     * Simplified variable writing, such as m.name.firstName, we can write as name.firstName
     *
     * @param {string} exp value of directive
     * @return {string} anonymous funtion which change runtime scope and return expression
     */
    Compile.prototype.getWithResult = function (exp) {
        return new Function((""
            + "with(this){"
            +   "try {"
            +       "return " + exp
            +   "} catch (e) {"
            +       "console.error(e)"
            +   "}"
            + "}"
        ));
    }

    /**
     * Parse array and get value
     *
     * @param {Object} value
     */
    Compile.prototype._dependArray = function (value) {
        for (var e, i = 0; i < value.length; i++) {
            e = value[i];
            e && e.__ob__ && e.__ob__.dep.depend();
            if (Array.isArray(e)) {
                dependArray(e);
            }
        }
    }

    return Compile;
});
