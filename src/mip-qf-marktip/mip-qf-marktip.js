/**
 * @file mip-qf-marktip 组件
 * @author W-peach
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var iosTip = component.querySelector('.ios-tip');
        var androidTip = component.querySelector('.android-tip');
        var iosImg = iosTip.getAttribute('tip-ios-img'); // 获取ios提示图片
        var androidImg = androidTip.getAttribute('tip-android-img'); // 获取android提示图片
        var flag = 1;

        window.addEventListener('touchstart', function () {
            if (flag === 1) {
                tip();
                flag = 0;
            }
        });


        /** 提示框逻辑 **/
        function tip() {
            if (util.platform.isIos()) {
                iosTip.style.backgroundImage = 'url(' + iosImg + ')';
                iosTip.classList.add('visible');
            } else {
                androidTip.style.backgroundImage = 'url(' + androidImg + ')';
                androidTip.classList.add('visible');
            }
            $('.ios-tip').delay(3000).fadeOut();
            $('.android-tip').delay(3000).fadeOut();
        }
    };

    return customElement;
});
