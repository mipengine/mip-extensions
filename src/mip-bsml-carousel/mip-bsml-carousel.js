/**
 * @file mip-bsml-carousel 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var IScroll = require('./iscroll/iscroll');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var me = this;
        var element = me.element;
        $(element).find('.mip-bsml-carousel-list-item').css({
            width: window.innerWidth
        });
        var length = $(element).find('.mip-bsml-carousel-list-item').length;
        $(element).find('.mip-bsml-carousel-list').css({
            width: length + '01%'
        });
        $(element).find('.mip-bsml-carousel-list-item-point .total-length').html(length);

        var scrollParams = {
            scrollX: true,
            scrollY: false,
            eventPassthrough: true,
            momentum: false,
            snap: true
        };
        var scroll = new IScroll($(element).find('.mip-bsml-carousel')[0], scrollParams);
        if (length > 1) {
            scroll.on('scrollEnd', function () {
                $(element).find('.mip-bsml-carousel-list-item-point .current').html(scroll.currentPage.pageX + 1);
            });
        }
        scroll.refresh();
    };

    return customElement;
});
