/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-browser.js
 */

define(function () {
    var ua = window.navigator.userAgent;
    var module = {};

    module.UC = ((function () {
        return /UCBrowser/i.test(ua);
    })());

    module.QQ = ((function () {
        return /MQQBrowser/i.test(ua);
    })());
	
     module.QQ = ((function () {
        return /QQ/i.test(ua);
    })());
    module.Safari = ((function () {
        return /Safari/i.test(ua);
    })());

    module.browser = (function (me) {
        var name;
        switch (true) {
            case me.UC:
                name = 'UC';
                break;
            case me.QQ:
                name = 'QQ';
                break;
            case me.Safari:
                name = 'Safari';
                break;
            default:
                name = '';
                break;
        }

        return name;
    }(module));

    return module;
});
