/**
 * @file mip-back 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
    * 第一次进入可视区回调，只会执行一次
    */
    customElement.prototype.build = function () {
        console.log(123123123)
        // TODO
        function ispc() {
            var userAgentInfo = navigator.userAgent;
            var Agents = [
                'Android',
                'iPhone',
                'SymbianOS',
                'Windows Phone',
                'iPad',
                'iPod'
            ];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        if (ispc()) {
            // pc端
            if (window.top.location.href.indexOf('//m.') !== -1) {
                window.top.location.href = window.top.location.href.replace('m.', 'www.');
            }
        }
    };
    return customElement;
});
