/**
 * @file pp助手下载
 * @author Zhou
 */
define(function (require) {
    var $ = require('zepto');
    var tags = require('tags').create();
	var browser = {  versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
				UCBrowser: u.indexOf('UCBrowser') > -1, //UCBrowser
				MQQBrowser: u.indexOf('MQQBrowser') > -1, //是否MQQBrowser
				Safari: u.indexOf('Safari') > -1,
				ios9: u.indexOf('iPhone OS 9') > -1
			};
		} (),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	
	var _pageinfo = { id: $("#f-information").attr("data-id"), path:$("#f-information").attr("data-path"),categroyId:$("#f-information").attr("data-categroyId"),rootId:$("#f-information").attr("data-rootid"),commendid:$("#f-information").attr("data-commendid"),system:$("#f-information").attr("data-system"),ppaddress:$("#f-information").attr("data-ppaddress"),ismoney:$("#f-information").attr("data-ismoney")};
	function tagsChoose(){
		if($(".g-tags-box").length>0){
			if (browser.versions.ios){//如果是苹果设备
				if($(".g-tags-box .m-tags-ios li").length>0){//判断是否有数据
				addTags($(".g-tags-box .m-tags-ios").html(),$(".g-tags-box .m-tags-ios li").first().attr("data-system"),$(".g-tags-box .m-tags-ios li").first().attr("data-id"),$(".g-tags-box .m-tags-ios li a p").first().text(),"iOS");
				}
				
			}else{
				addTags($(".g-tags-box .m-tags-android").html(),$(".g-tags-box .m-tags-android li").first().attr("data-system"),$(".g-tags-box .m-tags-android li").first().attr("data-id"),$(".g-tags-box .m-tags-android li a p").first().text(),"Android");	
			}	
		}else{
			$(".g-tags-box").remove();		
		}	
	}
	function addTags(tagsHtml,firstSystem,firstId,firstName,systemName){ //相关版本
		tagsHtml = '<div class="g-tags-box"><ul>'+tagsHtml+'</ul></div>';
		$(".g-tags-box").remove();		
		$("#m-down-msg").after(tagsHtml);
		$(".g-tags-box").show();
		if(_pageinfo.system.indexOf(systemName) == -1){
			$("#m-down-msg .info .pic ul li b").each(function(){
				var systemText = $(this).text();	
				if(systemText.indexOf("系统：") != -1){
					$(this).text("系统："+firstSystem);
				}
			})
			$("#m-down-msg h1").text(firstName);
			$("#downAddress ul li a").attr("href","/down.asp?id="+firstId).attr("data-add","add");	
		}
		
		if($(".g-tags-box ul li").length <= 0){
			$(".g-tags-box").hide();
		}
		$(".g-tags-box ul li a p").each(function(){
			var liText = $(this).text();
			re = /(官方最新版|官网最新版|官方正式版|官方安卓版|官方版|日服版|九游版|最新版|360版|百度版|uc版|九游版|安峰版|草花版|益玩版|破解版|修改版|无限金币版|中文版)/;
			liText = liText.replace(re, "<font color=\"red\">$1</font>");
			$(this).html(liText);	
		})
	}
	
	tags.prototype.build = function () {
        tagsChoose();
    };
    return tags;
});
