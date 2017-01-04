/**
 * @file mip-mz-addonapp 推荐app下载
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
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
     *  createdCallback
     */
    customElement.prototype.createdCallback = function () {
        var element = this.element;
        var $element = $(element);
        var type = $element.attr('type');
        var ajaxurl = $element.attr('ajaxurl');
        function callback(json) {
            var innerHTML = initAD(type, json);
            var obj = ($('.vother').length > 0) ? $('.vother') : $('.info');
            obj.after(innerHTML);
        }
        fetchJsonp(ajaxurl, {
            timeout: 3000,
            jsonpCallback: 'ck'
        }).then(function (response) {
            return response.json();
        }).then(callback);
    };
    return customElement;
});
