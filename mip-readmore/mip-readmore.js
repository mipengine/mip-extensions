/**
 * @file mip-readmore 组件
 * @author
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var maxHeight = $(element).attr('maxHeight');
        var pageClass = '.' + $(element).attr('pageClass');
        var imgHref = $(element).attr('imgHref');
        var thisId = $(element).attr('id');
        var thisHeight = element.scrollHeight;
        if (thisHeight > maxHeight && $(pageClass).contents().length === 0) {
            $(element).css({height: maxHeight + 'px', overflow: 'hidden'});
            $(pageClass).append('<a on="tap:' + thisId + '.read_more(show)">点击阅读全文</a>');
            if (imgHref) {
                $(element).children('mip-img').wrap('<a target="_blank" href="' + imgHref + '></a>');
            }
        }
        this.addEventAction('read_more', function (event, str) {
            if (str === 'show') {
                $(element).css({height: '', overflow: 'auto'});
                $(pageClass).html('<a on="tap:' + thisId + '.read_more(hide)">折叠收起</a>');
            }
            if (str === 'hide') {
                $(element).css({height: maxHeight + 'px', overflow: 'hidden'});
                $(pageClass).html('<a on="tap:' + thisId + '.read_more(show)">展开更多</a>');
            }
        });
    };

    return customElement;
});
