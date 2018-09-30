/**
 * @file mip-code-button 组件
 *
 * @author chen
 * @time 2018.8.28
 */

define(function (require) {
    var customElement = require('customElement').create();
    var initJs = require('./mip-code-button-fn');
    customElement.prototype.build = function () {
        var element = this.element;
        // 初始化
        initJs.createDom(element);
    };

    // 缩进不能用tab，就这么喜欢标新立异？
    customElement.prototype.firstInviewCallback = function () {
        // 添加绑定手机号事件
        this.addEventAction('bind', function (event, str) {
            if (event.target.tagName === 'INPUT') {
                initJs.setFetchData(str, event.target.value.trim());
            }
        });
    };
    return customElement;
});
