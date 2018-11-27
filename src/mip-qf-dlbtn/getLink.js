/**
 * @file 处理下载逻辑相关参数返回值
 * @author w_peach
 */

define(function (require) {
    var util = require('util');

    /**
     * 根据平台返回的下载链接
     * @param {Object} options 参数对象
     * @return {string} 下载链接
     */
    function getLink(options) {
        if (Object.getOwnPropertyNames(options).length === 0) {
            return 'javascript: void(0)';
        }

        // 默认路径
        var link = options.href;

        if (options.isBp === '1') {
            // 越狱包
            if (util.platform.isBaidu()) {
                // 百度浏览器
                var str = '';
                var arr = [];
                var dlStat;
                var reg = new RegExp('(^| )DOWNLOAD=([^;]*)(;|$)');

                if (arr = document.cookie.match(reg)) {
                    str = unescape(arr[2]);
                }
                dlStat += '&bdboxapp=1&vs=' + str;
                link = '/guide/mbInstruction.shtml?link=' + dlStat;
                setTimeout(function () {
                    link = '/guide/mbInstruction.shtml?link=' + dlStat;
                }, 0);
            } else {
                link = '/guide/usInstruction.shtml?link=';
            }
        }

        return link;
    }

    return getLink;
});
