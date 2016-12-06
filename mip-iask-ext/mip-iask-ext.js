define('mip-iask-ext', ['require', 'customElement', 'zepto'], function (require) {
	var $ = require('zepto');
	var customElem = require('customElement').create();
	 
	// 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
			$(".similar-nav").on("click","li",function(){
				 event.preventDefault();
				 try{
					$(this).siblings().removeClass("current");
					$(this).addClass("current"); 
					
					var index = $(this).index();
					var nodes = $(this).parent().siblings();
					$(nodes).hide();
					
					$(nodes).slice(index,index+1).show();
				 }catch(e){}
			});
        },
        // 换一换
        changeMore: function () {
			$(".link-change").on('click',function(event){
				event.preventDefault();
				try{
					var pagesize = 5;
					var childNodes = $(this).parent().next().children();
					var pagecount = $(this).attr('pagecount');
					if(!pagecount){
						pagecount = pagesize;
					}
					if(pagecount >= childNodes.length){
						pagecount = 0;
					}
					var endcount = Number(pagecount) + pagesize;
					
					$(childNodes).hide();
					$(childNodes).slice(pagecount,endcount).show();
					$(this).attr('pagecount', endcount);
				} catch(e) {}
			});
        },
        // 展开 or 收起
		openOrStop:function(){
			$(".os-click").on('click',function(event){
				event.preventDefault();
				try {
					var txt = $(this);
					if(txt.text() == '[展开]') {
						txt.text('[收起]');
						txt.prev().show();
					} else {
						txt.text('[展开]');
						txt.prev().hide();
					}
				} catch(e) {}
			});
		},
		// 选择举报项
        reportChange:function() {
        	$("#reportList li").on('click',function(){
    			var fake = $(this).find('span').attr('class');
    			if(fake=='fakeChecked') {
    				$(this).find('span').removeClass();
    				$(this).find('span').addClass('fakeCheck');
    			} else {
    				$(this).find('span').removeClass();
    				$(this).find('span').addClass('fakeChecked');
    			}
    		});
        },
        clearReport :function() {
        	$("#report-div").hide();
    		$("#report_id").text('');
    		$("#report_type").text('');
    		$("#report_typeId").text('');
    		$("#reportList li").each(function(){
    			$(this).find('span').removeClass();
    			$(this).find('span').addClass('fakeCheck');
    		});
        },
        // 取消举报
        cannelReport:function() {
        	$("#cannelReport").on('click',function(){
        		effects.clearReport();
    		});
        },
        // 举报
        okReport:function() {
        	$("#okReport").click(function(){
	        	var reportList = ""; 
	        	$("#reportList li").each(function(){
	    			var fake = $(this).find('span').attr('class');
	    			if(fake=='fakeChecked') {
	    				reportList += $(this).text().trim()+"-";
	    			}
	    		});
	        	if(reportList == "") {
	    			alert("请选择举报原因！");
	    		} else {
	    			var checkLoginUrl='http://m.iask.sina.com.cn/checkLogin?m='+Math.random();
	    			$.get(checkLoginUrl,function(e){
	    				if(e==null || e =='null'){
	    					flag = true;
	    					// 跳转到登录页面
	    					thisHref=window.location.href;
	    					window.location.href="http://m.iask.sina.com.cn/login?source=" + thisHref;
	    					return;
	    				} else {
	    					var questionId = $("#report_id").text();
	    					var type = $("#report_type").text();
	    					var typeId = $("#report_typeId").text();
	    					console.log("questionId:"+questionId);
	    					$.post("http://m.iask.sina.com.cn/question/reportnew", {"reportList":reportList,"questionId":questionId,"type":type,"typeId":typeId},function(data){
	    						var res = eval("("+data+")");
	    						alert(res.desc);
	    					});
	    					effects.clearReport();
	    				}
	    			});
	    		}
        	});
        },
        closeBottomAd:function() {
        	$(".foot-plan-close").click(function(){
        		$("#mip_as_footer_div").remove();
        	});
        },
        init: function () {
			this.switchBlock();
			this.changeMore();
			this.openOrStop();
			this.reportChange();
			this.cannelReport();
			this.okReport();
			this.closeBottomAd();
        }
    }; 
	
	 // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        effects.init();
    };
	
	return customElem;
});

require(['mip-iask-ext'], function (plugindemo) {
    // 注册mip-iask-ext组件
    MIP.registerMipElement('mip-iask-ext', plugindemo);
});
