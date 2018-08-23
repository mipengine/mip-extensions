/**
 * @file mip-258-form 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');

    customElement.prototype.build = function () {
        var element = this.element;
        var addClearBtn = element.hasAttribute('clear');
        form.createDom(element);

       
    };
    return customElement;
});
