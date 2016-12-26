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

            scrollTo: function (data) {
                var scrollY = data.scrollY;

                document.body.scrollTop = scrollY;

                return true;
            },

            getScrollY: function () {
                var result = {};
                result.scrollY = document.body.scrollTop;
                return result;
            }

        }

    };

    return IframeInterface;
});
