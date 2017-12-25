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
        $(window).scroll(function () {
            var scroH = $(this).scrollTop();
            if (scroH >= 150) {
                $('nav.side-down').addClass('menu_scroll');
            }
            else if (scroH < 150) {
                $('nav.side-down').removeClass('menu_scroll');
            }
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
