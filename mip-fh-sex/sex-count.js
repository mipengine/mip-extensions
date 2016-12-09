/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 16:54
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var $ = require('zepto');
    var articleId = $('meta[name="article-id"]').attr('content') || '';
    var module = {};

    module.config = {
        url: 'http://api.fh21.com.cn/index.php?callback=?',
        data: {
            m: 'www',
            c: 'm',
            type: 'wapclick',
            aid: articleId
        }
    };

    module.click = function (opt) {
        opt = opt || {};

        var config = this.config;
        var url = opt.url || config.url;
        var data = opt.data || config.data;

        if (articleId) {
            $.getJSON(url, data, function (res) {
            });
        }
    };

    return module;
});
