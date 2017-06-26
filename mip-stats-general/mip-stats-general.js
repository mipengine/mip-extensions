/**
 * @file 常规统计
 * @author junmer
 */

define(function (require) {

    var customElement = require('customElement').create();

    function noop () {}

    customElement.prototype.build = function () {
        var _element = this.element;

        // 隐藏
        _element.style.display = 'none';

        var url = _element.getAttribute('src');

        if (!url) {
            return;
        }

        var img = new Image();

        img.onload = img.onError = noop;

        _element.appendChild(img);

        img.src = ''
            + url
            + (url.indexOf('?') > -1 ? '&' : '?')
            + '_='
            + (+new Date());


    }

    return customElement;

});
