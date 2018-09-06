/**
 * @file mip-258-form 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var form = require('./mip-youbao-form-fn');

    customElement.prototype.build = function () {
        var element = this.element;
        form.createDom(element);
        form.initMessageEvents(element);
    };
    customElement.prototype.firstInviewCallback = function () {

        // 页面刷新事件
        this.addEventAction('reload', function (event, str) {
            str = str ? 500 : parseInt(str, 10);
            setTimeout(function () {
                window.top.location.reload();
            }, str);
        });

        // 表单数据重置事件
        this.addEventAction('reset', function (event, str) {
            event.target.reset();
        });

        //验证错误事件
        this.addEventAction('invalid', function (event, target) {
            
            form.invalidHandle(target);
        });

        this.addEventAction('valid', function (event, target) {
            
            form.validHandle(target);
        });
    };
    return customElement;
});
