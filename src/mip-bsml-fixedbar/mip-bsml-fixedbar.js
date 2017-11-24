/**
 * @file mip-bsml-fixed-bar 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('jquery');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var me = this;
        var element = me.element;
        var wHeight = $(window).height();

        $(element).on('click', '.mip-bsml-fixed-bar-box-appointment', function () {
            $(element).find('.bsml-form-lay').fadeIn('fast').css({'height': wHeight});
            $(element).find('.bsml-form').animate({bottom: '0'}, 'fast');
            $(document).on('scroll touchmove', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        $(element).on('click', '.bsml-form-close', function () {
            $(element).find('.bsml-form-lay').hide();
            $(element).find('.bsml-form').animate({bottom: '-800px'}, 'fast');
            $(document).off('scroll touchmove');
        });
    };

    return customElement;
});
