/**
 * @file 页面逻辑脚本
 * @author fl
 */
(window.MIP = window.MIP || []).push({
    name: 'mip-news-script',
    func: function () {
        define('mip-news-script/mip-news-script', ['require', 'zepto', 'customElement'], function (t) {
                var e = t('zepto');
                var i = t('customElement').create();
                var r = {
                    nextPage: function () {
                        if (e('body.xspage').length > 0) {
                            if (e('.dbtns a').length > 0) {
                                var xslink = e('.dbtns a').attr('href');
                                var dpt;
                                var browser;
                                if (browser.versions.ios) {
                                    dpt = 'ios';
                                }
                                if (browser.versions.android) {
                                    dpt = 'android';
                                }
                                if (dpt) {
                                    e('.dbtns a').attr('href', xslink + '&device=' + dpt);
                                }
                            }
                            e('.wzlist').append('<div class="newsnext"><a href="' + e('.xgwz li').eq(0).find('a').attr('href') + '">下一页</a></div>');
                        }
                        else {
                            e('.wzlist .con').append('<div class="newsnext"><a href="' + e('.xgwz li').eq(0).find('a').attr('href') + '">下一页</a></div>');
                        }
                    },
                    touchSlide: function (oclass) {
                        oclass = (oclass) ? oclass : '.guess';
                        var n = e(oclass);
                        if (0 !== n.length) {
                            var r = n.find('.tags-main-ul');
                            var o = r.find('.tags-main-box');
                            var s = e('#wrapert ul li');
                            var a = '<span class="active"></span>';
                            var l = parseInt(e(window).width() - 16, 10);
                            var c = {s: [], d: ''};
                            var u = 0;
                            o.width(l), e('#tags-main').width(l);
                            for (var d = 1; d < o.length; d++) {
                                a += '<span></span>';

                            }
                            if (e(oclass).find('.pagenum').html(a), r.width(o.length * o.width()), s.eq(0).addClass('active'), s.click(function () {
                                    var t = e(this).index();
                                    u = t, i(), s.eq(t).addClass('active').siblings().removeClass('active'), r.css({
                                        '-webkit-transform': 'translate3d(' + -l * t + 'px, 0px, 0px)'
                                    });
                                }), r[0].addEventListener('touchstart', function (t) {
                                    c.s[0] = t.targetTouches[0].pageX, c.s[1] = t.targetTouches[0].pageY, c.s[2] = (new Date()).getTime();
                                }, !1), r[0].addEventListener('touchmove', function (t) {
                                    if (Math.abs(t.targetTouches[0].pageX - c.s[0]) >= Math.abs(t.targetTouches[0].pageY - c.s[1]) && '' === c.d) {
                                        c.d = 1;
                                    }
                                    else if ('' === c.d) {
                                        c.d = 0;
                                    }

                                    if (1 === c.d) {
                                        t.preventDefault(), r.css({
                                            '-webkit-transform': 'translate3d(' + -(l * u - t.targetTouches[0].pageX + c.s[0]) + 'px, 0px, 0px)'
                                        });
                                    }

                                }, !1), r[0].addEventListener('touchend', function (e) {
                                    if (1 === c.d) {
                                        if ((new Date()).getTime() - c.s[2] > 700) {
                                            if (e.changedTouches[0].pageX - c.s[0] > l / 3) {
                                                t('right');
                                            }
                                            else if (c.s[0] - e.changedTouches[0].pageX > l / 3) {
                                                t('left');
                                            }
                                            else {
                                                t('reset');
                                            }
                                        }
                                        else if (e.changedTouches[0].pageX > c.s[0]) {
                                            t('right');
                                        }
                                        else if (c.s[0] > e.changedTouches[0].pageX) {
                                            t('left');
                                        }

                                    }

                                    c.d = '';
                                }, !1), e('#wrapper2').length > 0) {
                                e('#wrapper2')[0].addEventListener('touchend', function (t) {
                                    i();
                                }, !1);
                            }

                            if (e('#wrapper4').length > 0) {
                                e('#wrapper4')[0].addEventListener('touchend', function (t) {
                                    i();
                                }, !1);
                            }
                        }
                        function t(t) {
                            if ('left' === t) {
                                u >= o.length - 1 ? o.length : u++, r.animate({
                                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                                });
                            }
                            else if ('reset' === t) {
                                r.animate({
                                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                                });
                            }
                            else if ('right' === t) {
                                u <= 0 ? u = 0 : u--, r.animate({
                                    '-webkit-transform': 'translate3d(' + -l * u + 'px, 0px, 0px)'
                                });
                            }

                            i(), e(oclass).find('.pagenum span').eq(u).addClass('active').siblings().removeClass('active'), e('.guess-nav li').eq(u).addClass('active').siblings().removeClass('active');
                        }
                        function i() {
                            setTimeout(function () {
                                e('body').scrollTop(e('body').scrollTop() + 1).scrollTop(e('body').scrollTop() - 1);
                            }, 150);
                        }
                    },
                    mrtit: function () {
                        function t(t, e) {
                            for (var o = 0; o < t.length; o++) {
                                if (id.indexOf(t[o]) > -1) {
                                    c.html(e);
                                }
                            }
                        }
                        var c = e('.ca');
                        var id = e('body').attr('cid');
                        var r = [631, 632, 633, 634, 636, 694, 695, 696, 697, 700, 727, 728, 729, 730, 731, 732, 733, 734, 735, 797, 798, 799, 800, 801, 806];
                        var o = [830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 802, 803, 804, 805, 807, 808, 809, 810, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 673, 672, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 618, 619, 620, 621, 622, 623, 624, 625, 591, 592, 593, 594, 595, 596, 597, 598, 637, 638, 711, 712, 713, 714, 842, 465, 466, 467, 468, 469, 470, 471, 472, 473, 476, 477, 386, 387, 388, 389, 390, 391, 414, 415, 416, 417, 571, 572, 573, 574, 422, 285, 282, 284, 286, 287, 288, 535, 616, 508, 384, 299, 304, 345, 478, 479, 480, 482, 506, 298, 561, 562, 629, 557];
                        t(r, '网游'), t(o, '单机');
                    },
                    dif: function () {
                        var k = this;
                        var num = 0;

                        function t(t, e) {
                            for (var o = 0; o < t.length; o++) {
                                if (id.indexOf(t[o]) > -1) {
                                    i.each(function () {
                                        $(this).children('div').eq(e).show().siblings().remove();
                                    });
                                    k.rank();
                                    num++;
                                }
                            }
                        }
                        var i = e('.dif');
                        var id = e('body').attr('cid');
                        var ang = [634, 695, 594, 696, 697, 712, 598, 592, 596, 593, 595, 637, 713, 638, 636, 842];
                        var anr = [588, 589, 584, 582, 583, 585, 586, 587, 590, 600, 703, 704, 708, 709, 875, 786, 877, 878, 879, 880, 881, 628, 705, 706, 627, 599];
                        var ig = [797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810];
                        var ir = [776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795];
                        t(ang, 0), t(anr, 1), t(ig, 2), t(ir, 3);
                        return num;
                    },
                    rank: function () {
                        if (e('.rank').length > 0) {
                            var k = this;
                            e('.rank .list').each(function () {
                                e(this).find('li').hide().slice(0, 4).show();
                            });
                            e('.tab-panel ul li').parents('section').children('.tab-content').hide().eq(1).show();
                            e('.tab-panel ul li').click(function () {
                                e(this).parents('section').children('.tab-content').hide().eq(e(this).index()).show();
                                e(this).addClass('active').siblings().removeClass('active');
                                k.loadmore();
                            });
                            k.loadmore();
                        }
                    },
                    loadmore: function () {
                        e('.rank .tab-content').eq(e('.rank .tab-panel li.active').index()).find('.lookmore').click(function () {
                            var hnum = 0;
                            var vnum = 0;
                            for (var i = 0; i < e(this).prev().find('li').length; i++) {
                                if (e(this).prev().find('li').eq(i).css('display') === 'none') {
                                    hnum++;
                                }
                                else {
                                    vnum++;
                                }
                            }
                            if (hnum === 0) {
                                e(this).remove();
                            }
                            else {
                                e(this).prev().find('li').slice(0, vnum + 4).show();
                            }
                        });
                    },
                    show: function () {
                        if (e('#historyver p').length === 0) {
                            e('#historyver').remove();
                        }
                        if (e('#tcsyy li').length === 0) {
                            e('#tcsyy').remove();
                        }
                        if (e('.hot_game a').length === 0) {
                            e('.tjyxph').remove();
                        }
                        if (this.dif() === 0) {
                            e('.rank').remove();
                        }
                    },
                    historyver: function () {
                        var i = e('#historyver');
                        var btn = i.find('.lookmore');
                        btn.parent().children('p').hide().slice(0, 3).show();
                        if (btn.parent().children('p').length < 3) {
                            btn.remove();
                        }
                        btn.click(function () {
                            if (!$(this).hasClass('expand')) {
                                btn.find('span').text('收起内容');
                                btn.parent().children().show();
                            }
                            else {
                                btn.find('span').text('展开全部');
                                btn.parent().children().hide().slice(0, 3).show();
                                btn.show();
                            }
                            $(this).toggleClass('expand');
                        });
                    },
                    tcsyy: function () {
                        if (e('#tcsyy').length > 0) {
                            var li = e('#tcsyy .tags-main-ul > li');
                            var len = li.length;
                            var page = Math.ceil(len / 8);
                            if (len === 0) {
                                e('#tcsyy').remove();
                            }
                            else {
                                if (len < 8) {
                                    e('#tcsyy').find('.pagenum').remove();
                                }
                                for (var i = 0; i < page; i++) {
                                    e('#tcsyy .tags-main-ul > li').slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
                                }
                                if (e('#tags-main1').length > 0) {
                                    this.touchSlide('#tcsyy');
                                }
                            }
                        }
                    },
                    focuswe: function () {
                        if (e('.foucs_dyh').length > 0) {
                            e('body').append('<div class="wefocus_a"><div class="wefocus_a_head"><img src="https://m.pc6.com/public/img/w_pc6.png" alt=""><p><b>PC6手游网</b>随时找攻略，尽情下游戏！</p></div><div class="wefocus_a_way"><b>关注方法</b><dl><dt><i>1</i>打开微信首页点【搜索】</dt><dd><img src="https://m.pc6.com/public/img/u310.png" alt=""></dd></dl><dl><dt><i>2</i>搜索【PC6手游网】即可关注</dt><dd><img src="https://m.pc6.com/public/img/u312.png" alt=""></dd></dl></div><div class="wefocus_btn"><a href="weixin://">打开微信</a></div><div class="wefocus_clo"></div></div><div class="wefocus_bg"></div>');
                            e('.foucs_dyh').click(function () {
                                e('.wefocus_bg').show();
                                e('.wefocus_a').attr('style', '').show().css('margin-top', -e('.wefocus_a').height() / 2 + 'px');
                                e('.wefocus_bg,.wefocus_clo').bind('click', function () {
                                    e('.wefocus_a,.wefocus_bg').hide();
                                });
                            });
                        }
                    },
                    footer: function () {
                        e('.mip_footer ul li.arrow').click(function () {
                            var t = e(this);
                            var o = e('.mip_footer');
                            t.toggleClass('on');
                            if (t.hasClass('on')) {
                                o.animate({'height': '80px'});
                            }
                            else {
                                o.animate({'height': '42px'});
                            }
                        });
                    },
                    init: function () {
                        this.nextPage(), this.tcsyy(), this.dif(), this.mrtit(), this.footer(), this.show(), this.historyver(), this.focuswe();
                    }
                };
                return i.prototype.build = function () {
                    r.init();
                }, i;
            }), define('mip-news-script', ['mip-news-script/mip-news-script'], function (t) {
                return t;
            }),
            (function () {
                function t(t, e) {
                    t.registerMipElement('mip-news-script', e);
                }
                if (window.MIP) {
                    require(['mip-news-script'], function (e) {
                        t(window.MIP, e);
                    });
                }
                else {
                    require(['mip', 'mip-news-script'], t);
                }
            }());
    }
});
