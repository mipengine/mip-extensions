/**
 * @file 凤悉服务SDK插件
 *
 * @author houyuxin<houyuxin82@gmail.com>
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var $element = $(this.element);
        var production = $element.attr('production');
        var cert = $element.attr('cert');
        // sdk配置
        window._agl = [];
        _agl.push(
            ['production', production],
            ['cert', cert],
            ['start', true]
        );
        // 插入script标签
        var scriptNode = document.createElement('script');
        scriptNode.type = 'text/javascript';
        scriptNode.src = 'https://fengxi.bj.bcebos.com/angelia.js';
        scriptNode.async = 'true';
        document.body.appendChild(scriptNode);
    };

    return customElement;
});
