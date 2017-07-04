/**
 * @file mip-ajax-carousel 组件
 * @author yan
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var self = this;
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-ajax-params').replace(/'/g, '"'));
        // var content = '<mip-carousel class="mip-ajax-carousel" fiexed-height="3.27rem" autoplay>' + 
        //               '</mip-carousel>'
        fetch(params.url).then(function (res) {
            return res.json();
        }).then(function (data) {
            //  $(element).append(content);
            for(var i = 0;i < data.info.list.length;i++){
               $('.carousel-img' + i).attr('src',data.info.list[i].cover);
            }
        })
    };

    return customElement;
});
