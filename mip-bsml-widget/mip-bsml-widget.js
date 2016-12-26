/**
 * @file mip-bsml-widget bsml通用组件，包括打点等功能
 * @author
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    var host = 'https://jianzhan.baidu.com/v.gif';

    /**
     * 获取channel_id
     *
     * @return {string}
     */
    function getChannel() {
        if (window.bsmlChannel) {
            return window.bsmlChannel;
        }

        window.bsmlChannel = '';
        var qs = location.search.replace('?', '').split('&');
        $.each(qs, function (i, q) {
            var param = q.split('=');
            if (param[0] === 'channel_id') {
                window.bsmlChannel = param[1];
                return false;
            }
        });
        return window.bsmlChannel;
    }

    /**
     * 获取cuid
     *
     * @return {string}
     */
    function getCuid() {
        if (window.bsmlCuid) {
            return window.bsmlCuid;
        }

        // @todo 暂时没有好办法获取cuid 下期实现
        window.bsmlCuid = '';
        return window.bsmlCuid;
    }

    /**
     * 日志打点
     *
     * @param {string} data 打点数据
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
                'action_id': data.action_id ? data.action_id : 'site_comp_click',
                'action_name': data.action_name ? data.action_name : '普通组件点击',
                'guid': pageinfo.attr('guid'),
                'site_id': pageinfo.attr('siteid'),
                'channel_id': getChannel(),
                'time_stamp': Math.round(new Date().getTime() / 1000),
                'page_name': pageinfo.attr('pagename'),
                'page_type': pageinfo.attr('pagetype'),
                'refer': document.referrer,
                'url': location.href,
                'cuid': getCuid(),
                'extra': {}
            };

            if (log.action_id === 'site_bar_click') {
                log.extra.type = data.type;
            } else if (log.action_id === 'site_comp_click') {
                log.extra = {
                    'comp_name': $(element).attr('name'),
                    'comp_type': $(element).attr('type')
                };
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
        $(element).on('click', '[data-click]', function () {
            addLog.call(me, $(this).attr('data-click'));
        });
        // 首次打点
        if (!window.bsmlLog) {
            window.bsmlLog = 1;
            var log = '{"action_id":"site_page_show","action_name":"页面渲染"}';
            addLog.call(me, log);
        }
    };

    return customElement;
});
