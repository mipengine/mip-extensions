/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 14:18
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var module = {};
    var $ = require('zepto');

    module.config = {
        url: '/api/index.php?m=wap&c=index&a=changeRecommend&flag=h&timestamp=',
        ele: '.change-more',
        render: '#rec'
    };

    module.get = function () {
        var timestamp = new Date().getTime();
        var config = this.config;
        var url = config.url + timestamp;
        var ele = $(config.ele);
        var render = $(config.render);

        ele.find('#recloading').addClass('changMore_curr');

        $.get(url, function (data) {
            var json = data;
            var htmls = '';

            for (var i = 0; i < json.length; i++) {
                htmls += '<li><a href="/view/'
                    + json[i].id + '.html" title="'
                    + json[i].title + '">'
                    + json[i].title + '</a></li>';
            }

            ele.find('#recloading').removeClass('changMore_curr');

            render.html(htmls);
        });
    };

    return module;
});
