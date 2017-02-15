/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * firstInviewCallback
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var node = element.parentNode;

        var parent = document.createElement('a');
        parent.href = element.getAttribute('href');
        util.css(parent, {
            margin: 0,
            padding: 0
        });
        node.replaceChild(parent, element);
        parent.appendChild(element);

    };

    return customElement;

});

