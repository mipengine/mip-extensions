/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 13:01
 * @file: mip-fh-sex.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var customElem = require('customElement').create();
    var extra = require('./bus-extra');
    var setImgAd = require('./bus-set-img-ad');

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // 随机关注人数
        extra.follow();

        // 导航返回判断
        extra.back();

        // 显示隐藏主菜单
        extra.nav();

        // 设置文章内容图片后面的网盟广告
        setImgAd.set();
    };

    return customElem;
});
