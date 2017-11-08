
/**
* 微友巴巴mip改造 javascript功能插件
* @file 导航条单击展开更多分类
* @date 2016.12.12
* @author dinglei (375234944@qq.com)
* @version 1.0.1
*/

define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();

    function open() {
        $('.icon_open').on('click', function () {
            $('.nav .hide').removeClass('hide');
            $('.icon_open').hide();
            $('.icon_close').show();
            $('.icon_close').css('display', 'block');

            var top = $('.nav').height() + $('.w98').height() + 1;
            $('.container').css('padding-top', top + 'px');
        });
    }

    function close() {
        $('.icon_close').on('click', function () {
            $('.open').addClass('hide');
            $('.icon_open').show();
            $('.icon_close').hide();

            var top = $('.nav').height() + $('.w98').height() + 1;
            $('.container').css('padding-top', top + 'px');
        });
    }

    function init() {
        open();
        close();
    }

    customElem.prototype.build = init;

    return customElem;
});
