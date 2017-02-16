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

        var elementPadding = getPaddingOrMargin(element, 'padding');
        var elementMargin = getPaddingOrMargin(element, 'margin');
        var classVal = element.getAttribute('class');

        var parent = document.createElement('a');
        parent.href = element.getAttribute('href');
        parent.classList += classVal.replace('mip-element', '');
        
        element.setAttribute('class', 'mip-element');
        node.replaceChild(parent, element);
        parent.appendChild(element);

        util.css(parent, {
            margin: elementMargin,
            padding: elementPadding
        });

        util.css(element, {
            margin: 0,
            padding: 0
        });
    };

    return customElement;

});

