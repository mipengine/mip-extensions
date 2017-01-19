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

        var htmlDom = element.innerHTML;
        var domStr = '<a href=' + url + ' data-title=' + title + '>' + htmlDom + '</a>';
        element.innerHTML = domStr;
    };

    return customElement;

});
