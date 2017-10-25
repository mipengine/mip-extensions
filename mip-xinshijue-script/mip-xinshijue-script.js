/**
 * @file mip-xinshijue-script 新视觉影视页面js
 * @author Jason
 * 2017年10月19日
 */

define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElement.prototype.build = function () {
        var IScroll = require('./js/iscroll');
        this.addEventAction('search_display', function (event, type) {
            if (type && type === 'show') {
                $('.searchPop').show();
            } else {
                $('.searchPop').hide();
            }
        });
        this.addEventAction('moremenu_display', function (event) {
            var headerMenuMoreObj = $('.header .headerMenuMore');
            if (headerMenuMoreObj.css('display') === 'block') {
                removeBodyHidden();
                headerMenuMoreObj.css('display', 'none');
            } else {
                addBodyHidden();
                headerMenuMoreObj.css('display', 'block');
            }
        });
        this.addEventAction('goto_top', function () {
            window.scroll(0, 0);
        });
        var iScrollArr = ['headerMenu', 'first_list_p', 'second_list_p', 'third_list_p', 'fourth_list_p'];
        var iScrollArrLength = iScrollArr.length;
        for (var iScrollI = 0; iScrollI < iScrollArrLength; iScrollI ++) {
            if ($('#' + iScrollArr[iScrollI]).length > 0) {
                new IScroll('#' + iScrollArr[iScrollI], {
                    eventPassthrough: true,
                    scrollX: true,
                    scrollY: false,
                    preventDefault: false
                }).scrollToElement('a.cur:not(:nth-child(1))', 10);
            }
        }
        $(window).bind('resize', function () {
            setScrollWidth();
        });
        $('.middleFeatures,.headerSearchBtn').bind('click', function () {
            addBodyHidden();
            $('.searchPop').show();
            $('.pLinks').show();
            $('.pLinks1').hide();
        });
        $('.cancelInput').live('click', function () {
            removeBodyHidden();
            $('.searchPop').hide();
            $('.searchInput').val('');
        });
        $('.iDelete').live('touchend', function () {
            $('.searchInput').val('');
            $('.iDelete').hide();
            $('.pLinks').show();
            $('.pLinks1').hide();
        });
        $('.pIntroTxtMore').bind('click', function () {
            if ($(this).hasClass('pShowAll')) {
                $(this).removeClass('pShowAll');
            } else {
                $(this).addClass('pShowAll');
            }
        });
        $('.searchInput').bind('input propertychange', function () {
            var kw = $(this).value;
            if (kw) {
                $('.iDelete').show();
                setTimeout(function () {
                    ajax();
                }, 500);
                function ajax() {
                    $.ajax({
                        type: 'get',
                        url: '/wp-api/seachts.php?kw=' + kw + '&list_sm=10',
                        success: function (data) {
                            var jsondata = JSON.parse(data);
                            $('.pLinks1').empty();
                            $('.pLinks').hide();
                            $('.pLinks1').show();
                            if (jsondata.length) {
                                $.each(jsondata, function (index, value) {
                                    var htmls = '<a href="' + value.url + '" target="_self"><span class="sName">';
                                    htmls = htmls + value.title + '</span><span class="sStyle">';
                                    htmls = htmls + value.d_typename + '</span></a>';
                                    $('.pLinks1').append(htmls);
                                });
                            } else {
                                var htmls = '<a href="javascript:0" target="_self" style="text-align:center;">';
                                htmls = htmls + '<span class="sName">没有找到相关数据</span></a>';
                                $('.pLinks1').append(htmls);
                            }
                        }
                    });
                }
            } else {
                $('.iDelete').hide();
                $('.pLinks').show();
                $('.pLinks1').hide();
            }
        });
    };
    function addBodyHidden() {
        $('body').addClass('hidden');
    }
    function removeBodyHidden() {
        $('body').removeClass('hidden');
    }
    function scrollTopShow() {
        var timeID;
        $('body').on('touchmove', function () {
            var t;
            window.onscroll = function () {
                clearTimeout(t);
                t = setTimeout(function () {
                    clearTimeout(timeID);
                    timeID = setTimeout(function () {
                        $('.fixedBtnList').hide();
                    }, 1000);
                }, 100);
            };
        });
        $('body').on('click', function () {
            clearTimeout(timeID);
            timeID = setTimeout(function () {
                $('.fixedBtnList').hide();
            }, 1000);
        });
        $(window).scroll(function () {
            var num = $(this).scrollTop();
            if (num > 100) {
                clearTimeout(timeID);
                $('.fixedBtnList').show();
            } else {
                $('.fixedBtnList').hide();
            }
        });
    }
    function setScrollWidth() {
        $('.srcollId').each(function () {
            $(this).find('.srcollCon').width($(this).find('.srcollData').width());
        });
    }
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    return customElement;
});
