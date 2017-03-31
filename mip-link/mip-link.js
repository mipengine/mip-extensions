/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var util = require('util');

    function getCSSStyle (elem, style) {
        var res = document && document.defaultView
         && document.defaultView.getComputedStyle(elem, null)
         && document.defaultView.getComputedStyle(elem, null)[style];

         return res ? res : '0px';
    }

    function getChildNodes(newNode, oldNode) {
        for (var index = 0; index < oldNode.childNodes.length; index ++) {
            console.log(index);
            console.log(oldNode.childNodes[index]);
            newNode.appendChild(oldNode.childNodes[index]);
        }

        return newNode;
    }

    /**
     * build
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var parentNode = element.parentNode;

        var elementPadding = getCSSStyle(element, 'padding');
        var elementMargin = getCSSStyle(element, 'margin');
        var elementDisplay = getCSSStyle(element, 'display');
        var elementColor = getCSSStyle(element, 'color');
        var elementLineHeight = getCSSStyle(element, 'line-height');

        var classVal = element.getAttribute('class');

        var tagA = document.createElement('a');
        tagA.href = element.getAttribute('href');
        if (element.children.length) {
            for (var index = 0; index < element.children.length; index ++) {
                tagA.appendChild(element.children[index]);
            }
        }
        else {
            tagA.innerText = element.innerText;
        }

        element.innerText = '';
        element.appendChild(tagA);

        util.css(tagA, {
            margin: 0,
            padding: 0,
            display: elementDisplay,
            color: elementColor,
        });

        util.css(element, {
            display: elementDisplay,
            color: elementColor
        });

    }

    return customElement;

});
