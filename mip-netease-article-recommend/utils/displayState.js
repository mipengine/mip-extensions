/**
 * @file displayState.js
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function () {
    // 如果当天关闭，则一天之内不再显示
    var key = '__mip_footer_last_show';
    var hideTime = 3600 * 24;
    var timestamp = function () {
        return (new Date()).getTime();
    };

    function shouldRenderFooter() {
        var lastShowTime = 0;
        try {
            lastShowTime = localStorage.getItem(key) || 0;
        } catch (e) {}
        if (lastShowTime === 0 || timestamp() - lastShowTime < hideTime) {
            return true;
        }
        return false;
    }

    function setLastCloseTime() {
        try {
            localStorage.setItem(key, timestamp());
        } catch (e) {}
    }

    return {
        shouldRenderFooter: shouldRenderFooter,
        setLastCloseTime: setLastCloseTime
    };
});
