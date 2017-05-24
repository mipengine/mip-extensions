/**
 * @file 检测webp格式支持
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function () {
    var flag;
    try {
        var canvas = document.createElement('canvas');
        flag = canvas.toDataURL('image/webp').substring(5, 15) === 'image/webp';
    } catch (e) {
        flag = false;
    }
    return flag;
});
