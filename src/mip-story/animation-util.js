/**
 *  @file 一些用户动画处理的工具函数
 */

define(function(require) {

    function timeStrFormat (time) {
        var match;
        var num;
        var units;

        if (!time) {
            return 0;
        }
        // 兼容线上传纯数字的情况；
        time = (/^[0-9]*$/).test(+time) ? (time + 'ms') : time;
        match = time.toLowerCase().match(/^([0-9\.]+)\s*(s|ms)$/);

        if (!match) {
            return 0;
        }

        num = match[1];
        units = match[2];

        if (match && match.length === 3 && (units === 's' || units === 'ms')) {
            return units === 's' ? parseFloat(num) * 1000 : parseInt(num, 10);
        }
    }

    return {
        timeStrFormat: timeStrFormat
    }

});