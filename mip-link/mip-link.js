/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * [is_noCache 判断是否禁止缓存]
     *
     * @return {boolean}
     */
    function isNoCache() {
        var cacheMeta = document.querySelector('meta[property="mip:use_cache"]');
        if (cacheMeta && cacheMeta.getAttribute('content') === 'no') {
            return true;
        }
        return false;

    }

    function getCSSStyle(elem, style) {
        var res = document && document.defaultView
         && document.defaultView.getComputedStyle(elem, null)
         && document.defaultView.getComputedStyle(elem, null)[style];

        return res ? res : null;
    }


    /**
     * firstInviewCallback
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        element.setAttribute('pageType', isNoCache() ? 2 : 1);

        var elementDisplay = getCSSStyle(element, 'display');
        var elementColor = getCSSStyle(element, 'color');

        var tagA = document.createElement('a');
        tagA.href = element.getAttribute('href');
        if (element.children.length) {
            for (var index = 0; index < element.children.length; index++) {
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
            color: elementColor
        });

        util.css(element, {
            display: elementDisplay,
            color: elementColor
        });

    };

    return customElement;

});
