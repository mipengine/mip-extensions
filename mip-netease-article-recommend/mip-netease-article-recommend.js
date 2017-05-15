/**
 * @file displayState.js
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var articleRecommend = require('customElement').create();
    var data = require('./data');
    var DOM = require('./DOM');

    var match = location.href.match(/article_mip\/([A-Z0-9]{16})\\|\./i);
    var docid = match && match[1];

    articleRecommend.prototype.build = function () {
        var mipElement = this.element;
        data.fetch().then(function (res) {
            return res.filter(function (item) {
                return item.docId !== docid;
            }).slice(0, 4);
        }).then(function (list) {
            var rootElement = DOM.build(list);
            if (!rootElement) {
                return;
            }
            mipElement.appendChild(rootElement);
            DOM.initControl(rootElement);
            document.body.classList.add('article-footer-show');
        }).catch(function () {});
    };
    return articleRecommend;
});
