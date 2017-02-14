/**
 * @author: laoono
 * @date:  2017-01-13
 * @time: 15:35
 * @file: mip-fh-ad-plus.js
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();
    var $body = $('body');
    var $emptyShowEle = $('[fh-ad-empty-show]');

    // 页面广告参数
    var $adKeywords = $('meta[name="fh-ad-keywords"]');
    var paramObj = $adKeywords.attr('content');

    // 直投广告请求url
    var adUrl = 'https://partners.fh21.com.cn/partners/showcodejsonp?callback=?';

    // 初始化直 投广告
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

        var FhAdPutNum = $('mip-fh-ad-plus').length;

        // 判断直投广告参数,是否加载直投广告请求
        if (kw && kw.length) {
            $.getJSON(adUrl, query, function (res) {
                var fhAdNum = $body.attr('fh-ad-num') || 0;

                var data = $.parseJSON(res.result);

                // 遍历直投广告ID
                $.each(data, function (k, v) {
                    // 有特定广告位id的直投广告 先隐藏网盟 再显示直投
                    if ($.trim(v)) {
                        element.children(':first-child').remove();
                        element.html(v);

                        $body.addClass('view-fh-ad-' + (+k));
                        $body.attr('fh-ad-num', ++fhAdNum);
                    }
                    // 无特定广告位id直投广告显示网盟
                    else {
                        element.children(':first-child').show();

                        $body.addClass('view-fh-ad-' + (+k) + '-union');
                        $body.attr('fh-ad-num', --fhAdNum);
                    }
                    // 所有的直投广告位均无直投广告
                    if (fhAdNum === -FhAdPutNum) {
                        $emptyShowEle.show();
                    }
                });
            });
        }
        // 无任何直投广告位
        else {
            $body.addClass('view-fh-ad-union');
            $emptyShowEle.show();
        }
    };

    var getOpt = function (element) {
        var $element = $(element);
        // 获取元素绑定的广告位id和关键词
        var posId = $element.attr('fh-ad-pid');
        var keywords = $element.attr('fh-ad-keywords') || paramObj;
        var lazy = $element.attr('lazy') || 'false';

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

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.lazy === 'false' && init(opt);
    };

    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };

    return customElem;
});
