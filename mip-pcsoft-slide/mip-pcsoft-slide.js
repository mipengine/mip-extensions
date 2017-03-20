/**
* fixed nav
* @file fixed nav component
* @author 873920193@qq.com
* @version 1.0
* @copyright 2016 onlinedown.net, Inc. All Rights Reserved
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function init() {
        $('.num').click(function () {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
            if ($(this).hasClass('num1')) {
                $('.tab-one').show();
                $('.tab-two').show();
            }
            else if ($(this).hasClass('num2')) {
                $('.tab-one').hide();
                $('.tab-two').show();
            }
            else if ($(this).hasClass('num3')) {
                $('.tab-one').hide();
                $('.tab-two').hide();
            }
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
