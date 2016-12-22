/**
 * @file mip-showmore
 * @author yml
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function get_more(btn, wrap, wrap_m, h) {
        var obtn = $(btn);
        var owrap = $(wrap);
        var h = parseInt(h, 10);
        var owrap_m = owrap.find(wrap_m);
        var owrap_h = owrap_m.outerHeight(true) + 25;
        if (owrap_m.outerHeight(true) <= h) {
            obtn.hide();
        }
        else {
            owrap_m.addClass('threeline');
        }
        var flag = true;
        obtn.click(function () {
            if (flag) {
                owrap_m.removeClass('threeline');
                owrap.css('max-height', owrap_h);
                obtn.html('<span>收起<em class="arr arr-top"></em></span>');
            }
            else {
                owrap_m.addClass('threeline');
                owrap.css('max-height', h + 20);
                obtn.html('<span>全部<em class="arr"></em></span>');
            }
            flag = !flag;
        });
    }

    customElem.prototype.build = function () {
        get_more('.video-wrap .get-more', '.video-wrap .introd', '.introd-wrap', '85'); // 视频
    };
    return customElem;
});
