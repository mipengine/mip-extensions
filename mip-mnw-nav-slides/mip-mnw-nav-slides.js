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
        (function() {
            $('#imenu').click(function() {
                var isshow = $('#nav-global').css('display');
                if (isshow == 'none') {
                    $('#nav-global').show('2000');
                }else{
                    $('#nav-global').hide();
                }
            });
        }());
    }
    customElem.prototype.build = function () {
        init();
    };
    return customElem;
});
