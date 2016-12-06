define('mip-iask-login', ['require', 'customElement', 'zepto'], function (require) {
	var $ = require('zepto');
	var customElem = require('customElement').create();
	
	// 页面交互效果
    var effects = {
   		//设置cookie
    	setCookie : function (name,value) {
    		var Days = 30; //此 cookie 将被保存 30 天
		    var exp = new Date();    //new Date("December 31, 9998");
		    exp.setTime(exp.getTime() + Days*24*60*60*1000);
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    	},
    	// 获取cookie
    	getCookie : function (cookiename) {
    		var result = null;
    		var mycookie = document.cookie;
    		var start2 = mycookie.indexOf(cookiename + "=");
    		if (start2 > -1) {
    			start = mycookie.indexOf("=", start2) + 1;
    			var end = mycookie.indexOf(";", start);
    			if (end == -1) {
    				end = mycookie.length;
    			}
    			result = unescape(mycookie.substring(start, end));
    		}
    		return result;
    	},
    	addLoginCookie : function () {
    		var key    = "iask_cookie";
    		var now = new Date();
    	    var st     = this.getCookie(key);
    	    if( st!=null ){
    	    	return;
    	    }
    		this.setCookie(key,now.getTime() + "" + Math.random());
    		return;
    	},
    	// 验证登录信息
    	checkLogin : function () {
    		try {this.addLoginCookie();} catch (e) {console.log(e);}
    		var index_login = $("#index_login");
    		var thisHref=window.location.href;
    		var nick_name=null;
    		var checkLoginUrl='http://m.iask.sina.com.cn/checkLogin?m='+Math.random();
			$.get(checkLoginUrl,function(e){
				if(e==null || e =='null'){
					index_login.attr("href","http://m.iask.sina.com.cn/login?source=" + thisHref);
				} else {
					var user = eval('(' + e + ')');
					nick_name = user.nickname;
					if(nick_name.length>4){
						nick_name = nick_name.substring(0, 3)+"....";
					}
					index_login.removeClass('btn-header btn-user');
					index_login.addClass('user-nick');
					index_login.html(nick_name);
					
					index_login.click(function(event){
						event.preventDefault();
						event.stopPropagation();
						$(".user-more").show();
					});
				}
			});
    	}, 
    	userInfoHide : function () {
    		 $(document).click(function (event) {
    			 $('.user-more').hide(); 
    			 });  
    		 $('.user-more').click(function (event) { 
    			 event.stopPropagation();
    			 });  
    	},
        init: function () {
			 this.checkLogin();
			 this.userInfoHide();
        }
    }; 
	
	 // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        effects.init();
    };
	
	return customElem;
});

require(['mip-iask-login'], function (plugindemo) {
    // 注册mip-iask-login组件
    MIP.registerMipElement('mip-iask-login', plugindemo);
});
