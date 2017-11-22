/**
 * @file mip-fj-countdown 组件
 *
 * @author Jason FJ
 * @time 2017.11.21
 */
define(function (require) {

    var customElement = require('customElement').create();

    function countdown(element, endTime, endTip) {

        var nowTime  = new Date().getTime();
        var leftTime = (endTime - nowTime) / 1000;

        if (leftTime > 0) {

            var second = Math.floor(leftTime % 60);
            var minute = Math.floor((leftTime / 60) % 60);
            var hour   = Math.floor((leftTime / 3600) % 24);
            var day    = Math.floor((leftTime / 3600) / 24);

            // 设置对应的时间，没有任何子元素的话会直接将数据输出
            if (element.children.length === 0) {
                element.innerHTML = day + '天 ' + hour + '时 ' + minute + '分 ' + second + '秒';
            }
            else {
                setValue(element, 'countdown-left-day', day);
                setValue(element, 'countdown-left-hour', hour);
                setValue(element, 'countdown-left-minute', minute);
                setValue(element, 'countdown-left-second', second);
            }

            // 1s定时
            setTimeout(function () {
                countdown(element, endTime, endTip);
            }, 1000);

        }
        else {
            // 已结束
            element.innerHTML = endTip;
        }
    }

    function setValue(element, className, val) {
        var obj = element.getElementsByClassName(className);
        if (obj.length > 0) {
            obj[0].innerHTML = val;
        }
    }

    /**
     * [build build函数]
     */
    customElement.prototype.build = function () {

        var element = this.element;
        var endTime = 0;

        if (element.hasAttribute('endtime')) {

            // 获取Y-m-d H:i:s格式结束时间
            var param = element.getAttribute('endtime');
            // 将年月日时分秒每一位都隔开
            var p = param.replace(/\d+(?=-[^-]+$)/, function (a) {
                return parseInt(a, 10) - 1;
            }).match(/\d+/g);

            // 传入了特定时期的Date对象
            var endDate = new Date(p[0], p[1], p[2], p[3], p[4], p[5]);

            // 返回1970年1月1日至今的毫秒数
            endTime = endDate.getTime();

        }
        else if (element.hasAttribute('unixendtime')) {

            // 获取时间戳结束时间
            param = element.getAttribute('unixendtime');

            // 补全时间戳到毫秒数
            // 相差的位数
            var leftLength = 13 - param.length;
            endTime = parseInt(param, 10);
            for (var i = 0; i < leftLength; i++) {
                // 缺一位补一位
                endTime = endTime * 10;
            }

        }

        // 倒计时结束标识
        var endTip = element.hasAttribute('endtip') ? element.getAttribute('endtip').trim() : '已结束';

        // 开始倒计时
        countdown(element, endTime, endTip);

    };

    return customElement;

});
