/**
 * @file 360统计
 *
 * @author suruto
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    
    customElement.prototype.build = function () {
        var _this = this;

        util.css(_this.element, 'display', 'none');

        // 获取节点数据，默认以原来数据提交
        var src = _this.element.getAttribute('src') || 'https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba';
        var id = _this.element.getAttribute('id') || 'sozz';

        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = src;
        node.id = id;
        node.async = true;
        _this.element.appendChild(node);
    }
    return customElement;

});