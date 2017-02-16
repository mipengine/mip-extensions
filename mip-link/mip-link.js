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
    
    function getPaddingOrMargin (elem, style) {
        var res = document && document.defaultView
         && document.defaultView.getComputedStyle(elem, null)
         && document.defaultView.getComputedStyle(elem, null)[style];

         return res ? res : '0px';
    }

    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var node = element.parentNode;
        var classVal = element.getAttribute('class');

        var parent = document.createElement('a');
        parent.href = element.getAttribute('href');
        parent.classList += classVal.replace('mip-element', '');
        
        element.setAttribute('class', 'mip-element');
        node.replaceChild(parent, element);
        parent.appendChild(element);

        // padding 和 margin 设置，优先考虑 mip-link 的样式设置

        var elementPadding = getPaddingOrMargin(element, 'padding');
        var elementMargin = getPaddingOrMargin(element, 'margin');
        var parentPadding = getPaddingOrMargin(parent, 'padding');
        var parengMargin = getPaddingOrMargin(parent, 'margin');

        var paddingValue = elementPadding !== '0px' ? 0 : parentPadding;
        var marginValue = elementMargin !== '0px' ? 0 : parengMargin;
        
        util.css(parent, {
            margin: marginValue,
            padding: paddingValue
        });
    };

    return customElement;

});

