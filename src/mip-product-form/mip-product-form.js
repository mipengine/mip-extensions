
/**
 * @file mip-button-form 组件
 *
 * @author chen
 * @time 2018.8.21
 */
define(function (require) {
    var customElement = require('customElement').create();
    var form = require('./mip-product-form-fn');
    customElement.prototype.build = function () {
        var element = this.element;
        form.createDom(element);


        form.initMessageEvents(element);
    };
    customElement.prototype.firstInviewCallback = function () {
        this.addEventAction('reload', function (event, str) {
            // 页面刷新操作
            str = str ? 500 : parseInt(str, 10);
            setTimeout(function () {
                window.top.location.reload();
            }, str);
        });

        this.addEventAction('reset', function (event, str) {
            // 页面刷新操作
            event.target.reset();
        });
    };
    return customElement;
});
