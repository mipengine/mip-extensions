/**
 * @file data.js
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var jsonp = require('fetch-jsonp');
    return {

        /**
         * 从滚动新闻接口取数据
         *
         * @return {Promise<Object[]>} 推荐列表数据
         */
        fetch: function () {
            return jsonp('http://c.m.163.com/nc/backflow/jsonp/clickrate.html', {
                jsonpCallback: 'callback',
                jsonpCallbackFunction: 'newsappBackFlow'
            }).then(function (res) {
                return res.json();
            }).then(function (recomList) {
                return recomList;
            });
        }
    };
});
