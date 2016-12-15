/**
 * @author: yoyoyoo
 * @date: 2016-12-12
 * @file: mip-ck-browser.js
 */

define(function (require) {
    var module = {};
    var $ = require('zepto');
    var url = 'https://m.cnkang.com/video/areaname?' + (+new Date());

    module.get = function (cb) {
        cb = cb || function () { };

        $.post(url, function (res) {
            var errno = +res.errno;

            if (errno === 0) {
                cb(res.default);
            }
        });
    };

    return module;
});
