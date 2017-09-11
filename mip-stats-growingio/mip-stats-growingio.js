/**
 * @file mip-stats-growingio 组件
 * @author Uncle Zheng
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var myVds = [];
        window._vds = myVds;
        var element = this.element;
        var accountId = element.getAttribute('accountid');
        myVds.push(['setAccountId', accountId]);
        var vds = document.createElement('script');
        vds.type = 'text/javascript';
        vds.async = true;
        vds.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
        $(element).append(vds);
    };

    return customElement;
});
