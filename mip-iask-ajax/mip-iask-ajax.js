/**
*  
* @file 脚本支持
* @author  
* @time  
* @version 1.0.0
*/
define("mip-iask-ajax",['require', 'customElement', 'zepto'],function(require) {
	
	var $ = require('zepto');
	var customElem = require('customElement').create();
	var checkLogin = function(url,params,isLogin,callback) {
		var json = eval("("+params+")");
		if(isLogin) {
			// 验证是否登录
			var checkLoginUrl='http://m.iask.sina.com.cn/checkLogin?m='+Math.random();
			$.get(checkLoginUrl,function(e){
				if(e==null || e =='null'){
					flag = true;
					// 跳转到登录页面
					thisHref=window.location.href;
               		window.location.href="http://m.iask.sina.com.cn/login?source=" + thisHref;
               		return;
				}else{
					ajaxPost(url,json,callback);
				}
			});
		} else {
			ajaxPost(url,json,callback);
		}
		
	};
	var ajaxPost = function(url,params,callback) {
		$.post(url, params,function(data){
			var res = eval("("+data+")");
			if(res.succ=='Y' && res.jsonData != '0') {
				// 成功
				eval(callback);
			} else {
				// 失败
			}
		});
	};
	
	// build 方法，元素插入到文档时执行，仅会执行一次
	customElem.prototype.build = function () {
		
		var elem = this.element;
		var url = $(elem).attr('url');
		var params = $(elem).attr('data');
		var isLogin = $(elem).attr('isLogin');
		var click = $(elem).attr('click');
		var callback = $(elem).attr('callback');
		$("#"+click).on('click',function(){
			checkLogin(url,params,isLogin,callback);
		});
		
	};
	
	return customElem;
});

require(['mip-iask-ajax'], function (plugindemo) {
    // 注册mip-iask-ajax 组件
    MIP.registerMipElement('mip-iask-ajax', plugindemo);
});
