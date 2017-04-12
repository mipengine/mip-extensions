/**
 * @file 跳转链接
 * @author junmer, Jenny_L(jiaojiaomao220@163.com)
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * [isNoCache 判断是否禁止缓存]
     *
     * @return {boolean}
     */
    function isNoCache() {
        var cachemeta = document.querySelector('meta[property="mip:use_cache"]');
        if (cachemeta && cachemeta.getAttribute('content') === 'no') {
            return true;
        }
        return false;
    }

    /**
     * 点击链接事件
     *
     * @param  {Event} e event
     */
    function onClick(e) {

        e.preventDefault();

        var href = this.getAttribute('href');
        var history = this.getAttribute('history');
        var pageType = isNoCache() ? 2 : 1;

        if (href) {
            if (window.parent !== window) {
                var elem = $(this);
                var message = {
                    event: 'loadiframe',
                    data: {
                        url: href,
                        title: (elem.attr('title') || elem.text().trim().split('\n')[0]),
                        click: elem.data('click'),
                        pageType: pageType
                    }
                };

                window.parent.postMessage(message, '*');
            }
            else {
                location.href = href;
            }
        }
        else if (history) {
            // histry: go back and forward
            var historyArr = history.split(',');
            var func = historyArr[0];
            // XXX: avoid using eval
            switch (func) {
                case 'go':
                    var step = historyArr[1];
                    window.history.go(step);
                    break;
                case 'back':
                    window.history.back();
                    break;
                case 'forward':
                    window.history.forward();
                    break;
            }
        }
    }

    /**
     * build
     *
     */
    customElement.prototype.build = function () {
        var ele = this.element;

        $(ele).on('click', onClick.bind(ele));
    };

    return customElement;

});
