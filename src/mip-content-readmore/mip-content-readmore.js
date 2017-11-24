/**
 * @file 查看更多文本内容
 * @author jfdsies@gmail.com
 * @version 1.0.0
 * @copyright 2016 yjbys.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = function (selector) {
        var selectorType = 'querySelectorAll';

        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }
        else if (selector.indexOf('.') === 0) {
            selectorType = 'getElementsByClassName';
            selector = selector.substr(1, selector.length);
        }
        return document[selectorType](selector);
    };
    var customElement = require('customElement').create();

    function htmlDecode(str) {
        var s = '';
        if (str.length < 1) {
            return '';
        }
        s = str.replace(/&/g, '&');
        s = s.replace(/</g, '<');
        s = s.replace(/>/g, '>');
        s = s.replace(/ /g, ' ');
        s = s.replace(/'/g, '\'');
        s = s.replace(/"/g, '\"');
        return s;
    }

    customElement.prototype.createdCallback = function () {
        var me = this.element;
        var maxlen = me.getAttribute('maxlen');
        var buttitle = me.getAttribute('buttitle');
        var element = me.getAttribute('element');
        maxlen = maxlen ? maxlen : 666;
        buttitle = buttitle ? buttitle : '查看更多';
        element = element ? $(element)[0] : $('.content')[0];

        var content = htmlDecode(element.innerHTML);
        // 避免特定情况下，图片重复显示的问题
        content = content.replace(/<img .*?>/, '');
        var conlen = content.length;
        var intag = false;
        var len = 0;
        var tmp;
        for (var i = 0; ; i++) {
            if (len >= maxlen) {
                len = i;
                break;
            }
            if (i >= conlen) {
                len = conlen;
                break;
            }
            tmp = content.charAt(i);
            if (tmp === '<' && !intag) {
                intag = true;
                continue;
            }
            else if ('>' === tmp && intag) {
                intag = false;
                continue;
            }
            else if (intag || tmp === '' || tmp === ' ' || tmp === '\r' || tmp === '\n') {
                continue;
            }
            len++;
        }
        if (content !== undefined && conlen > len) {
            var id = Math.floor(Math.random() * 100);
            me.innerHTML = '<div class="mip-content-readmore" data-mip-readmore-id="' + id
                + '"><em><code class="mip-readmore-fx"></code></em><span>'
                + buttitle + '</span></div>';
            element.innerHTML = content.substring(0, len) + '<mip-readmore' + id
                + '> ......</mip-readmore' + id + '>';
            var readmoreele = $('.mip-content-readmore');
            readmoreele[readmoreele.length - 1].addEventListener('click', function () {
                var thisid = this.getAttribute('data-mip-readmore-id');
                $('mip-readmore' + thisid)[0].innerHTML = content.substring(len);
                me.innerHTML = '';
            }, false);
        }
    };

    return customElement;
});
