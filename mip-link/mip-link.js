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
        var classVal = element.getAttribute('class');

        var parent = document.createElement('a');
        parent.href = element.getAttribute('href');
        parent.classList += classVal;
        
        element.removeAttribute('class');
        node.replaceChild(parent, element);
        parent.appendChild(element);

        // padding 和 margin 设置，优先考虑 mip-link 的样式设置

        var elementPadding = document.defaultView.getComputedStyle(element, null)['padding'];
        var elementMargin = document.defaultView.getComputedStyle(element, null)['margin'];
        var parentPadding = document.defaultView.getComputedStyle(parent, null)['padding'] || 0;
        var parengMargin = document.defaultView.getComputedStyle(parent, null)['margin'] || 0;

        var paddingValue = elementPadding !== '0px' ? 0 : parentPadding;
        var marginValue = elementMargin !== '0px' ? 0 : parengMargin;
        
        util.css(parent, {
            margin: marginValue,
            padding: paddingValue
        });
    };

    return customElement;

});

