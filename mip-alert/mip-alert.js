/**
 * @file mip-alert 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var element = this.element;
        var text = element.getAttribute('alert-text') || '默认alert内容';
        element.onclick = function(){
            alert(text);
        }
    };
    
    return customElement;
});
