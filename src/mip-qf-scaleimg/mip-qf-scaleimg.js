/**
 * @file mip-qf-scaleimg 组件
 * @author
 */

define(function (require) {
    'use strict';

    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var scaleWidth = component.getAttribute('scale-width') ? component.getAttribute('scale-width') : '85%';
        var scaleHeight = component.getAttribute('scale-height') ? component.getAttribute('scale-height') : '75%';
        var shadeBox = document.createElement('div');
        var html = '<mip-img src="https://m.119you.com/upload/resources/image/2018/08/06/1021145_500x500.jpg?1533543533000" class="scale-img">';

        shadeBox.innerHTML = html;
        shadeBox.classList.add('shade-box');

        $('body').append(shadeBox); // 查看大图遮罩

        $('.origin-img-box mip-img').each(function (i) {
            $(this).click(function () {
                var src = this.getAttribute('src');
                $('.shade-box mip-img').attr('src', src);
                $('.shade-box').fadeIn('slow');
                $('.scale-img').animate({
                    width: scaleWidth,
                    height: scaleHeight,
                    opacity: '1'
                }, '3500');
            });
        });

        $('.shade-box').on('click', function () {
            $('.scale-img').animate({
                width: '0',
                height: '0',
                opacity: '0'
            }, '3500');
            $(this).fadeOut('slow');
        });
    };

    return customElement;
});

