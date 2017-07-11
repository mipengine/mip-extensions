/**
 * @file mip-gallery 组件
 * @author
 */

define(function(require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');
    var Swiper = require('./swiper/swiper.jquery');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function() {
        var element = this.element;
        var viewNum = +element.getAttribute('num') || 5;
        var between = +element.getAttribute('between') || 5;
        var mySwiper = new Swiper('.swiper-container', {
            slidesPerView: viewNum,
            spaceBetween: between
        });
    };

    return customElement;
});
