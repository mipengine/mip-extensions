/**
 * @file mip-qf-historyback 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var href = component.getAttribute('data-href');

        component.addEventListener('click', function () {
            if (window.history.length !== 0) {
                util.platform.isIos() ? window.location.href = document.referrer : window.history.go(-1);
                return false;
            }

            window.location.href = href;
        });
    };

    return customElement;
});
