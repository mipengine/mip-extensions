/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 14:35
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var module = {};
    var site = ['google.', 'baidu.', 'soso.', 'so.', '360.', 'yahoo.', 'youdao.', 'sogou.', 'gougou.'];
    var $ = require('zepto');

    module.back = function (config) {
        config = config || {};

        var doc = document;
        var aSites = config.site || site;
        var historyUrl = doc.referrer;
        var navigatehref = doc.getElementById('navigatehref') || {};

        if (!navigatehref) {
            return;
        }

        historyUrl = historyUrl.toLowerCase(); // 转为小写

        for (var i in aSites) {
            if (historyUrl.indexOf(aSites[i]) > 0) {
                navigatehref.href = '/list/3830/';
                break;
            }
            else {
                navigatehref.href = 'javascript:history.go(-1);';
            }
        }
    };

    module.nav = function () {
        var $navigate01 = $('.navigate01-nav');
        var $btnMenu = $('.ico-navigate-menu');
        var $btnUp = $('.ico-collapse-up');

        var toggle = function () {
            if ($navigate01.css('display') === 'none') {
                $navigate01.show();
            }
            else {
                $navigate01.hide();
            }
        };

        $btnMenu.click(toggle);
        $btnUp.click(toggle);
    };

    module.follow = function () {
        var ele = $('.follow-num');

        var num = Math.floor(10000 + Math.random() * (100000 - 10000));
        ele.text(num);
    };

    return module;
});

