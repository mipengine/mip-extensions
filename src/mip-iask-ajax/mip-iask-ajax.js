/**
* @file 脚本支持
* @author  hejieye
* @time  2016-12-13
* @version 1.0.6
*/
define(function (require) {

    var $ = require('zepto');
    var viewer = require('viewer');
    var customElem = require('customElement').create();
    var checkLogin = function (url, params, isLogin, div, type) {
        var json = $.parseJSON(params);
        if (isLogin) {
            // 验证是否登录
            var checkLoginUrl = 'https://mipp.iask.cn/checkLogin?mip=' + Math.random();
            $.get(checkLoginUrl,
            function (e) {
                if (e === null || e === 'null') {
                    // 跳转到登录页面
                    var thisHref = window.location.href;
                    if (viewer.isIframed) {
                        viewer.sendMessage('mibm-jumplink', {
                            'url': 'https://mipp.iask.cn/login?source=' + thisHref
                        });
                    }
                    else {
                        window.location.href = 'https://mipp.iask.cn/login?source=' + thisHref;
                    }
                }
                else {
                    ajaxPost(url, json, div, type);
                }
            });
        }
        else {
            ajaxPost(url, json, div, type);
        }

    };
    var ajaxPost = function (url, params, div, type) {
        $.post(url, params,
        function (data) {
            var res = $.parseJSON(data);
            if (type === '1') {
                if (res.succ === 'Y' && res.jsonData === '1') {
                    var txt = $(div);
                    txt.text(parseInt(txt.text(), 0) + 1);
                }
            }
        });
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {

        var elem = this.element;
        var url = $(elem).attr('url');
        var params = $(elem).attr('data');
        var isLogin = $(elem).attr('isLogin');
        var click = $(elem).attr('click');
        var type = $(elem).attr('type');
        var div = $(elem).attr('div');
        $(click).on('click', function () {
            checkLogin(url, params, isLogin, div, type);
        });

    };

    return customElem;
});
