/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-browser.js
 */

define(function () {
    var ua = navigator.userAgent;
    var module = {};

    module.UC = ((function () {
        return /UCBrowser/i.test(ua);
    })());

    module.QQ = ((function () {
        return /MQQBrowser/i.test(ua);
    })());

    module.Safari = ((function () {
        return /Safari/i.test(ua);
    })());

    module.browser = (function (me) {
        var name;
        if (me.UC) {
            name = 'UC';
        }
        else if (me.QQ) {
            name = 'QQ';
        }
        else if (me.Safari) {
            name = 'Safari';
        }
        else {
            name = '';
        }

        return name;
    }(module));

    return module;
});
