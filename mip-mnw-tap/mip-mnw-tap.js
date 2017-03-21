/**
 * click switch
 * @file click component
 * @author jdt@mnw.cn
 * @version 1.0
 * @copyright 2016 yiqibazi.com, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function init() {
        $('a[group]').click(function () {
            var gd = $(this).attr('group');
            $('a[group="' + gd + '"]').removeClass('sel');
            $(this).addClass('sel');
            $('dd[group="' + gd + '"]').hide();
            $('dd[group][id="' + $(this).attr('id') + '"]').show();
        });
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
