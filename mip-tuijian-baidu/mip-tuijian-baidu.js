/**
 * @file 百度推荐插件
 * @author zengguanming
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {
        var elem = this.element;
        var siteId= elem.getAttribute('site-id');
        var planId = elem.getAttribute('plan-id');

        // 必填参数检查
        if (siteId && planId) {
            var tj = document.createElement('script');
            tj.src = '//crs.baidu.com/t.js?'
                + 'siteId=' + siteId
                + '&planId=' + planId
                + '&async=' + 0
                + '&referer=' + encodeURIComponent(document.referrer)
                + '&title=' + encodeURIComponent(document.title)
                + '&rnd=' + (+new Date);
            $(elem).append(tj);
        }
    };

    return customElement;
});
