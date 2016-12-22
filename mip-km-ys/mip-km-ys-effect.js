/**
 * @file 快猫影视M版
 * @author wuzhong
 * @time 2016.12.16
 */
define(function (require) {
    return {
        ysSetTabPlugin: function (className) {      //  tab切换
            $("." + className + "-tab").live("tap",function(){
                var pluginTabArr = $(this).parent().find("." + className + "-tab");
                var pluginConArr = $(this).parents("." + className).find("." + className + "-con");
                pluginConArr.css('display', 'none');
                pluginTabArr.removeClass('cur');
                pluginConArr.eq(pluginTabArr.index($(this))).css('display', 'block');
                $(this).addClass('cur');
            })
        },
        ysGototop: function (options) {             // 回顶按钮
            var defaults = {
                className: 'gotoTop',
                hideTopNum: 100,
                showTime: 2000
            };
            var optionsObj = $.extend(defaults, options);
            var scrollTopNum = 0;
            var gototopTimeId;
            var obj = $('.' + optionsObj.className);
            showGototop();

            $(window).on('scroll', function () {
                showGototop();
            });

            obj.on('mousedown', function () {
                $(window).scrollTop(0);
            });

            $('body').on('touchmove', function () {
                showGototop();
                clearTimeout(gototopTimeId);
            });

            $('body').on('touchend', function () {
                gototopTimeId = setTimeout(function () {
                    obj.css('display', 'none');
                }, optionsObj.showTime);
            });

            function showGototop() {
                scrollTopNum = $('body').scrollTop();
                if (scrollTopNum >=  optionsObj.hideTopNum) {
                    obj.css('display', 'block');
                }
                else {
                    obj.css('display', 'none');
                }
            }
        },
        ysInitPopWin: function () {                  //  初始化弹窗
            var popWinMaskObj;
            var popWinName;
            $('.show_popWin').live('mousedown', function () {
                popWinName = $(this).attr('popWinName');
                if (popWinMaskObj === undefined) {
                    popWinMaskObj = $('.popWinMask');
                }
                $('.popWinMask .popWin').removeClass('popWin_transition');
                popWinMaskObj.addClass('popWinMask_transition');
                $('.popWinMask .popWin[popWinName="' + popWinName + '"]').addClass('popWin_transition');
                $('.hide_popWin[popWinName="' + popWinName + '"]').on('mouseup', function () {
                    $('.popWinMask .popWin').removeClass('popWin_transition');
                    setTimeout(function () {
                        popWinMaskObj.removeClass('popWinMask_transition');
                    }, 100);
                });
            });
        },
        ysShowPopWin: function (obj) {                // 显示弹窗
            obj.parent().addClass('popWinMask_transition');
            obj.addClass('popWin_transition');
        },
        ysHidePopWin: function (obj) {                //   关闭弹窗
            obj.removeClass('popWin_transition');
            setTimeout(function () {
                obj.parent().removeClass('popWinMask_transition');
            }, 100);
        },
        ysMoreArrow: function () {                     //    展开箭头更多
            $('.g_more_arrow_all').live('touchend', function () {
                if ($(this).hasClass('g_more')) {
                    $(this).removeClass('g_more');
                }
                else {
                    $(this).addClass('g_more');
                }
                return false;
            });

            $('.g_more_arrow_btn .g_more_arrow').live('mousedown', function () {
                if ($(this).parent().hasClass('g_more')) {
                    $(this).parent().removeClass('g_more');
                }
                else {
                    $(this).parent().addClass('g_more');
                }
            });
        },
        ysSetMoreData: function () {                    //  更多数据展开
            $('.show-more-btn').live('mousedown', function () {
                $(this).siblings('.more-data').find('.hide').addClass('show').removeClass('hide');
                $(this).addClass('hide').removeClass('show').siblings('.hide').addClass('show').removeClass('hide');
            });
            $('.hide-more-btn').live('mousedown', function () {
                $(this).siblings('.more-data').find('.show').addClass('hide').removeClass('show');
                $(this).addClass('hide').removeClass('show').siblings('.hide').addClass('show').removeClass('hide');
            });
        },
        ysAnchorLink: function (btnObj, targetObj) {        //   设置锚点
            btnObj.live('mousedown', function () {
                var mTopNum = Math.ceil(targetObj.css('marginTop'));
                $('body').scrollTop(targetObj.position().top - $('header').height() + mTopNum  + 1);
            });
        },
        ysScrollTopPlugin: function (options) {           //   滚顶回调效果
            var scrollTopBefore;
            var yNum;
            var yTempNum;
            $('body').on('touchstart', function (e) {
                yTempNum = e.touches[0].pageY;
                scrollTopBefore = document.documentElement.scrollTop || document.body.scrollTop;
            });

            $('body').on('touchmove', function (e) {
                yNum = e.touches[0].pageY - yTempNum;
            });

            $('body').on('touchend', function (e) {
                if (yNum > 30 && scrollTopBefore === 0) {
                    scrollTopFun();
                }
            });

            var scrollTopFun = function () {
                if (options.reload) {
                    window.location.reload();
                }
                options.callbackFun();
            };
        },
        ysScrollBottomPlugin: function (options) {                //   滑底回调
            var scrollTop;
            var scrollHeight = document.body.scrollHeight;
            var windowHeight = document.body.clientHeight;
            var windowScrollTimeId;
            var scrollBottomFun = function () {
                scrollHeight = document.body.scrollHeight;
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrollTop + windowHeight >= scrollHeight) {
                    options.callbackFun();
                }
            };
            $(window).on('scroll', function () {
                clearTimeout(windowScrollTimeId);
                windowScrollTimeId = setTimeout(scrollBottomFun, 200);
            });
            $(window).on('resize', function () {
                scrollHeight = document.body.scrollHeight;
                windowHeight = document.body.clientHeight;
            });
        },
        ysSildeFocusPlugin: function (options) {                  //    滑屏切换焦点图
            var defaults = {
                startNum: 1,
                tabNum: false,
                arrowBtn: false,
                autoPlay: true,
                leftArrowBtnClass: 'leftBtn',
                rightArrowBtnClass: 'rightBtn',
                tabClassName: 'tabList',
                conClassName: 'conList',
                selectClass: 'cur',
                animateTime: 500,
                autoPlayTime: 5000,
                zIndex: 10,
                angleNum: 2,
                tabTagName: 'i'
            };
            var optionsObj = $.extend({}, defaults, options);
            var startTouchX = 0;
            var endTouchX = 0;
            var startTouchY = 0;
            var endTouchY = 0;
            var thisObj = $('.' + optionsObj.id);
            var tabConArr = thisObj.children('.' + optionsObj.conClassName).eq(0).children('.con');
            var tabAllNum = tabConArr.length;
            var tabTagArr;
            var tabTagHtml = '';
            var nextNum = optionsObj.startNum - 1 >= tabAllNum ? tabAllNum - 1 : optionsObj.startNum - 1;
            var prevNum = 0;
            var autoPlayTimeId;
            var animation = false;
            var nextBeginValue = 0;
            var prevEndValue = 0;

            function init() {
                tabTagHtml = '';
                if (!optionsObj.tabNum) {
                    for (var i = 1; i <= tabAllNum; i++) {
                        tabTagHtml += '<i></i>';
                    }
                    thisObj.children('.' + optionsObj.tabClassName).eq(0).html(tabTagHtml);
                    tabTagArr = thisObj.children('.' + optionsObj.tabClassName).eq(0).children();
                }
                else {
                    tabTagArr = thisObj.children('.' + optionsObj.tabClassName).eq(0).children(options.tabTagName);
                }
                tabConArr.eq(nextNum).css({'z-index': optionsObj.zIndex, 'display': 'block'});
                tabTagArr.eq(nextNum).addClass(optionsObj.selectClass);
                if (optionsObj.arrowBtn) {
                    thisObj.children('.' + optionsObj.leftArrowBtnClass).on('click', function () {
                        prev();
                    });
                    thisObj.children('.' + optionsObj.rightArrowBtnClass).on('click', function () {
                        next();
                    });
                }
                if (optionsObj.autoPlay) {
                    startAutoPlay();
                }
            }

            function touchstart(event) {
                endTouchX = startTouchX = 0;
                startTouchX = event.touches[0].pageX;
                startTouchY = event.touches[0].pageY;
            }
            function touchmove(event) {
                endTouchX = event.touches[0].pageX;
                endTouchY = event.touches[0].pageY;
                if (Math.abs(endTouchX - startTouchX) > Math.abs(optionsObj.angleNum * (endTouchY - startTouchY))) {
                    event.preventDefault();
                }
            }
            function touchend(event) {
                var num = Math.abs(endTouchX - startTouchX) > Math.abs(optionsObj.angleNum * (endTouchY - startTouchY));
                if (endTouchX !== 0 && !animation && num) {
                    if (endTouchX > (startTouchX + 15)) {
                        prev();
                    }
                    else if ((endTouchX + 15) < startTouchX) {
                        next();
                    }
                }
            }

            function next() {
                if (!animation) {
                    prevNum = nextNum;
                    if (nextNum === tabAllNum - 1) {
                        nextNum = 0;
                    }
                    else {
                        nextNum += 1;
                    }
                    nextBeginValue = '100%';
                    prevEndValue = '-100%';
                    slide();
                }
            }

            function prev() {
                if (!animation) {
                    prevNum = nextNum;
                    if (nextNum === 0) {
                        nextNum = tabAllNum - 1;
                    }
                    else {
                        nextNum -= 1;
                    }
                    nextBeginValue = '-100%';
                    prevEndValue = '100%';
                    slide();
                }
            }

            function slide() {
                if (optionsObj.customFunBefore != null) {
                    optionsObj.customFunBefore(tabAllNum, prevNum, nextNum);
                }
                if (optionsObj.autoPlay) {
                    stopAutoPlay();
                }
                tabConArr.eq(nextNum).css({
                    '-webkit-transform': 'translateX(' + nextBeginValue + ')',
                    '-moz-transform': 'translateX(' + nextBeginValue + ')',
                    '-o-transform': 'translateX(' + nextBeginValue + ')',
                    'transform': 'translateX(' + nextBeginValue + ')',
                    '-webkit-transition-duration': optionsObj.animateTime + 'ms',
                    '-moz-transition-duration': optionsObj.animateTime + 'ms',
                    '-o-transition-duration': optionsObj.animateTime + 'ms',
                    'transition-duration': optionsObj.animateTime + 'ms',
                    'z-index': optionsObj.zIndex,
                    'display': 'block'
                });
                tabConArr.eq(prevNum).css({
                    '-webkit-transform': 'translateX(0)',
                    '-moz-transform': 'translateX(0)',
                    '-o-transform': 'translateX(0)',
                    'transform': 'translateX(0)',
                    '-webkit-transition-duration': optionsObj.animateTime + 'ms',
                    '-moz-transition-duration': optionsObj.animateTime + 'ms',
                    '-o-transition-duration': optionsObj.animateTime + 'ms',
                    'transition-duration': optionsObj.animateTime + 'ms',
                    'z-index': optionsObj.zIndex - 1,
                    'display': 'block'
                });
                tabTagArr.eq(nextNum).addClass(optionsObj.selectClass);
                tabTagArr.eq(prevNum).removeClass(optionsObj.selectClass);
                setTimeout(animateRun, 10);
            }

            function animateRun() {
                animation = true;
                tabConArr.eq(nextNum).css({
                    '-webkit-transform': 'translateX(0)',
                    '-moz-transform': 'translateX(0)',
                    '-o-transform': 'translateX(0)',
                    'transform': 'translateX(0)'
                });
                tabConArr.eq(prevNum).css({
                    '-webkit-transform': 'translateX(' + prevEndValue + ')',
                    '-moz-transform': 'translateX(' + prevEndValue + ')',
                    '-o-transform': 'translateX(' + prevEndValue + ')',
                    'transform': 'translateX(' + prevEndValue + ')'
                });
                setTimeout(function () {
                    animation = false;
                    tabConArr.eq(nextNum).css({
                        '-webkit-transition-duration': '0s',
                        '-moz-transition-duration': '0s',
                        '-o-transition-duration': '0s',
                        'transition-duration': '0s',
                        'z-index': options.zIndex,
                        'display': 'block'
                    });
                    tabConArr.eq(prevNum).css({
                        '-webkit-transition-duration': '0s',
                        '-moz-transition-duration': '0s',
                        '-o-transition-duration': '0s',
                        'transition-duration': '0s',
                        'z-index': optionsObj.zIndex - 2,
                        'display': 'none'
                    });
                    if (optionsObj.autoPlay) {
                        startAutoPlay();
                    }
                    if (optionsObj.customFunAfter != null) {
                        optionsObj.customFunAfter(tabAllNum, prevNum, nextNum);
                    }
                }, optionsObj.animateTime);
            }

            function startAutoPlay() {
                clearTimeout(autoPlayTimeId);
                autoPlayTimeId = setTimeout(next, optionsObj.autoPlayTime);
            }

            function stopAutoPlay() {
                clearTimeout(autoPlayTimeId);
            }

            thisObj.on('touchstart', function (event) {
                touchstart(event);
            });

            thisObj.on('touchmove', function (event) {
                touchmove(event);
            });

            thisObj.on('touchend', function (event) {
                touchend(event);
            });

            init();
        }


    };
});
