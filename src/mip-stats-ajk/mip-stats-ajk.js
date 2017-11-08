/**
 * @file 安居客统计
 *
 * @author danny
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var elem = this.element;
        var pageName = elem.getAttribute('pg-name');
        var cityAlias = elem.getAttribute('city-alias');

        // init the page params
        var APF = window.APF = window.APF || {};
        var info = APF.info = APF.info || {};
        pageName && (info.pageName = pageName);
        cityAlias && (info.cityAlias = cityAlias);

        var url = elem.getAttribute('src');
        var elescrit = document.createElement('script');
        elescrit.src = url;
        document.getElementsByTagName('body')[0].appendChild(elescrit);
    };

    return customElement;

});
