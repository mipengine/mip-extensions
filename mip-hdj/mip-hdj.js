/**
 * @file mip-hdj 组件
 * @author
 */

define(function(require) {
    var $ = require('jquery'), viewport = require('viewport');
    var $accor=$('mip-accordion section')
    $accor.click(function () {
        $accor.eq($(this).index()).addClass('active').siblings().removeClass('active').find('ul').removeAttr('aria-expanded')
    })
    $('.search_event').click(function () {
        $('.search').toggleClass('height')
    })

// 页面 scroll 事件
    viewport.on('scroll', function () {
        var scrollTop =  viewport.getScrollTop();
        if(scrollTop>=45){
            $('mip-vd-tabs section').addClass('fixed-top')
            $('mip-vd-tabs>div').css({marginTop:'44px'})
        }else{
            $('mip-vd-tabs section').removeClass('fixed-top')
            $('mip-vd-tabs>div').css({marginTop:''})
        }
    });

    $('.tickets li').click(function () {
        $('.tickets li').eq($(this).index()).addClass('active').siblings().removeClass('active')
        $('.tickets li').find('.bf').slideDown()
        $('.tickets li').find('.af').slideUp()
        $('.tickets li').eq($(this).index()).find('.bf').slideUp()
        $('.tickets li').eq($(this).index()).find('.af').slideDown()
    })
    
    $('.back').click(function () {
        history.back(-1)
    })
});
