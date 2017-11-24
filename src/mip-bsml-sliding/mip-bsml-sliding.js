/**
 * @file mip-bsml-sliding 组件
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
        var me = this;
        var element = me.element;
        $(element).find('.mip-bsml-sliding-list-item').css({
            width: Math.round(window.innerWidth / 3) - 4 + 'px'
        });
        var length = $(element).find('.mip-bsml-sliding-list-item').length;
        $(element).find('.mip-bsml-sliding-list').css({
            width: length * Math.round(window.innerWidth / 3) - 4 + 'px'
        });

        var scrollParams = {
            scrollX: true,
            scrollY: false,
            eventPassthrough: true,
            momentum: false,
            snap: true
        };
        var scroll = new IScroll($(element).find('.mip-bsml-sliding')[0], scrollParams);

        scroll.refresh();
    };

    return customElement;
});
