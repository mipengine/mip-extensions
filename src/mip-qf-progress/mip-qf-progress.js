/**
 * @file mip-qf-progress 组件
 * @author W_peach
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var percent = component.getAttribute('data-per') ? component.getAttribute('data-per') : '80%';

        component.innerHTML = '<div class="u-progress-bar"></div>';

        var progress = component.querySelector('.u-progress-bar');

        progress.style.width = percent;
    };

    return customElement;
});
