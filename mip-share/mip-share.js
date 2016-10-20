/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    var Share = require('./share');


    /**
     * build
     */
    customElement.prototype.build = function () {
        var _element = this.element;

        new Share({
            title: _element.getAttribute('title') || document.title,
            url: _element.getAttribute('url') || location.href,
            content: _element.getAttribute('content') || '',
            iconUrl: _element.getAttribute('icon') || ''
        }, $(_element));

        var elem = $(_element).children().not("mip-i-space")[0];

        this.applyFillContent(elem);

    }
 
    return customElement;

});

