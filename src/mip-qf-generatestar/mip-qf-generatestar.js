/**
 * @file mip-qf-generatestar 组件
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
        var dataStar = component.getAttribute('data-star') ? component.getAttribute('data-star') : 8;
        var starNum = parseInt(dataStar / 2, 10); // 亮色星星数量
        var noStar; // 灰色星星数量
        var html = ''; // 星星模版

        noStar = 5 - starNum;

        for (var i = 0; i < starNum; i++) {
            html += '<i class="icon icon-star-y"></i>';
        }

        for (var i = 0; i < noStar; i++) {
            html += '<i class="icon icon-star-g"></i>';
        }

        component.innerHTML = html;
    };

    return customElement;
});
