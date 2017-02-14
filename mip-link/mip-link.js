/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var customElement = require('customElement').create();

    /**
     * build
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = element.getAttribute('href');
        var title = element.getAttribute('title') || '';
        if (!url) {
            return;
        }

        var pageType = 1;
        var cacheMeta = document.querySelector('meta[property="mip:use_cache"]');
        if (cacheMeta && cacheMeta.getAttribute('content') === 'no') {
            pageType = 2;
        }

        var mipLinkObj = {
            'url': url,
            'title': title,
            'pageType': pageType,
            'click': (element.getAttribute('data-title') || element.innerText.replace(/(^\s*)|(\s*$)/g, '').split('\n')[0])
        };
        var strData = JSON.stringify(mipLinkObj);

        var htmlDom = element.innerHTML;
        var domStr = '<a href=' + url + ' data-mipLink =' + strData + '>' + htmlDom + '</a>';
        element.innerHTML = domStr;
    };

    return customElement;

});
