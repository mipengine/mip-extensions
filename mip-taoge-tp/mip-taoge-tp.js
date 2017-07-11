/**
 * @file mip-taoge-tp 组件
 * @author Taoge <liangtao.gz@foxmail.com>
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var ThinkPHP = window.Think = {
            'ROOT': element.getAttribute('tp-root') || '',
            'APP': element.getAttribute('tp-app') || '',
            'PUBLIC': element.getAttribute('tp-public') || '',
            'DEEP': element.getAttribute('tp-deep') || '',
            'MODEL': element.getAttribute('tp-model') || '',
            'VAR': element.getAttribute('tp-var') || '',
            'IMG': element.getAttribute('tp-img') || '',
            'QQ': element.getAttribute('tp-qq') || '',
            'Tel': element.getAttribute('tp-tel') || ''
        };
    };

    return customElement;
});
