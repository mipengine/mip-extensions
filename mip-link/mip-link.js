/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {

    var customElement = require('customElement').create();


    /**
     * build
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var node = element.parentNode;

        var parent = document.createElement('a');
        parent.href = element.getAttribute('href');
        node.replaceChild(parent, element);
        parent.appendChild(element);

    };

    return customElement;

});

