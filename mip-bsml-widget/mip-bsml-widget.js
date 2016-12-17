/**
 * @file mip-bsml-widget 组件
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    var host = 'https://jianzhan.baidu.com/v.gif';

    /**
     * 日志打点
     */
    function addLog(data) {
        if (!data) {
            return;
        }

        var element = this.element;

        try {
            data = JSON.parse(data);
            var pageinfo = $('#pageinfo');
            var log = {
                action_id: data.action_id ? data.action_id : 'site_comp_click',
                action_name: data.action_name ? data.action_name : '普通组件点击',
                guid: pageinfo.attr('guid'),
                site_id: pageinfo.attr('siteid'),
                channel_id: pageinfo.attr('channel'),
                time_stamp: Math.round(new Date().getTime()/1000),
                page_name: pageinfo.attr('pagename'),
                page_type: pageinfo.attr('pagetype'),
                refer: document.referrer,
                url: location.href,
                cuid: '',
                extra:{}
            }
            if (log.action_id === 'site_bar_click') {
                log.extra.type = data.type;
            } else if (log.action_id === 'site_comp_click') {
                log.extra = {
                    comp_name: $(element).attr('name'),
                    comp_type: $(element).attr('type')
                }
            }
            log.extra = JSON.stringify(log.extra);
            var src = host + '?' + $.param(log);
            var img = new Image();
            img.src = src;
        } catch (e) {

        }
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var me = this;
        $(element).on('click', '[data-click]', function() {
            addLog.call(me, $(this).attr('data-click'));
        });
    };

    return customElement;
});
