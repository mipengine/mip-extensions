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
        var element = $(this.element),
            url  = element.attr('url'),
            form = $('#'+element.attr('id')+' form'),
            all  = element.find('.mip-all'),
            select = element.find('select');

        select.change(function(){
            form.submit();
        });
        all.click(function(){
            var urlBox = 'http://'+window.location.host+window.location.pathname
            console.log(urlBox)
            window.location.href= urlBox
        })
    };
    return customElement;
});
