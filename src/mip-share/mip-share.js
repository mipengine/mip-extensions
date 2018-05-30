/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    var Share = require('./share');

    // 百度获取微信动态签名的默认接口
    var BAIDUAPI = '//po.baidu.com/api/wechat/token.jsonp?app_id=wxadc1a0c6b9096e89';

    /**
     * build
     */
    customElement.prototype.build = function () {
        var element = this.element;

        new Share({
            title: element.getAttribute('title') || document.title,
            url: element.getAttribute('url') || location.href,
            content: element.getAttribute('content') || '',
            iconUrl: element.getAttribute('icon') || '',
            wechatAPI: element.getAttribute('wechatAPI') || BAIDUAPI
        }, $(element));

        var elem = $(element).children().not('mip-i-space')[0];

        this.applyFillContent(elem);

    };

    return customElement;

});

