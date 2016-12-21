/**
 * @file 快猫影视M版
 * @author wuzhong
 * @time 2016.12.16
 */

define(function (require) {

    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var ysEffect = require('./mip-km-ys-effect');

    // 左右滚动模块
    require(['./plugin/iscroll'], function (iscroll) {
        var IScroll = iscroll;
        function setScrollWidthHeight() {
            if ($('.srcollId').length > 0) {
                $('.srcollId').each(function () {
                    $(this).find('.srcollCon').width($(this).find('.srcollData').width());
                });
            }
            if ($('.srcollId_y').length > 0) {
                $('.srcollId_y').each(function () {
                    $(this).find('.srcollCon').height($(this).find('.srcollData').height());
                });
            }
        }
        setScrollWidthHeight();

        $(window).bind('resize', function () {
            setScrollWidthHeight();
        });

        $('.srcollId').each(function () {
            new IScroll('.' + $(this).attr('scrollIdName'), {
                eventPassthrough: true,
                scrollX: true,
                scrollY: false,
                preventDefault: false
            });
        });

        $('.srcollId_y').each(function () {
            new IScroll('.' + $(this).attr('scrollIdName'), {
                scrollX: false,
                scrollY: true
            });
        });

    });
    // 左右滚动模块

    // 初始化弹窗
    ysEffect.ysInitPopWin();

    // 初始化tab切换
    if ($('.tab-plugin').length > 0) {
        ysEffect.ysSetTabPlugin('tab-plugin');
    }
    // 初始化更多
    ysEffect.ysMoreArrow();

    // 集数列表
    ysEffect.ysSetMoreData();

    // 回顶
    ysEffect.ysGototop();

    // 评论锚点
    if ($('.picIntro .aCommentBtn').length > 0 && $('.comment-anchor').length > 0) {
        ysEffect.ysAnchorLink($('.picIntro .aCommentBtn'), $('.comment-anchor'));
    }
    var customElem = require('customElement').create();

    return customElem;

});
