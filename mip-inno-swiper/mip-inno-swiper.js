/**
 * @file mip-inno-swiper 组件
 * @author
 */

define(function (require) {
    var Swiper = require('./swiper/swiper');
    var customElement = require('customElement').create();
    var $ = require('zepto');



    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var $element = $(this.element);
        var pagination = $element.data('pagination') || 'null';
        var paginationClickable = $element.data('pagination-clickable') || 1;
        var slidesPerView = $element.data('slides-perview') || 1;
        var spaceBetween = $element.data('space-between') || 0;
        var loop = $element.data('loop') || 0;
        var name = $element.data('name') || 0;
        var swiper = new Swiper('.swiper-container' + (name ? ('.' + name) : ''), {
            pagination: '.' + pagination,
            slidesPerView: slidesPerView,
            centeredSlides: true,
            spaceBetween: spaceBetween,
            loop: loop,
            onTransitionEnd: (name === 'cando-swiper') ? cando : null,
            paginationClickable: paginationClickable
        });
    };

    function cando(swiper) {
        if (document.querySelector('ul.cando li.selected')) {
            document.querySelector('ul.cando li.selected').classList.remove('selected');
        }

        document.querySelectorAll('ul.cando li')[swiper.activeIndex - 1].classList.add('selected');

    }

    return customElement;
});
