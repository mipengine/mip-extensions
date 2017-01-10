/**
 * @file iframe双向通信接口
 * @author chenrui09
 * @time 2016.12.13
 */

define(function (require) {
    var $ = require('zepto');
    var IframeInterface = require('customElement').create();
    var messageHandler;

    IframeInterface.prototype.createdCallback = initElement;

    function initElement() {
        // 绑定消息接受事件
        window.addEventListener('message', function (event) {
            if (messageHandler) {
                messageHandler.handle(event.data);
            }
        });

    }

    messageHandler = {
        handle: function (data) {
            var evtName = data.event;
            var events = this.events;
            var handler = events[evtName];
            var result;

            if (handler) {
                result = handler(data);
            }

            // 发送双向绑定消息
            if (result && data.type === 'two-way') {
                data.sentinel = 'PM_RESPONSE';
                data.data = result;

                window.parent.postMessage(data, '*');
            }
        },

        events: {
            // 获取分享信息
            getShareInfo: function () {
                var shareObj = {};
                var $img = $(document.body).find('mip-img');

                shareObj.title = document.title;
                shareObj.articleUrl = location.href.replace(/\#.*$/g, '');

                if ($img.length) {
                    shareObj.iconUrl = $img.eq(0).attr('src');
                }

                return shareObj;
            },

            // 滚动到指定位置
            scrollTo: function (data) {
                var scrollY = data.scrollY;

                document.body.scrollTop = scrollY;

                return true;
            },

            // 获取滚动位置
            getScrollY: function () {
                var result = {};

                result.scrollY = document.body.scrollTop;

                return result;
            },

            // 获取字号大小
            getDetailFont: function () {
                var result = {};
                var key = 'min_detail_font_size';

                result.font = localStorage.getItem(key);

                return result;
            },

            // 设置字体大小
            setDetailFont: function (data) {
                var key = 'min_detail_font_size';

                $('.' + key).remove();

                $(document.head).append([
                    '<style type="text/css" class="' + key + '">',
                        'html { font-size:' + 100 * data.font + 'px !important; }',
                    '</style>'
                ].join(''));

                localStorage.setItem(key, data.font);
            }
        }

    };


    // 设置预存的字体配置
    var fontConfig = messageHandler.events.getDetailFont();

    if (fontConfig && fontConfig.font) {
        messageHandler.events.setDetailFont(fontConfig);
    }

    return IframeInterface;
});
