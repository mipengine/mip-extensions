/**
 * @file mip-mz-addonapp 推荐app下载
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var platform = util.platform;
    var customElement = require('customElement').create();
    function initAD(type, obj) {
        var sys = (platform.isIos()) ? 'ios' : 'android';
        var apps = obj[type][sys];
        var html = '<ul class="sixbox"><li>';
        for (var i = 0; i < apps.length; ++i) {
            html += '<a href="' + apps[i].url + '"><img src="' + apps[i].img + '" /><span>'
            + apps[i].name + '</span></a>';
        }
        html += '<li></ul>';
        return html;
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var $element = $(element);
        var type = $element.attr('type');
        $.ajax({
            method: 'get',
            url: 'https://m.muzisoft.com/mipaddonapp.json',
            dataType: 'json',
            success: function (data) {
                var innerHTML = initAD(type, data);
                var obj = ($('#vother').length > 0) ? $('#vother') : $('#info');
                obj.after(innerHTML);
            },
            error: function () {}
        });
    };
    return customElement;
});
