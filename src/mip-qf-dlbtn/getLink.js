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
        var link;

        // 默认路径
        link = options.apkHref;

        if (util.platform.isIos()) {

            link = options.ipaHref;

            if (options.isBp === 'Y') {
                // 越狱包
                if (util.platform.isBaidu()) {
                    // 百度浏览器
                    link = options.ipaPrefixMb;
                } else {
                    link = options.ipaPrefixNomb;
                }
            }

            // 官方包
            if (options.asoTest === 'Y') {
                link = options.gameHref;
            }

            return link;
        }

        return link;
    }

    return getLink;
});
