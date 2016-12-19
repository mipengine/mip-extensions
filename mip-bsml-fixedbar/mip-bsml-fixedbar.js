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

        $(element).on('click', '.mip-bsml-fixed-bar-box-appointment', function () {
            $(element).find('.bsml-form-lay').fadeIn('fast');
            $(element).find('.bsml-form').animate({bottom: '0'}, 'fast');
        });

        $(element).on('click', '.bsml-form-close', function () {
            $(element).find('.bsml-form-lay').hide();
            $(element).find('.bsml-form').animate({bottom: '-800px'}, 'fast');
        });


    };

    return customElement;
});
