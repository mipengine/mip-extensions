/**
* 百度统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {
        var _element = this.element;

        var token = _element.getAttribute('token');

        var $_element = $(_element);
        var html = [
            '<script type="text/javascript">',
                'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?'+token+'"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();',
            '</script>'
        ];

        $_element.append(html.join(''));
    }

    return customElement;
});
