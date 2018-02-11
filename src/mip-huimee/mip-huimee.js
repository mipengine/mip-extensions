/**
 * @file 第三方广告组件
 *
 * @author hoogecc
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'https://tt.huimee.net/huimee_ads.js';
        node.async = 'true';
        var parent = document.getElementsByTagName('head')[0];
        if (parent) {
            parent.insertBefore(node, parent.firstChild);
        }
    };

    return customElement;
});
