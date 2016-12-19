/**
 * @file 快猫影视M版
 * @author wuzhong
 * @time 2016.12.16
 */
define(function(require){
  return{
    ys_set_tabPlugin:function(className){           //tab切换
      $("." + className).each(function(){
        var pluginTabArr = $(this).find("." + className + "-tab"),pluginConArr = $(this).find("." + className + "-con");
        pluginTabArr.on("mousedown",function(){
          pluginConArr.css({"display":"none"});
          pluginTabArr.removeClass("cur");
          pluginConArr.eq(pluginTabArr.index($(this))).css({"display":"block"});
          $(this).addClass("cur");
        })
      })
    },
    ys_gototop:function(options){             //回顶按钮
      var defaults = {
        className:"gotoTop",
        hideTopNum: 100,
        showTime: 2000
      };
      var options = $.extend(defaults,options);
      var scrollTopNum = 0,gototopTimeId,obj = $("." + options.className);
      showGototop();

      $(window).on("scroll",function(){
        showGototop();
      })

      obj.on("mousedown",function(){
        $(window).scrollTop(0);
      })

      $("body").on("touchmove",function(){
        showGototop();
        clearTimeout(gototopTimeId);
      })

      $("body").on("touchend",function(){
        gototopTimeId = setTimeout(function(){
          obj.css("display","none");
        },options.showTime);
      })

      function showGototop(){
        scrollTopNum = $("body").scrollTop();
        
        if(scrollTopNum >=  options.hideTopNum){
          obj.css("display","block");
        }else{
          obj.css("display","none");
        }
      }
      
    },
    ys_init_popWin:function(){                  //初始化弹窗
      var popWinMaskObj,popWinName;
      $(".show_popWin").on("mousedown",function(){
        popWinName = $(this).attr("popWinName");
        setTimeout(function(){
          if(popWinMaskObj == undefined){
            popWinMaskObj = $(".popWinMask");
          }
          $(".popWinMask .popWin").removeClass("popWin_transition");
          popWinMaskObj.addClass("popWinMask_transition");
          $(".popWinMask .popWin[popWinName='" + popWinName + "']").addClass("popWin_transition");
          $(".hide_popWin[popWinName='" + popWinName + "']").on("mouseup",function(){
            $(".popWinMask .popWin").removeClass("popWin_transition");
            setTimeout(function(){
              popWinMaskObj.removeClass("popWinMask_transition");
            },100)
          })
        },10);
        
      })
    },
    ys_showPopWin:function(obj){                //显示弹窗
      obj.parent().addClass("popWinMask_transition");
      obj.addClass("popWin_transition");
    },
    ys_hidePopWin:function(obj){                //关闭弹窗
      obj.removeClass("popWin_transition");
      setTimeout(function(){
        obj.parent().removeClass("popWinMask_transition");
      },100)
    },
    ys_more_arrow:function(){                     //展开箭头更多
      $(".g_more_arrow_all").on("mousedown",function(){
        if($(this).hasClass("g_more")){
          $(this).removeClass("g_more");
        }else{
          $(this).addClass("g_more");
        }
        return false;
      })

      $(".g_more_arrow_btn .g_more_arrow").on("mousedown",function(){
        if($(this).parent().hasClass("g_more")){
          $(this).parent().removeClass("g_more");
        }else{
          $(this).parent().addClass("g_more");
        }
      })
    },
    ys_set_more_data:function(){                    //更多数据展开
      $(".show-more-btn").on("mousedown",function(){
        $(this).siblings(".more-data").find(".hide").addClass("show").removeClass("hide");
        $(this).addClass("hide").removeClass("show").siblings(".hide").addClass("show").removeClass("hide");
      })
      $(".hide-more-btn").on("mousedown",function(){
        $(this).siblings(".more-data").find(".show").addClass("hide").removeClass("show");
        $(this).addClass("hide").removeClass("show").siblings(".hide").addClass("show").removeClass("hide");
      })
    },
    ys_anchor_link:function(btnObj,targetObj){        //设置锚点
      btnObj.on("mousedown",function(){
        $("body").scrollTop(targetObj.position().top - $("header").height() + parseInt(targetObj.css("margin-top"))  + 1);
      })
    },
    ys_scrollTopPlugin:function(options){           //滚顶回调效果
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop,scrollHeight = document.body.scrollHeight,windowHeight = document.body.clientHeight,windowScrollTimeId,scrollTopBefore,yNum,yTempNum;

      
      $("body").on("touchstart",function(e){
        yTempNum = e.touches[0].pageY;
        scrollTopBefore = document.documentElement.scrollTop || document.body.scrollTop;
      })

      $("body").on("touchmove",function(e){
        yNum = e.touches[0].pageY - yTempNum;
      })

      $("body").on("touchend",function(e){
        if(yNum > 30 && scrollTopBefore == 0){
          _scrollTop();
        }
      })

      var _scrollTop = function(){
        if(options.reload){
          window.location.reload();
        }
        options.callbackFun();
      }

    },
    ys_scrollBottomPlugin:function(options){                //滑底回调
      var scrollTop,scrollHeight = document.body.scrollHeight,windowHeight = document.body.clientHeight,windowScrollTimeId;

      $(window).on('scroll',function(){
        clearTimeout(windowScrollTimeId);
        windowScrollTimeId = setTimeout(_scrollBottom,200);
      }); 

      $(window).on('resize',function(){
        scrollHeight = document.body.scrollHeight;
        windowHeight = document.body.clientHeight;
      }); 

      var _scrollBottom = function(){
        scrollHeight = document.body.scrollHeight;
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop + windowHeight >= scrollHeight){
          options.callbackFun();
        }
      }
    },
    ys_sildeFocusPlugin: function(options){                  //滑屏切换焦点图
      var defaults = {
        startNum:1,
        tabNum:false,
        arrowBtn:false,
        autoPlay:true,
        leftArrowBtnClass:"leftBtn",
        rightArrowBtnClass:"rightBtn",
        tabClassName:"tabList",
        conClassName:"conList",
        selectClass:"cur",
        animateTime:500,
        autoPlayTime:5000,
        zIndex:10,
        angleNum:2,
        tabTagName:"i"
      };
      var options = $.extend({},defaults,options);
      var startTouchX = endTouchX = startTouchY = endTouchY = 0,_this = $("#" + options.id),tabConArr=_this.children("."+options.conClassName).eq(0).children(".con"),tabAllNum = tabConArr.length,tabTagArr,tabTagHtml = "",nextNum = options.startNum - 1 >= tabAllNum ? tabAllNum - 1 : options.startNum - 1,prevNum = 0,autoPlayTimeId,animation = false,nextBeginValue=0,prevEndValue=0;

      function init(){
        tabTagHtml = "";
        if(!options.tabNum){
          for(var i=1;i<=tabAllNum;i++){
            tabTagHtml += "<i></i>";
          }
          _this.children("."+options.tabClassName).eq(0).html(tabTagHtml);
          tabTagArr = _this.children("."+options.tabClassName).eq(0).children();
        }else{
          tabTagArr = _this.children("."+options.tabClassName).eq(0).children(options.tabTagName);
        }
        tabConArr.eq(nextNum).css({"z-index":options.zIndex,"display":"block"});
        tabTagArr.eq(nextNum).addClass(options.selectClass);
        if(options.arrowBtn){
          _this.children("."+options.leftArrowBtnClass).on("click",function(){prev();});
          _this.children("."+options.rightArrowBtnClass).on("click",function(){next();});
        }
        if(options.autoPlay){
          startAutoPlay();
        }
      }

      function touchstart(event){
        endTouchX = startTouchX = 0;
        startTouchX = event.touches[0].pageX;
        startTouchY = event.touches[0].pageY;
      }
      function touchmove(event){
        endTouchX = event.touches[0].pageX;
        endTouchY = event.touches[0].pageY;
        if(Math.abs(endTouchX - startTouchX) > Math.abs(options.angleNum*(endTouchY - startTouchY))){
          event.preventDefault();
        }
      }
      function touchend(event){
        if(endTouchX != 0 && !animation && Math.abs(endTouchX - startTouchX) > Math.abs(options.angleNum*(endTouchY - startTouchY))){
          if(endTouchX > (startTouchX + 15)){
            prev();
          }else if((endTouchX + 15) < startTouchX){
            next();
          }
        }
      }

      function next(){
        if(!animation){
          prevNum = nextNum;
          if(nextNum == tabAllNum - 1){
            nextNum = 0;
          }else{
            nextNum ++;
          }
          nextBeginValue = "100%";
          prevEndValue = "-100%";
          slide();
        }
      }

      function prev(){
        if(!animation){
          prevNum = nextNum;
          if(nextNum == 0){
            nextNum = tabAllNum - 1;
          }else{
            nextNum --;
          }
          nextBeginValue = "-100%";
          prevEndValue = "100%";
          slide();
        }
      }

      function slide(){
        if(options.customFunBefore != null){
          options.customFunBefore(tabAllNum,prevNum,nextNum);
        }
        if(options.autoPlay){
          stopAutoPlay();
        }
        tabConArr.eq(nextNum).css({
          "-webkit-transform":"translateX("+nextBeginValue+")",
          "-moz-transform":"translateX("+nextBeginValue+")",
          "-o-transform":"translateX("+nextBeginValue+")",
          "transform":"translateX("+nextBeginValue+")",
          "-webkit-transition-duration":options.animateTime + "ms",
          "-moz-transition-duration":options.animateTime + "ms",
          "-o-transition-duration":options.animateTime + "ms",
          "transition-duration":options.animateTime + "ms",
          "z-index":options.zIndex,
          "display":"block"
        });
        tabConArr.eq(prevNum).css({
          "-webkit-transform":"translateX(0)",
          "-moz-transform":"translateX(0)",
          "-o-transform":"translateX(0)",
          "transform":"translateX(0)",
          "-webkit-transition-duration":options.animateTime + "ms",
          "-moz-transition-duration":options.animateTime + "ms",
          "-o-transition-duration":options.animateTime + "ms",
          "transition-duration":options.animateTime + "ms",
          "z-index":options.zIndex - 1,
          "display":"block"
        });
        tabTagArr.eq(nextNum).addClass(options.selectClass);
        tabTagArr.eq(prevNum).removeClass(options.selectClass);
        setTimeout(animateRun,10);
      }

      function animateRun(){
        animation = true;
        tabConArr.eq(nextNum).css({
          "-webkit-transform":"translateX(0)",
          "-moz-transform":"translateX(0)",
          "-o-transform":"translateX(0)",
          "transform":"translateX(0)"
        });
        tabConArr.eq(prevNum).css({
          "-webkit-transform":"translateX("+prevEndValue+")",
          "-moz-transform":"translateX("+prevEndValue+")",
          "-o-transform":"translateX("+prevEndValue+")",
          "transform":"translateX("+prevEndValue+")"
        });
        setTimeout(function(){
          animation = false;
          tabConArr.eq(nextNum).css({
            "-webkit-transition-duration":"0s",
            "-moz-transition-duration":"0s",
            "-o-transition-duration":"0s",
            "transition-duration":"0s",
            "z-index":options.zIndex,
            "display":"block"
          });
          tabConArr.eq(prevNum).css({
            "-webkit-transition-duration":"0s",
            "-moz-transition-duration":"0s",
            "-o-transition-duration":"0s",
            "transition-duration":"0s",
            "z-index":options.zIndex - 2,
            "display":"none"
          });
          if(options.autoPlay){
            startAutoPlay();
          }
          if(options.customFunAfter != null){
            options.customFunAfter(tabAllNum,prevNum,nextNum);
          }
        },options.animateTime);
      } 

      function startAutoPlay(){
        clearTimeout(autoPlayTimeId);
        autoPlayTimeId = setTimeout(next,options.autoPlayTime);
      }

      function stopAutoPlay(){
        clearTimeout(autoPlayTimeId);
      }

      _this.on("touchstart",function(event){
        touchstart(event);
      })

      _this.on("touchmove",function(event){
        touchmove(event);
      })

      _this.on("touchend",function(event){
        touchend(event);
      })

      init();
      
    }


  };
});