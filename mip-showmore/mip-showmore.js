/**
 * @file mip-showmore
 * @author yml
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function getMore(btn, wrap, wrapm, ht) {
        var obtn = $(btn);
        var owrap = $(wrap);
        var h = parseInt(ht);
        var owrapm = owrap.find(wrapm);
        var wraph = owrapm.height() + 25;
        if (owrapm.height() <= h) {
            obtn.hide();
        }else{
            owrapm.addClass('threeline');
        }
        var flag = true;
        obtn.click(function () {
            if (flag) {
                owrapm.removeClass('threeline');
                owrap.css('max-height', wraph);
                obtn.html('<span>收起<em class="arr arr-top"></em></span>');
            }
            else {
                owrapm.addClass('threeline');
                owrap.css('max-height', h + 20);
                obtn.html('<span>全部<em class="arr"></em></span>');
            }
            flag = !flag;
        });
    }

    customElem.prototype.build = function () {
        getMore('.video-wrap .get-more', '.video-wrap .introd', '.introd-wrap', '85'); // 视频
    };
    return customElem;
});
