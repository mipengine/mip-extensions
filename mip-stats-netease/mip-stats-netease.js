/**
 * @file 网易统计
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var _element = this.element;
        var $_element = $(_element);
        var id = _element.getAttribute('id') || '';

        var elescript = document.createElement('script');
        elescript.src = location.protocol + '//analytics.163.com/ntes_ex.js';
        $('body').append(elescript)
        elescript.onload = function() {
            // 网易小伙伴 居然支持 amd
            require(['NTES'], function (NTES) {
                NTES(id).pageTracker();
            });
        }
    }

    return customElement;

});
