/**
 * @file downtag component
 * @author 873920193@qq.com
 * @version 1.0
 * @copyright 2016 onlinedown.net, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init() {
        $('em.icon').click(function () {
            if ($(this).hasClass('checkhover')) {
                // 未勾选
                $(this).removeClass('checkhover');
                $('.ptdownload').hide();
                $('.spdownload').show();
                $('.text1').hide();
                $('.text2').show();
            }
            else {
                $(this).addClass('checkhover');
                $('.spdownload').hide();
                $('.ptdownload').show();
                $('.text2').hide();
                $('.text1').show();
            }
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});

