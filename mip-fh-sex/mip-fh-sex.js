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
    var wechat = require('./sex-wechat-copy');
    var extra = require('./sex-extra');
    var setImgAd = require('./sex-set-img-ad');

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // 微信公众号的复制
        wechat.copy('#yunying_block .targetCopy');

        // 导航返回判断
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
