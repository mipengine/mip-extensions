/**
 * @file resizeImg.js
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var supportWebp = require('./webpSupport');
    var ext = supportWebp ? 'webp' : 'jpg';

    /**
     * 相册接口/NOS接口裁图
     *
     * @param {string} src 原始图片url
     * @param {Object} options 裁图选项
     * @return {string} 裁切后图片地址
     */
    return function (src, options) {
        if (options === undefined) {
            options = {};
        }
        var width = options.width || 220;
        var height = options.height || 165;
        var quality = options.quality || 85;
        var enlarge = options.enlarge || true;
        var resizedImgSrc;

        if (src.indexOf('nosdn.127.net/') !== -1) {
            resizedImgSrc = 'http://imgsize.ph.126.net/?imgurl=' + src + '_' + width + 'x' + height + 'x1x' + quality + '.jpg' + (enlarge ? '&enlarge=true' : '');
        } else {
            resizedImgSrc = src.replace(/\?imageView.*/, '');
            resizedImgSrc = resizedImgSrc + '?imageView&thumbnail=' + width + 'y' + height + '&quality=' + quality + '&type=' + ext + '&interlace=1' + (enlarge ? '&enlarge=1' : '');
        }
        return resizedImgSrc;
    };
});
