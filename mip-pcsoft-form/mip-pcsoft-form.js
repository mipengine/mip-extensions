/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function init() {
        var ua = navigator.userAgent.toLowerCase();
        $('#basic-addon').click(function (e) {
                e.stopPropagation();
                e.preventDefault();
                var keyword = $('#keyword').val();
                if (keyword === '') {
                    alert('请输入你要找的软件');
                }
                else {
                    if (/iphone|ipad|ipod/.test(ua)) {
                        window.location.href = '/search/iossoft/' + keyword + '.html';
                    }
                    else {
                        window.location.href = '/search/azsoft/' + keyword + '.html';
                    }
                }
            });
        $('#keyword').bind('search', function () {
                var keyword = $('#keyword').val();
                if (keyword === '') {
                    alert('请输入你要找的软件');
                }
                else {
                    if (/iphone|ipad|ipod/.test(ua)) {
                        window.location.href = '/search/iossoft/' + keyword + '.html';
                    }
                    else {
                        window.location.href = '/search/azsoft/' + keyword + '.html';
                    }
                }
            });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
