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
        self.rn = parseInt(element.getAttribute('max'));

        self.loadingHtml = '<div>加载中...</div>';
        self.loadFailHtml = '<div>加载失败...</div>';
        self.loadOverHtml = '<div>已没有更多结果！</div>';
        self.bufferHeightPx = 30;
        self.pageResultNum = 6;
        self.limitShowPn = 0;
        self.preLoadPn = 3;

        self.pushResult = function (rn, status) {
        // 异步获取数据示例
            var defer = $.Deferred();
            if (rn > self.rn) {
                defer.resolve('NULL');
            } else {
                fetchJsonp(url, {
                    jsonpCallback: 'callback'
                }).then(function (res) {
                    return res.json();
                }).then(function (data) {
                    var data = {
                        "items": [
                            {
                                "number": "1",
                                "img": "https://dummyimage.com/600x120"
                            }, {
                                "number": "2",
                                "img": "https://dummyimage.com/600x120"
                            }, {
                                "number": "3",
                                "img": "https://dummyimage.com/600x120"
                            }
                        ]
                    };
                    templates.render(self.element, data.items).then(function (htmls) {
                        defer.resolve(htmls);
                    });
                });
            };
            return defer.promise();
        };

        var InfiniteScroll = require('./infinitescroll');
        var dd = new InfiniteScroll({
            $result: $('.mip-infinitescroll-results'),
            $wrapper: $(window),
            $scroller: $('body'),
            $loading: $('.mip-infinitescroll-loading'),
            loadingHtml: self.loadingHtml,
            loadFailHtml: self.loadFailHtml,
            loadOverHtml: self.loadOverHtml,
            bufferHeightPx: self.bufferHeightPx,
            pageResultNum: self.pageResultNum,
            limitShowPn: self.limitShowPn,
            preLoadPn: self.preLoadPn,
            firstResult: [],
            pushResult: self.pushResult
        });
    };

    return customElement;
});
