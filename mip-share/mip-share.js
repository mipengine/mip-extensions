/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var util = require('util');
    var viewer = require('viewer');
    var platform = util.platform;

    var Share = require('./share');


    /**
     * build
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var data = {
            title: element.getAttribute('title') || document.title,
            url: element.getAttribute('url') || location.href,
            content: element.getAttribute('content') || '',
            iconUrl: element.getAttribute('icon') || ''
        };

        // 由于 ios qq 分享接口在iframe下有bug,分享不了，所以用postmessaged的方式处理。
        if (viewer.isIframed && platform.isIos() && platform.isQQ()) {
            util.event.delegate(element, '.c-share-btn', 'click', function (e) {
                var key = this.classList[2] && this.classList[2].replace(/^c-share-btn-/, '');
                key === 'more' ? '' : key;
                viewer.sendMessage('mip-share', {key: key, opt: data});
            });
        }

        new Share(data, $(element));

        var elem = $(element).children().not('mip-i-space')[0];

        this.applyFillContent(elem);

    };

    return customElement;

});

