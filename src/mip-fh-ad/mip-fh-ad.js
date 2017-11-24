/**
 * @author: laoono
 * @date:  2016-09-01
 * @time: 15:35
 * @file: mip-fh-ad.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();
    var $body = $('body');

    // 直投广告请求url
    var ajaxurl = 'https://partners.fh21.com.cn/partners/showcodejsonp?callback=?';
    // 页面广告参数
    var param = $('.adParam');
    var paramObj = param.data('keyword');

    // load btm baidu ad
    var loadBdAd = function () {
        var html = ['<div class="fh-ad-1">', '<span class="btn-fh-ad-1" on="tap:fh-ad-1.close"></span>', '</div>'];

        html = html.concat(['<mip-ad type="baidu-wm-ext" ',
            ,'domain="1.feihua.com" token="gm3a1ecf98f1cbf13adb4c3e8da4f73ffa54acde0b36"'
            ,'>'
            ,'<div id="gm3a1ecf98f1cbf13adb4c3e8da4f73ffa54acde0b36"></div>', '</mip-ad>']);

        html = html.join('');
        return html;
    };

    // 没有飞华直投广告的操作
    var hasNoFhAd = function (element, posId) {
        $('.ad-s-1255').show();
        $('.ask-info-blew-ad').show();
        if (+posId === 1) {
            element.html(loadBdAd());
        }
        $body.addClass('view-fh-ad-union');
        $mipFhAdBdHide.show().removeClass('dn');
    };

    var hasFhAd = false;
    var $mipFhAdBdHide = $('[mip-fh-ad-bd-hide]');
    // 初始化直投广告
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var posId = [opt.posId] || [1];
        var kw = opt.kw || '';
        var element = opt.element;

        // 接口参数值
        var query = {
            kw: kw,
            pid: posId.join(',')
        };

        // 判断直投广告参数,是否加载直投广告请求
        if (kw && kw.length) {
            $.getJSON(ajaxurl, query, function (json) {
                var adObj = $.parseJSON(json.result);

                // 遍历直投广告ID
                $.each(adObj, function (k, v) {
                    // 有特定广告位id的直投广告
                    if ($.trim(v)) {
                        hasFhAd = true;
                        // 根据广告id，判断广告的显示位置
                        switch (+k) {
                            // 底部悬浮广告
                            case 1:
                                element.html('<div id="ad_position_1">' + v + '</div>');
                                break;
                            case 14:
                                $('.liveAdBlock').html(v);
                                break;
                            // 我要提问广告位
                            case 47:
                                $('.i-2-iask').html(v);
                                break;
                            // 向Ta提问广告位
                            case 48:
                                $('div.introduce-list').find('a.btn').remove();
                                $('div.introduce-list').append(v);
                                break;
                            // 底部广告位
                            case 11:
                            // 我要提问下方热图广告位
                            case 49:
                                element.html(v);
                                break;

                            default:
                                element.html(v);
                                break;
                        }

                        $body.addClass('view-fh-ad-' + (+k));
                    }
                    // 无特定广告位id投广告
                    else {
                        switch (+k) {
                            // 广告位id为1时，加载底部漂浮的百度广告
                            case 1:
                                element.html(loadBdAd());
                                break;
                            // 广告位id为47时，加载我要提问下方文字广告和问题详情下方网盟广告
                            case 47:
                                $('.ad-s-1255').show();
                                $('.ask-info-blew-ad').show();
                                break;
                        }

                        $body.addClass('view-fh-ad-' + (+k) + '-union');
                    }
                });

                if (!hasFhAd) {
                    hasNoFhAd(element, posId);
                }
            });
        }
        else {
            hasNoFhAd(element, posId);
        }
    };

    var getOpt = function (element) {
        var $element = $(element);
        // 获取元素绑定的广告位id和关键词
        var posId = $element.attr('fh-ad-pid');
        var keywords = $element.attr('fh-ad-keywords') || paramObj;
        var lazy = $element.attr('lazy');

        // 广告初始化参数
        // 广告位id数组 [1, 11, 14, 47, 48, 49];

        var opt = {
            posId: posId,
            kw: $.trim(keywords),
            lazy: lazy,
            element: $element
        };
        return opt;
    };
    var menuCtrl = function () {
        // 菜单
        var state = true;
        var $menuBar = $('.menuBar');
        $('.menu').on('click', function () {
            if (state) {
                state = false;
                $menuBar.show();
            }
            else {
                state = true;
                $menuBar.hide();
            }
        });
        $('.returns').on('click', function () {
            state = true;
            $menuBar.hide();
        });
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.lazy === 'false' && init(opt);
        // 导航菜单的显隐
        menuCtrl();
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };

    return customElem;
});
