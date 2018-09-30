
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
        this.addEventAction('reload', function (event, str) {
            str = str ? 500 : parseInt(str, 10);
            setTimeout(function () {
                window.top.location.reload();
            }, str);
        });

        // 添加alert提示事件
        this.addEventAction('alert', function (event, str) {
            window.top.alert(str);
        });

        // 添加后退事件
        this.addEventAction('goback', function (event, str) {
            if (window.top.history.length === 0 && str) {
                window.top.location.href = str;
            } else {
                window.top.history.go(-1);
            }
        });

        // 添加重定向事件
        this.addEventAction('redirect', function (event, url) {
            var params = url.split(',');
            url = params[0];
            var timeWait = params[1] ? Number.parseInt(params[1], 10) : 0;

            if (url) {
                setTimeout(function () {
                    window.top.location.href = url;
                }, timeWait);
            }
        });
    };
    return customElement;
});
