/**
 * @file mip-infinitescroll 组件
 * @author wangpei07
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = self.element;
        var url = element.getAttribute('src');
        if (!url) {
            /* eslint-disable fecs-camelcase */
            console.error('未填写src字段，不能获取数据');
            element.remove();
            return;
        }
        self.rn = element.getAttribute('rn') ? parseInt(element.getAttribute('rn'), 10) : 20;
        self.pn = element.getAttribute('pn') ? parseInt(element.getAttribute('pn'), 10) : 6;
        self.bufferHeightPx = element.getAttribute('bufferHeightPx')
            ? parseInt(element.getAttribute('bufferHeightPx'), 10) : 10;
        self.loadingHtml = element.getAttribute('loadingHtml') ? element.getAttribute('loadingHtml') : '加载中...';
        self.loadFailHtml = element.getAttribute('loadFailHtml') ? element.getAttribute('loadFailHtml') : '加载失败';
        self.loadOverHtml = element.getAttribute('loadOverHtml') ? element.getAttribute('loadOverHtml') : '加载完毕';

        url = self.pn ? url += '?pn=' + self.pn++ : url;

        self.pushResult = function (rn, status) {
            // 异步获取数据示例
            var defer = $.Deferred();
            if (rn > self.rn) {
                defer.resolve('NULL');
            }
            else {
                fetchJsonp(url, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    templates.render(self.element, data.items).then(function (htmls) {
                        defer.resolve(htmls);
                    });
                });
            }
            return defer.promise();
        };

        var InfiniteScroll = require('./infinitescroll');
        new InfiniteScroll({
            $result: $('.mip-infinitescroll-results'),
            $wrapper: $(window),
            $scroller: $('body'),
            $loading: $('.mip-infinitescroll-loading'),
            loadingHtml: self.loadingHtml,
            loadFailHtml: self.loadFailHtml,
            loadOverHtml: self.loadOverHtml,
            bufferHeightPx: self.bufferHeightPx,
            pageResultNum: self.pn,
            limitShowPn: 0,
            preLoadPn: 2,
            firstResult: [],
            pushResult: self.pushResult
        });
    };

    return customElement;
});
