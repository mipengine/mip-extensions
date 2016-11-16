/**
 * 随机广告插件
 * @version 1.0.0
 */
define(function (require) {

    var $ = require("zepto");
    var customElement = require("customElement").create();

    function e() {
        var t = this.element;
        if (!t.isRender) {
            t.isRender = !0;
            var rank = Math.round(Math.random() * 10);
            var pClass = t.getAttribute('parent-class'); //父级样式
            var pTag = t.getAttribute('parent-tag'); //父级标签
            var cTitleClass = t.getAttribute('children-title-class'); //子级标题样式
            
            var adSrc = t.getAttribute('ad-src'); //广告图片路径
            var adHref = t.getAttribute('ad-href'); //广告链接路径
            
            var ad = $('.' + pClass).children(pTag);
            if (ad.eq(rank).hasClass(cTitleClass)) {
                rank++;
            }
            ad.eq(rank).append('<mip-ad layout="reponsive" width="414" height="80" 
               type="ad-comm"tpl="oneImg" href="' + adHref + '" data-size="1242 180" src="' + adSrc + '" data-title="广告标题"></mip-ad>');
                               
        }
    }
    
    customElement.prototype.build = e;

    return customElement;
})
