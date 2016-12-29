/**
 * @file 第三方广告组件
 *
 * @author lixkoo
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'http://static.yxdown.com/m/gg/float_tl.js';
        node.async = 'true';
        var tanxh = document.getElementsByTagName('head')[0];
        if (tanxh) {
            tanxh.insertBefore(node, tanxh.firstChild);
        }
    };

    return customElement;
});
