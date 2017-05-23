/**
 * @author: mj
 * @date:  2017-05-22
 * @time: 16:33
 * @file: mip-ys137-ad.js
 * @contact: regboy@qq.com
 * @description: 管理页面上的广告展现
 */
define(function(require) {
	var $ = require('zepto');
    var customElem = require('customElement').create();
	var baidu_domain="dm50.ys137.com";
	
	//加载百度反屏蔽代码
	var getbaidu_ad=function(tuid){
		return '<mip-ad type="baidu-wm-ext" domain="' + baidu_domain + '" token="' + tuid + '"><div id="' + tuid + '"></div></mip-ad>';
	};
	//初始化插件
	var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var ad_id = [opt.id] || [0];
		var element = opt.element;
		
		switch(+ad_id){
			case 1://分页后（四图）
				element.html(getbaidu_ad("nbdqx58bef"));
				break;
			case 2://分页后（搜索推荐）
				element.html(getbaidu_ad("u4djpnkdfe"));
				break;
			case 3://头部
				element.html("");//预留
				break;
			default:
				element.html("");
				break;
		}
		
		
	};
	//获取插件参数
	var getOpt = function (element) {
        var $element = $(element);
        // 获取元素绑定的广告位id和关键词
        var ad_id = $element.attr('id');
		var lazy = $element.attr('lazy');
        // 广告初始化参数
        var opt = {
            id: ad_id,
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