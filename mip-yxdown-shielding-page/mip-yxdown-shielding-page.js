/**
 * @file mip-yxdown-shielding-page 组件
 * @author lixkoo
 */

define(function (require) {

    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        window.showkey = function (alist, blist) {
            window.skeyA = alist;
            window.skeyB = blist;
        };
        var ar = document.createElement('script');
        ar.src = 'http://static.yxdown.com/all/js/shielding-page.js';
        ar.type = 'text/javascript';
        document.body.appendChild(ar);
        ar.onload = function () {
            var host = location.host.toLowerCase();
            var lfun = function (arr) {
                if (/\/zhibo\/\d+\.html/.test(location.href)) {
                    return 0;
                }

                var si = false;
                var func = function () {
                    if (document.title) {
                        var dtitle = document.title.toLowerCase();
                        for (var i = 0; i < arr.length; i++) {
                            if (dtitle.indexOf(arr[i].toLowerCase()) >= 0) {

                                window.location = 'http://m.yxdown.com/404';
                                break;
                            }
                        }
                        if (si) {
                            clearInterval(si);
                        }
                    }
                };
                func();
                si = setInterval(func, 100);
            };
            lfun(window.skeyA);
            if (host.indexOf('yxdown.com') >= 0) {
                lfun(window.skeyB);
            }
        };
    };

    return customElement;
});
