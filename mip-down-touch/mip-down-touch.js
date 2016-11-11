/**
 * @file 左右滑动切换
 * @author Zhou
*/
define('mip-plugindemo/mip-down-touch', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        tab(element);
    };

    function tab(element) {
        var hsId = $(element).attr('hsId');
		// console.log(hsId === 0)
        if (hsId == 0) {
            if ($('.xgwz ul li').length > 0) {
                $('.xgwz').show();
            }
			else {
                $('.xgwz').hide();
                $('#tab span').eq(2).hide();
            }
            $(element).find('#tab span').click(function () {
                if ($(this).text() == '\u7b80\u4ecb') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xyc,.cont,#comment,.xgwz,.similar,#tcsyy,.guess,#xgk').show();
                }
				else if ($(this).text() == '\u6559\u7a0b') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xgwz,#comment').show();
                    $('.cont,.xyc,.similar,#tcsyy,#xgk,.guess').hide();
                }
                else if ($(this).text() == '\u8bc4\u8bba') {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    $('.xgwz,.cont,.xyc,.similar,#tcsyy,#xgk,.guess').hide();
                    $('#comment').show();
                }
            });

        }
        else if (hsId == 1) {
            var obj = $(element), oul = obj.find('.tags-main-ul'), oli = oul.find('.tags-main-box'), onavLi = $('#wrapert ul li'), ospan = '<span class="active"></span>', windowW = parseInt($(window).width() - 16);
            oli.width(windowW);
            $('#tags-main').width(windowW);
            for (var i = 1; i < oli.length; i++) {
                ospan += '<span></span>';
            }
            $('.pagenum').html(ospan);
            oul.width(oli.length * oli.width());

            // 点击li
            onavLi.eq(0).addClass('active');
            onavLi.click(function () {
                var i = $(this).index();
                iNow = i;
                bugImg();
                onavLi.eq(i).addClass('active').siblings().removeClass('active');
                oul.css({
                    '-webkit-transform': 'translate3d(' + -windowW * i + 'px, 0px, 0px)'
                });
            });

            // 滑动事件
            var touch = {
                's': [],
                'd': ''
            };
            var iNow = 0;

            oul[0].addEventListener('touchstart', function (e) {
                touch.s[0] = e.targetTouches[0].pageX;
                touch.s[1] = e.targetTouches[0].pageY;
                touch.s[2] = (new Date()).getTime();
            }, false);

            // 滑动过程
            oul[0].addEventListener('touchmove', function (e) {
                if (Math.abs(e.targetTouches[0].pageX - touch.s[0]) >= Math.abs(e.targetTouches[0].pageY - touch.s[1]) && touch.d == '') {
                    touch.d = 1; // 左右
                }
                else if (touch.d == '') {
                    touch.d = 0; // 上下或者偏上下
                }
                if (touch.d == 1) { // 左右滚动
                    e.preventDefault();
                    oul.css({
                        '-webkit-transform': 'translate3d(' + -(windowW * iNow - e.targetTouches[0].pageX + touch.s[0]) + 'px, 0px, 0px)'
                    });
                }
            }, false);

            oul[0].addEventListener('touchend', function (e) {
                if (touch.d == 1) {
                    if ((new Date()).getTime() - touch.s[2] > 700) {
                        if (e.changedTouches[0].pageX - touch.s[0] > windowW / 3) {
                            auto('right');
                        }
                        else if (touch.s[0] - e.changedTouches[0].pageX > windowW / 3) {
                            auto('left');
                        }
						else {
                            auto('reset');
                        }
                    }
					else {
                        if (e.changedTouches[0].pageX > touch.s[0]) {
                            auto('right');
                        }
                        else if (touch.s[0] > e.changedTouches[0].pageX) {
                            auto('left');
                        }
                    }
                }
                touch.d = '';
            }, false);

            // 运动函数
            function auto(dir) {
                if (dir == 'left') {
                    iNow >= oli.length - 1 ? iNow == oli.length - 1 : iNow++;
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }
                else if (dir == 'reset') {
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }
                else if (dir == 'right') {
                    iNow <= 0 ? iNow = 0 : iNow--;
                    oul.animate({
                        '-webkit-transform': 'translate3d(' + -windowW * iNow + 'px, 0px, 0px)'
                    });
                }
                bugImg();
                $('.pagenum span').eq(iNow).addClass('active').siblings().removeClass('active');
                $('.guess-nav li').eq(iNow).addClass('active').siblings().removeClass('active');
            }

            // 解决横向滚动图片无法出现
            $('#wrapper2')[0].addEventListener('touchend', function (e) {
                bugImg();
            }, false);
            $('#wrapper4')[0].addEventListener('touchend', function (e) {
                bugImg();
            }, false);

            // bug
            function bugImg() {
                setTimeout(function () {
                    $('body').scrollTop($('body').scrollTop() + 1).scrollTop($('body').scrollTop() - 1);
                }, 150);
            }
        }
    } // 生命周期 function list，根据组件情况选用 end
    return customElem;
});
require(['mip-plugindemo/mip-down-touch'], function (tab) {
    MIP.registerMipElement('mip-down-touch', tab);
});