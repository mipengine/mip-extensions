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
        var element = this.element;

        new Share({
            title: element.getAttribute('title') || document.title,
            url: element.getAttribute('url') || location.href,
            content: element.getAttribute('content') || '',
            iconUrl: element.getAttribute('icon') || ''
        }, $(element));

        var elem = $(element).children().not('mip-i-space')[0];

        this.applyFillContent(elem);

    };

    return customElement;

});

