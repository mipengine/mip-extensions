/**
 * @file mip-alert 组件
 * @author Grace
 */
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var text = element.getAttribute('alert-text') || '默认alert内容';
        element.onclick = function () {
            alert(text);
        };
    };
    return customElement;
});
