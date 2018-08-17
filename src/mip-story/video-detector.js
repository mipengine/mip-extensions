/**
 * @file detector.js 检测是否使用video原生播放
 * @author venyxiong
 */

define(function (require) {
    'use strict';

    var UA = navigator.userAgent.toLowerCase();
    var badUaList = ['baiduboxapp'];

    function isIPhone() {
        return UA.indexOf('iphone') > -1;
    }

    function isBadUA() {
        var badUA = 0;
        badUaList.forEach(function (val) {
            if (UA.indexOf(val) > -1) {
                badUA = 1;
            }
        });
        return badUA;
    }

    function isRenderVideoElement() {
        return isIPhone() && isBadUA();
    }
    return {
        isRenderVideoElement: isRenderVideoElement
    };
});
