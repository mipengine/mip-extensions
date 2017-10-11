/**
 * @file 推荐组件
 * @author chenrui09
 * @time 2016.11.21
 */

define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var viewer = require('viewer');
    var RecommendElement = require('customElement').create();
    var recommend;

    RecommendElement.prototype.createdCallback = renderElement;

    function renderElement() {
        var $ele = $(this.element);
        var url = $ele.attr('src') || '//headline.baidu.com/doc/recommended';

        recommend.init({
            $container: $ele,
            url: url
        });
    }

    function getUrlQuery(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return r[2];
        }
        return null;
    }

    function getOriginUrl() {
        var url = location.href;
        url = util.parseCacheUrl(url);
        url = url.replace(/\#.*$/g, '');
        return url;
    }

    function getCdnUrl(url) {
        return '//mib.bdstatic.com/doc/detail/' + encodeURIComponent(url) + '/0/#from=sub';
    }

    function formatTime(time) {
        var tempSeconds = 1000 * time;
        if ((new Date() - tempSeconds) < 60000) {
            return '刚刚';
        }
        var tempMinutes = Math.floor((new Date() - tempSeconds) / 60000);
        if (tempMinutes < 60) {
            return tempMinutes + '分钟前';
        }
        var tempHours = Math.floor(tempMinutes / 60);
        if (tempHours < 24) {
            return tempHours + '小时前';
        }
        var tempDate = new Date(tempSeconds);
        var month = tempDate.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        var day = tempDate.getDate() < 10 ? ('0' + tempDate.getDate()) : tempDate.getDate();
        return  month + '-' + day;
    }

    recommend = {
        url: null,
        ajaxData: null,
        isIframe: window.parent !== window,

        init: function (props) {
            this.$container = props.$container;

            this.url = props.url;
            this.ajaxData = {
                'url_key': getOriginUrl(),
                'from': getUrlQuery('from') || 'search',
                'app_from': getUrlQuery('app_from') || 'midway',
                'qid': window.B ? window.B.qid : 0,
                'is_mip': true
            };

            this.request();
            this.delegate();
        },

        request: function () {
            var self = this;

            $.ajax({
                url: this.url,
                dataType: 'jsonp',
                jsonp: 'cb',
                data: this.ajaxData,
                success: function (res) {
                    if (res.status !== 0) {
                        self.error(res.data);
                    } else {
                        self.display(res.data);
                    }
                }
            });
        },

        delegate: function () {
            var isIframe = this.isIframe;

            if (isIframe) {
                this.$container.on('click', '.mip-news-recommend-href', function (e) {
                    e.preventDefault();

                    var $ele = $(this);
                    viewer.sendMessage('loadiframe', {
                        'url': $ele.data('url'),
                        'title': $ele.find('.mip-news-recommend-provider').text(),
                        'click': $ele.data('click')
                    });
                });

                this.$container.on('click', '.mip-news-recommend-hot-href', function (e) {
                    e.preventDefault();

                    var $ele = $(this);
                    viewer.sendMessage('urljump', {
                        'url': $ele.data('url'),
                        'click': $ele.data('click')
                    });
                });
            }
        },

        handleData: function (item, i, action) {
            var data = {
                action: action,
                order: i,
                href: item.url
            };

            return JSON.stringify(data);
        },

        display: function (data) {
            var self = this;
            var isIframe = this.isIframe;
            var htmlNews = '';
            var htmlHots = '';

            $.each(data.recommend, function (i, item) {
                var dataClick = self.handleData(item, i, 'recommend');
                var href = isIframe ? 'javascript:void(0);' : getCdnUrl(item.url);

                htmlNews += [
                    '<div class="mip-news-recommend-item">',
                        '<a class="mip-news-recommend-href" href="' + href + '" data-url="' + item.url
                                + '" data-click=\'' + dataClick + '\'>',
                            '<div class="mip-news-recommend-title">' + item.title + '</div>',
                            '<div class="mip-news-recommend-info">',
                                '<span>' + formatTime(item.time) + '</span>',
                                '<span class="mip-news-recommend-provider">' + item.provider + '</span>',
                            '</div>',
                        '</a>',
                    '</div>'
                ].join('');
            });

            $.each(data.hot_card, function (i, item) {
                var dataClick = self.handleData(item, i, 'hotpoint');
                var href = isIframe ? 'javascript:void(0);' : item.url;

                if (i % 2 === 0) {
                    htmlHots += '<div class="mip-news-recommend-row">';
                }

                htmlHots += [
                    '<div class="mip-news-recommend-hot-item">',
                        '<a class="mip-news-recommend-hot-href" href="' + href + '" data-url="' + item.url
                                + '" data-click=\'' + dataClick + '\'>',
                            item.query,
                        '</a>',
                    '</div>'
                ].join('');

                if (i % 2 === 1) {
                    htmlHots += '</div>';
                }
            });

            var html = [
                '<div class="mip-news-recommend-list">',
                    '<h5>相关推荐</h5>',
                    '<div>',
                        htmlNews,
                    '</div>',
                '</div>',
                '<div class="mip-news-recommend-hotpoints">',
                    '<h5>新闻热点</h5>',
                    '<div>',
                        htmlHots,
                    '</div>',
                '</div>'
            ].join('');

            this.$container.append(html);
        },

        error: function () {

        }
    };

    return RecommendElement;
});
