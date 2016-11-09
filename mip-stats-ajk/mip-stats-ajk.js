/**
 * @file 安居客统计
 *
 * @author danny
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var elem = this.element;
        var pageName = $(elem).attr('pg-name');
        var cityAlias = $(elem).attr('city-alias');

        // init the page params
        var APF = window.APF = {};
        APF.info = {
            cityAlias: cityAlias,
            pageName: pageName
        };

        var url = $(elem).attr('src');
        var elescrit = document.createElement('script');
        elescrit.src = url;
        $('body').append(elescrit);
    };

    return customElement;

});
