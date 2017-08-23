/**
 * @file 百度智荐
 *
 * @author PacoIrene
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.build = function () {
        var element = this.element;
        var tid = element.getAttribute('tid');
        var readSelector = element.getAttribute('read');

        if (tid) {
            /*eslint-disable*/
            window.cir_recommend_config = window.cir_recommend_config || {};
            window.cir_recommend_config._popIn_read_selector = readSelector;
            window.cir_recommend_config._recommend_article = window.cir_recommend_config._recommend_article || [];
            window.cir_recommend_config._recommend_article.push({
                tid: Number(tid),
                element: element
            });
            /*eslint-enable*/
            var elescript = document.createElement('script');
            elescript.src = location.protocol + '//cir1.bdstatic.com/static/cir.min.js"';
            $('body').append(elescript);
        }
    };

    return customElement;

});
