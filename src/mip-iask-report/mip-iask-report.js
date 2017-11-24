/**
* @file 脚本支持
* @author hejieye
* @time  2016-12-07
* @version 1.1.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var openReportDiv = function (elem) {
        $('.report-body').show();
        var questionId = $(elem).attr('questionId');
        var type = $(elem).attr('type');
        var typeId = $(elem).attr('typeId');
        $('.report_id').text(questionId);
        $('.report_type').text(type);
        $('.report_typeId').text(typeId);
    };
    var getRandomNum = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    var abTest = function (a, b, div) {
        var random = $('.randomNum');
        if (!random.text()) {
            random.text(getRandomNum(1, 100));
        }
        if (random.text() > 50) {
            $(div).append(a);
        }
        else {
            $(div).append(b);
        }

    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var elem = this.element;
        var click = $(elem).attr('typeId');
        var type = $(elem).attr('type');
        $('.' + type + '_' + click).on('click',
        function () {
            // 打开举报div
            openReportDiv(elem);
        });
        // ab 测试广告
        var a = $(elem).attr('a');
        var b = $(elem).attr('b');
        var div = $(elem).attr('div');
        if (a && b && div) {
            abTest(a, b, div);
        }
    };
    return customElem;
});
