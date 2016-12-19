/**
 * @file 快猫影视M版
 * @author wuzhong
 * @time 2016.12.16
 */

define(function(require) {

  // mip 组件开发支持 zepto
  var $ = require('zepto');
  var ys_effect = require('./mip-km-ys-effect');

  // 左右滚动模块
  require(['./plugin/iscroll'],function(iscroll){
    var IScroll = iscroll;
    function setScrollWidthHeight(){
      if($(".srcollId").length > 0){
        $(".srcollId").each(function(){
          $(this).find(".srcollCon").width($(this).find(".srcollData").width());
        })
      }
      if($(".srcollId_y").length > 0){
        $(".srcollId_y").each(function(){
          $(this).find(".srcollCon").height($(this).find(".srcollData").height());
        })
      }
    }
    setScrollWidthHeight();

    $(window).bind("resize",function(){
      setScrollWidthHeight();
    })

    $(".srcollId").each(function(){
      new IScroll('#'+$(this).attr("id"),{
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false
      })
    })

    $(".srcollId_y").each(function(){
      new IScroll('#'+$(this).attr("id"),{
        scrollX: false,
        scrollY: true
      })
    })

  });
  // 左右滚动模块

  // 初始化弹窗
  ys_effect.ys_init_popWin();

  // 初始化tab切换
  if($(".tab-plugin").length > 0){
    ys_effect.ys_set_tabPlugin("tab-plugin");
  }
  
  // 初始化更多
  ys_effect.ys_more_arrow();

  // 集数列表
  ys_effect.ys_set_more_data();

  // 回顶
  ys_effect.ys_gototop();

  // 评论锚点
  if($(".picIntro .aCommentBtn").length > 0 && $("#comment").length > 0){
    ys_effect.ys_anchor_link($(".picIntro .aCommentBtn"),$("#comment"));
  }
  
  var customElem = require('customElement').create();

  return customElem;

});