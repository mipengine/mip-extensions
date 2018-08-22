/**
 * @file mip-like 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('jquery');
    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.build = function () {
        // TODO
        // 
        var form = document.getElementById('test_form');
        var element = $(this.element);
        var url = element.attr('url');
        var form = $('#'+element.attr('id')+' form');
        $('.select select').change(function(){
            form.submit();
        });
    };
    return customElement;
});
