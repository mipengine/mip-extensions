
/**
 * @file mip-ajax-button 组件
 *
 * @author chen
 * @time 2018.8.21
 */
define(function (require) {
    var customElement = require('customElement').create();
    var form = require('./mip-product-form-fn');
    customElement.prototype.build = function () {
        var element = this.element;
        form.createDom(element);


        form.initMessageEvents(element);
    };
    return customElement;
});
