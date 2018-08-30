
/**
 * @file mip-ajax-button 组件
 *
 * @author chen
 * @time 2018.8.21
 */
define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {

    };

    customElement.prototype.firstInviewCallback = function (event, str) {
        // 添加页面刷新事件
        this.addEventAction('reload', function (event , str) {
            str = str ? 500 : parseInt(str, 10);
            setTimeout(function () {
                window.top.location.reload();
            }, str);
        });
        // 添加alert提示事件
        this.addEventAction('alert', function (event , str) {
            alert(str);
        });
        this.addEventAction('goback', function (event , str) {
            window.top.history.back();
        });
    };
    return customElement;
});
