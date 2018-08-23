/**
 * @file mip-like 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = $(this.element);
        var form = $('#' + element.attr('id') + ' form');
        var all = element.find('.mip-all');
        var select = element.find('select');

        select.change(function () {
            form.submit();
        });
        all.click(function () {
            var urlBox = 'http://' + window.location.host + window.location.pathname;
            window.top.location.href = urlBox;
        });
    };
    return customElement;
});
