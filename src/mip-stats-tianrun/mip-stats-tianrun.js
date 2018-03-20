/**
 * @file 天润统计
 *
 * @author wangpei
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    
    customElement.prototype.build = function () {
        var _this = this;

        util.css(_this.element, 'display', 'none');

        // 获取节点数据，默认以原来数据提交
        var sub = _this.element.getAttribute('sub') || 'cl2';
        var z = _this.element.getAttribute('z') || '26';

        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = '//' + sub + '.webterren.com/webdig.js?z=' + z;
        _this.element.appendChild(node);

        node.onload = function() {
            var node2 = document.createElement('script');
            node2.type = 'text/javascript';
            node2.innerHTML = 'wd_paramtracker("_wdxid=000000000000000000000000000000000000000000");';
            _this.element.appendChild(node2);
        };
    }
    return customElement;

});
