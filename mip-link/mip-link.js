/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');

    var STYLE = [
        'display',
        'font-size',
        'color'
    ];

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
     * build
     *
     */
    customElement.prototype.build = function () {
        var element = this.element;
        element.setAttribute('pageType', isNoCache() ? 2 : 1);

        var tagA = document.createElement('a');
        tagA.href = element.getAttribute('href');
        tagA.setAttribute('mip-link','');

        // 迁移子节点
        var nodes = [];
        var CHILDRENS = element.childNodes;
        for (var index = 0; index < CHILDRENS.length; index++) {
            nodes.push(CHILDRENS[index]);
        }
        element.appendChild(tagA);

        for (index = 0; index < nodes.length; index++) {
            tagA.appendChild(nodes[index]);
        }
        element.appendChild(tagA);

        util.css(tagA, {
            margin: 0,
            padding: 0,
            width: '100%'
        });

        for (var index = 0; index < STYLE.length; index++) {
            var key = STYLE[index];
            var val = getCSSStyle(element, STYLE[index]);
            if (val && val !== '0px') {
                util.css(tagA, key, val);
                util.css(element, key, val);
            }
        }
    };

    return customElement;

});
