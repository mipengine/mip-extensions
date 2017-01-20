/**
 * @file 凤悉服务SDK插件
 *
 * @author houyuxin<houyuxin82@gmail.com>
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var performance = require('performance');

    /**
     * 创建元素回调
     */
    customElement.prototype.createdCallback = function () {
        var $element = $(this.element);
        var production = $element.attr('production');
        var cert = $element.attr('cert');

        // 记录页面加载时间
        performance.on('update', function (timing) {
            if (timing && timing.MIPStart && timing.MIPFirstScreen) {
                window._agl.push(
                    ['begin', timing.MIPStart],
                    ['end', timing.MIPFirstScreen]
                );
            }
        });

        // sdk配置
        window._agl = [];
        window._agl.push(
            ['production', production],
            ['cert', cert],
            ['start', true]
        );
        // 插入script标签
        var scriptNode = document.createElement('script');
        scriptNode.type = 'text/javascript';
        scriptNode.src = 'https://fengxi.bj.bcebos.com/angelia.js';
        document.body.appendChild(scriptNode);
    };

    return customElement;
});
