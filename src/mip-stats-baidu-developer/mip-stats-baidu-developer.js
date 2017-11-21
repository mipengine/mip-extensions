/**
 * @file mip-stats-baidu-developer 组件
 *
 * @author tanyiming@baidu.com
 */

define(function(require) {

    var $ = require('zepto');
    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function() {
        var domain = this.element.getAttribute('domain');
        domain = domain !== undefined && domain !== '' ? domain : 'https://developer.baidu.com/';
        var api = domain + 'collect/click';
        console.log(api);
        $('a').click(function() {
            var url = $(this).attr('href');
            var logBean = { 'url': url, 'system': 'developer' };
            $.ajax({
                url: api,
                contentType: 'application/json',
                type: 'post',
                cache: false,
                data: JSON.stringify(logBean),
                success: function(data) {}
            });
        });
    };

    return customElement;
});