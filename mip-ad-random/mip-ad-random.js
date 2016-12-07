/**
 * @file 随机广告插件
 * @author weiling(741999251@qq.com)
 * @version 1.0.0
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var t = this.element;
    function e() {
        getadress();
    }
    function getadress() {
        var allLocation = $('mip-ad-random').data('parents');
        var bigLocation = $('.' + allLocation);
        var arrylength1 = bigLocation.length;
        var randnum = Math.ceil(Math.random() * arrylength1) - 1;
        var rank = bigLocation[randnum];
        var rchildren = $(rank).children();
        var arrylength2 = rchildren.length;
        var randnum2 = Math.ceil(Math.random() * arrylength2) - 1;
        var rank2 = rchildren[randnum2];
        var adsrc = t.getAttribute('ad-src');
        var adhref = t.getAttribute('ad-href');
        var adTitle = t.getAttribute('ad-title');
        var adClass = t.getAttribute('ad-class');
        var adWidth = t.getAttribute('ad-width');
        var adHeight = t.getAttribute('ad-height');
        var advet = '<mip-ad layou="reponsive" width="' + adWidth + '" height="' + adHeight + '" '
        + 'type="ad-comm" tpl="oneImg" class="' + adClass + '" href="' + adhref + '" '
        + 'data-size="1242 180" src="' + adsrc + '" data-title="' + adTitle + '"></mip-ad>';
        if (arrylength2 === 0) {
            $(rank).append(advet);
        }
        else {
            $(rank2).after(advet);
        }
    }
    customElement.prototype.build = e;
    return customElement;
}
);
