/**
 * @file 页面逻辑脚本
 * @author fl
*/
(window.MIP = window.MIP || []).push({
    name: 'mip-down-script',
    func: function () {
        define('mip-down-script/mip-down-script', ['require', 'zepto', 'customElement'], function (t) {
            var e = t('zepto');
            var i = t('customElement').create();
            var n = {versions: (function () {
                        var t = navigator.userAgent;
                        return {
                            ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                            android: t.indexOf('Android') > -1,
                            iPhone: t.indexOf('iPhone') > -1 || t.indexOf('Mac') > -1,
                            iPad: t.indexOf('iPad') > -1,
                            ios9: t.indexOf('iPhone OS 9') > -1,
                            MQQBrowser: t.indexOf('MQQBrowser') > -1,
                            UCBrowser: t.indexOf('UCBrowser') > -1,
                            Safari: t.indexOf('Safari') > -1
                        };
                    }()), language: (navigator.browserLanguage || navigator.language).toLowerCase()};
            var r = {
                    webInfoId: e('#down-href').attr('downid'),
                    webInfoCid: e('#down-href').attr('cid'),
                    webInfoRid: e('#down-href').attr('rid'),
                    platAndroidId: e('#plat_Android').attr('platid'),
                    platAndroidAddress: e('#plat_Android').attr('Address'),
                    platAndroidResSystem: e('#plat_Android').attr('ResSystem'),
                    platAndroidResName: e('#plat_Android').attr('ResName'),
                    platAndroidResVer: e('#plat_Android').attr('ResVer'),
                    platAndroidCid: e('#plat_Android').attr('cid'),
                    platAndroidRid: e('#plat_Android').attr('rid'),
                    platIPhoneId: e('#plat_iPhone').attr('platid'),
                    platIPhoneAddress: e('#plat_iPhone').attr('Address'),
                    platIPhoneResSystem: e('#plat_iPhone').attr('ResSystem'),
                    platIPhoneResName: e('#plat_iPhone').attr('ResName'),
                    platIPhoneResVer: e('#plat_iPhone').attr('ResVer'),
                    platIPhoneCid: e('#plat_iPhone').attr('cid'),
                    platIPhoneRid: e('#plat_iPhone').attr('rid'),
                    assid: parseInt(e('#info #Associate').html(), 10),
                    mrtit: function () {
                        function t(t, e, r) {
                            for (var o = 0; o < t.length; o++) {
                                if (n.indexOf(t[o]) > 0) {
                                    i.html(e).attr('href', r), c.html(e).attr('href', r);
                                }
                            }
                        }
                        var i = e('#cataName');
                        var n = i.attr('href');
                        var c = e('.ca');
                        var r = [631, 632, 633, 634, 636, 694, 695, 696, 697, 700, 727, 728, 729, 730, 731, 732, 733, 734, 735, 797, 798, 799, 800, 801, 806];
                        var o = [830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 802, 803, 804, 805, 807, 808, 809, 810, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 673, 672, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 618, 619, 620, 621, 622, 623, 624, 625, 591, 592, 593, 594, 595, 596, 597, 598, 637, 638, 711, 712, 713, 714, 842, 465, 466, 467, 468, 469, 470, 471, 472, 473, 476, 477, 386, 387, 388, 389, 390, 391, 414, 415, 416, 417, 571, 572, 573, 574, 422, 285, 282, 284, 286, 287, 288, 535, 616, 508, 384, 299, 304, 345, 478, 479, 480, 482, 506, 298, 561, 562, 629, 557];
                        i.html('软件').attr('href', 'http://m.pc6.com/ruanj.html'), t(r, '网游', 'http://m.pc6.com/wangyou.html'), t(o, '单机', 'http://m.pc6.com/youxi.html');
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
                                    k.tipsmore(e);
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
                    tipsmore: function (index) {
                        var i = e('#dcatetory');
                        var html = [
                            '<a href="http://m.pc6.com/x/Catalogid/634/2/">角色扮演</a><a href="http://m.pc6.com/x/Catalogid/695/2/">动作游戏</a><a href="http://m.pc6.com/x/Catalogid/594/2/">益智休闲</a><a href="http://m.pc6.com/x/Catalogid/696/2/">卡牌游戏</a><a href="http://m.pc6.com/x/Catalogid/697/2/">策略塔防</a><a href="http://m.pc6.com/x/Catalogid/712/2/">冒险解谜</a><a href="http://m.pc6.com/x/Catalogid/598/2/">模拟经营</a><a href="http://m.pc6.com/x/Catalogid/592/2/">飞行射击</a><a href="http://m.pc6.com/x/Catalogid/596/2/">赛车游戏</a><a href="http://m.pc6.com/x/Catalogid/593/2/">体育竞技</a><a href="http://m.pc6.com/x/Catalogid/595/2/">棋牌游戏</a><a href="http://m.pc6.com/x/Catalogid/713/2/">儿童教育</a><a href="http://m.pc6.com/x/Catalogid/637/2/">音乐游戏</a><a href="http://m.pc6.com/x/Catalogid/638/2/">修改版游戏</a><a href="http://m.pc6.com/x/Catalogid/636/2/">其它网游</a><a href="http://m.pc6.com/x/Catalogid/842/2/">即将发布</a>',
                            '<a href="http://m.pc6.com/x/Catalogid/589/2/">即时聊天</a><a href="http://m.pc6.com/x/Catalogid/588/2/">图片拍照</a><a href="http://m.pc6.com/x/Catalogid/584/2/">影音播放</a><a href="http://m.pc6.com/x/Catalogid/585/2/">生活服务</a><a href="http://m.pc6.com/x/Catalogid/583/2/">网络通讯</a><a href="http://m.pc6.com/x/Catalogid/590/2/">手机qq</a><a href="http://m.pc6.com/x/Catalogid/709/2/">健康美食</a><a href="http://m.pc6.com/x/Catalogid/589/2/">社交社区</a><a href="http://m.pc6.com/x/Catalogid/582/2/">系统工具</a><a href="http://m.pc6.com/x/Catalogid/586/2/">安全防护</a><a href="http://m.pc6.com/x/Catalogid/587/2/">资讯阅读</a><a href="http://m.pc6.com/x/Catalogid/600/2/">地图出行</a><a href="http://m.pc6.com/x/Catalogid/703/2/">学习理财</a><a href="http://m.pc6.com/x/Catalogid/599/2/">美女壁纸</a><a href="http://m.pc6.com/x/Catalogid/704/2/">商务办公</a><a href="http://m.pc6.com/x/Catalogid/627/2/">动态壁纸</a><a href="http://m.pc6.com/x/Catalogid/628/2/">趣味娱乐</a><a href="http://m.pc6.com/x/Catalogid/705/2/">主题美化</a><a href="http://m.pc6.com/x/Catalogid/706/2/">桌面扩展</a><a href="http://m.pc6.com/x/Catalogid/708/2/">游戏辅助</a>',
                            '<a href="http://m.pc6.com/x/Catalogid/797/2/">角色扮演</a><a href="http://m.pc6.com/x/Catalogid/798/2/">动作游戏</a><a href="http://m.pc6.com/x/Catalogid/799/2/">射击游戏</a><a href="http://m.pc6.com/x/Catalogid/800/2/">策略游戏</a><a href="http://m.pc6.com/x/Catalogid/801/2/">模拟经营</a><a href="http://m.pc6.com/x/Catalogid/806/2/">格斗游戏</a><a href="http://m.pc6.com/x/Catalogid/802/2/">竞速游戏</a><a href="http://m.pc6.com/x/Catalogid/803/2/">体育游戏</a><a href="http://m.pc6.com/x/Catalogid/804/2/">棋牌游戏</a><a href="http://m.pc6.com/x/Catalogid/805/2/">冒险解谜</a><a href="http://m.pc6.com/x/Catalogid/807/2/">益智游戏</a><a href="http://m.pc6.com/x/Catalogid/808/2/">情景游戏</a><a href="http://m.pc6.com/x/Catalogid/809/2/">儿童游戏</a><a href="http://m.pc6.com/x/Catalogid/810/2/">休闲游戏</a>',
                            '<a href="http://m.pc6.com/x/Catalogid/776/2/">社交应用</a><a href="http://m.pc6.com/x/Catalogid/777/2/">音乐软件</a><a href="http://m.pc6.com/x/Catalogid/778/2/">影音娱乐</a><a href="http://m.pc6.com/x/Catalogid/779/2/">商务软件</a><a href="http://m.pc6.com/x/Catalogid/780/2/">生活软件</a><a href="http://m.pc6.com/x/Catalogid/781/2/">工具软件</a><a href="http://m.pc6.com/x/Catalogid/782/2/">效率软件</a><a href="http://m.pc6.com/x/Catalogid/783/2/">导航软件</a><a href="http://m.pc6.com/x/Catalogid/784/2/">健身软件</a><a href="http://m.pc6.com/x/Catalogid/785/2/">摄影录像</a><a href="http://m.pc6.com/x/Catalogid/786/2/">体育软件</a><a href="http://m.pc6.com/x/Catalogid/787/2/">美食佳饮</a><a href="http://m.pc6.com/x/Catalogid/788/2/">报刊杂志</a><a href="http://m.pc6.com/x/Catalogid/789/2/">图书阅读</a><a href="http://m.pc6.com/x/Catalogid/790/2/">财务软件</a><a href="http://m.pc6.com/x/Catalogid/791/2/">辅助软件</a><a href="http://m.pc6.com/x/Catalogid/792/2/">医学软件</a><a href="http://m.pc6.com/x/Catalogid/793/2/">儿童教育</a><a href="http://m.pc6.com/x/Catalogid/794/2/">旅行出游</a><a href="http://m.pc6.com/x/Catalogid/795/2/">新闻软件</a>'
                            ];
                        i.html(html[index]);
                    },
                    xfNav: function () {
                        var t = e('header').height() + 90;
                        e(window).scroll(function () {
                            var i = e('#btns');
                            if (e(window).scrollTop() >= t) {
                                i.css({position: 'fixed', top: 0}).addClass('on');
                            }
                            else {
                                i.css({
                                    position: 'relative'
                                }).removeClass('on');
                            }
                            if (e('#wrapper').offset().top + e('#wrapper').height() - 35 <= e(window).scrollTop()) {
                                e('#xgk').addClass('fix');
                            }
                            else {
                                e('#xgk').removeClass('fix');
                            }
                        });
                    },
                    downHref: function () {
                        if (this.assid > 0) {
                            e('#info #btns a').attr('href', 'http://m.pc6.com/down.asp?id=' + this.assid);
                        }

                        if (n.versions.android && void 0 !== this.platAndroidAddress) {
                            if (this.platAndroidAddress.indexOf('http:') >= 0 || this.platAndroidAddress.indexOf('ftp:') >= 0 || this.platAndroidAddress.indexOf('https:') >= 0) {
                                e('#info #btns a').attr('href', this.platAndroidAddress);
                            }
                            else {
                                e('#info #btns a').attr('href', 'http://download.pc6.com/down/' + this.platAndroidId + '/');
                            }
                            if (e('#ResSystem').html(this.platAndroidResSystem), ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',') < 0) {
                                if (e('body.dnb').length < 1) {
                                    e('#info .name').html('<h1>' + this.platAndroidResName + '</h1>' + this.platAndroidResVer);
                                }
                            }
                        }
                        else if (n.versions.ios && void 0 !== this.platIPhoneAddress) {
                            if (this.platIPhoneAddress.indexOf('http:') >= 0 || this.platIPhoneAddress.indexOf('ftp:') >= 0 || this.platIPhoneAddress.indexOf('https:') >= 0) {
                                e('#info #btns a').attr('href', this.platIPhoneAddress);
                            }
                            else {
                                e('#info #btns a').attr('href', 'http://download.pc6.com/down/' + this.platIPhoneId + '/');
                            }
                            if (e('#ResSystem').html(this.platIPhoneResSystem), ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.webInfoId + ',') < 0) {
                                if (e('body.dnb').length < 1) {
                                    e('#info .name').html('<h1>' + this.platIPhoneResName + '</h1>' + this.platIPhoneResVer);
                                }
                            }
                        }

                    },
                    titTab: function () {
                        if (e('.xgwz ul li').length > 0) {
                            e('.xgwz').show();
                        }
                        else {
                            e('.xgwz').hide(), e('#tab span').eq(1).hide();
                        }
                        e('#tab span').click(function () {
                            if ('简介' === e(this).text()) {
                                e(this).addClass('cur').siblings().removeClass('cur'), e('.xyc,.cont,#comment,.xgwz,.similar,#tcsyy,.guess,#xgk,.historyver,.tips_more,.h5online,.hot_gamerec,.rank,.rela_down').show();
                            }
                            else if ('教程' === e(this).text()) {
                                e(this).addClass('cur').siblings().removeClass('cur'), e('.cont,.xyc,.similar,#tcsyy,#xgk,.guess,.historyver,.tips_more,.h5online,.hot_gamerec,.rank').hide(), e('.xgwz,#comment,.rela_down').show();
                            }
                            else if ('评论' === e(this).text()) {
                                e(this).addClass('cur').siblings().removeClass('cur'), e('.xgwz,.cont,.xyc,.similar,#tcsyy,#xgk,.guess,.historyver,.tips_more,.h5online,.hot_gamerec,.rank,.rela_down').hide(), e('#comment').show();
                            }

                        });
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
                    hotRec: function () {
                        var t = [];
                        var i = 2;
                        var r = 0;
                        var o = 0;
                        var s = 0;
                        var a = this;
                        if (n.versions.android) {
                            if (i = 0, void 0 !== this.platAndroidAddress) {
                                o = this.platAndroidCid, s = this.platAndroidRid, r = this.platAndroidId;
                            }
                        }
                        else if (n.versions.ios) {
                            if (i = 1, void 0 !== this.platIPhoneAddress) {
                                o = this.platIPhoneCid, s = this.platIPhoneRid, r = this.platAndroidId;
                            }

                        }

                        if (2 !== i) {
                            e('#xgk a').each(function () {
                                t.push(e(this).text());
                            }), 0 === t.length ? t = '' : t = t.join(','), e.ajax({
                                method: 'get',
                                data: {
                                    keys: t,
                                    id: a.webInfoId,
                                    platform: i,
                                    pid: r,
                                    cid: void 0 !== a.webInfoCid ? a.webInfoCid : 0,
                                    rid: void 0 !== a.webInfoRid ? a.webInfoRid : 0,
                                    rcid: o,
                                    rrid: s
                                },
                                url: 'https://apis.pc6.com/ajax.asp?action=998',
                                dataType: 'json',
                                success: function (t) {
                                    if (void 0 !== t.list) {
                                        var n = t.list;
                                        var r = '';
                                        if (0 === i) {
                                            for (var o = 0; o < n.length; ++o) {
                                                r += '<li><a href="http://m.pc6.com/down.asp?id=' + n[o].ID + '"><mip-img src="' + n[o].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian' + (o + 1) + '\',\'' + n[o].ResName + '\'])"></mip-img>' + n[o].ResName + '</a></li>';
                                            }

                                        }
                                        else if (1 === i) {
                                            for (var b = 0; b < n.length; ++b) {
                                                r += '<li><a href="http://m.pc6.com/mipd/' + n[b].ID + '.html" target="_blank"><mip-img src="' + n[b].SmallImg + '" onclick="_czc.push([\'_trackEvent\',\'tuijian\',\'tuijian' + (o + 1) + '\',\'' + n[b].ResName + '\'])"></mip-img>' + n[b].ResName + '</a></li>';
                                            }

                                        }
                                        e('.tjyxph #thelist3').append(r);
                                    }

                                },
                                error: function () {}
                            });
                        }

                    },
                    show: function () {
                        if (e('#historyver p').length === 0) {
                            e('#historyver').remove();
                        }

                        if (e('#tcsyy li').length === 0) {
                            e('#tcsyy').remove();
                        }

                        if (e('#dcatetory a').length === 0) {
                            e('.tips_more').remove();
                        }

                        if (this.dif() === 0) {
                            e('.hot_gamerec,.rank').remove();
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
                    h5: function () {
                        var li = e('.h5online .tags-main-ul > li');
                        var len = li.length;
                        var page = Math.ceil(len / 8);
                        for (var i = 0; i < page; i++) {
                            e('.h5online .tags-main-ul > li').slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
                        }
                        if (e('#tags-main2').length > 0) {
                            this.touchSlide('#h5online');
                        }
                    },
                    reladown: function () {
                        e('.rela_down').addClass('pictxt').removeClass('list');
                        var li = e('.rela_down .tags-main-ul > li');
                        var len = li.length;
                        var page = Math.ceil(len / 8);
                        for (var i = 0; i < page; i++) {
                            e('.rela_down .tags-main-ul > li').slice(0, 8).wrapAll('<div class="tags-main-box"><ul class="tags-box-ul"></ul></div>');
                        }
                        if (e('#tags-main3').length > 0) {
                            this.touchSlide('#rela_down');
                        }
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
                    focuswe: function () {
                        if (e('.wefocus').length > 0) {
                            e('body').append('<div class="wefocus_a"><div class="wefocus_a_head"><img src="https://m.pc6.com/public/img/w_pc6.png" alt=""><p><b>PC6手游网</b>随时找攻略，尽情下游戏！</p></div><div class="wefocus_a_way"><b>关注方法</b><dl><dt><i>1</i>打开微信首页点【搜索】</dt><dd><img src="https://m.pc6.com/public/img/u310.png" alt=""></dd></dl><dl><dt><i>2</i>搜索【PC6手游网】即可关注</dt><dd><img src="https://m.pc6.com/public/img/u312.png" alt=""></dd></dl></div><div class="wefocus_btn"><a href="weixin://">打开微信</a></div><div class="wefocus_clo"></div></div><div class="wefocus_bg"></div>');
                            e('.wefocus').click(function () {
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
                                o.animate({
                                    height: '80px'
                                });
                            }
                            else {
                                o.animate({
                                    height: '42px'
                                });
                            }
                        });
                    },
                    init: function () {
                        this.mrtit(), this.xfNav(), this.titTab(), this.downHref(), this.footer(), this.hotRec(), this.touchSlide(), this.show(), this.historyver(), this.tcsyy(), this.reladown(), this.h5(), this.focuswe(), this.dif();
                    }
                };
            return i.prototype.build = function () {
                    r.init();
                }, i;
        }), define('mip-down-script', ['mip-down-script/mip-down-script'], function (t) {
            return t;
        }), (function () {
            function t(t, e) {
                t.registerMipElement('mip-down-script', e);
            }
            if (window.MIP) {
                require(['mip-down-script'], function (e) {
                    t(window.MIP, e);
                });
            }
            else {
                require(['mip', 'mip-down-script'], t);
            }
        }());
    }
});
