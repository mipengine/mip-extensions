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
            function GetPosition() {
                    
                    //随机要放入广告的大位置
                    var a = $("mip-ad-random").data("parents"); 
                    var arry1 = $('.' + a);
                    var arry_length1 = arry1.length;
                    var rand_num = Math.ceil(Math.random() * arry_length1) - 1;
                    var rank = arry1[rand_num];

                    //随机子元素放入广告
                    var r_children = $(rank).children();
                    var arry_length2 = r_children.length;
                    var rand_num2 = Math.ceil(Math.random() * arry_length2) - 1;
                    var rank2 = r_children[rand_num2];
                    var adSrc = t.getAttribute('ad-src'); //广告图片路径
                    var adHref = t.getAttribute('ad-href'); //广告链接路径
                    var adTitle = t.getAttribute('ad-title'); //广告标题
                    var adClass = t.getAttribute('ad-class'); //广告样式名
                    var adWidth = t.getAttribute('ad-width');//广告所占宽度
                    var adHeight = t.getAttribute('ad-height');//广告所占高度
                    
                    //判断：若大位置没有子元素，就在其里面添加广告，若大位置有子元素，在随机子元素的后面添加广告
                    var advet = '<mip-ad layout="reponsive" width="' + adWidth + '" height="' + adHeight + '"  type="ad-comm"tpl="oneImg" class="' + adClass + '" href="' + adHref + '" data-size="1242 180" src="' + adSrc + '" data-title="' + adTitle + '"></mip-ad>';
                    if (arry_length2 == 0) {
                        $(rank).append(advet);
                    } else {
                        $(rank2).after(advet);
                    }
                }
                GetPosition();
        }
    }
    customElement.prototype.build = e;
    return customElement;
})
