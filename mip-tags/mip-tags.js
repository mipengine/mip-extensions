/**
 * @file pp��������
 * @author Zhou
 */
define(function (require) {
    var $ = require('zepto');
    var tags = require('tags').create();
	var browser = {  versions: function () {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {//�ƶ��ն�������汾��Ϣ
				trident: u.indexOf('Trident') > -1, //IE�ں�
				presto: u.indexOf('Presto') > -1, //opera�ں�
				webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
				mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //�Ƿ�Ϊ�ƶ��ն�
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
				iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
				webApp: u.indexOf('Safari') == -1, //�Ƿ�webӦ�ó���û��ͷ����ײ�
				UCBrowser: u.indexOf('UCBrowser') > -1, //UCBrowser
				MQQBrowser: u.indexOf('MQQBrowser') > -1, //�Ƿ�MQQBrowser
				Safari: u.indexOf('Safari') > -1,
				ios9: u.indexOf('iPhone OS 9') > -1
			};
		} (),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	
	var _pageinfo = { id: $("#f-information").attr("data-id"), path:$("#f-information").attr("data-path"),categroyId:$("#f-information").attr("data-categroyId"),rootId:$("#f-information").attr("data-rootid"),commendid:$("#f-information").attr("data-commendid"),system:$("#f-information").attr("data-system"),ppaddress:$("#f-information").attr("data-ppaddress"),ismoney:$("#f-information").attr("data-ismoney")};
	function tagsChoose(){
		if($(".g-tags-box").length>0){
			if (browser.versions.ios){//�����ƻ���豸
				if($(".g-tags-box .m-tags-ios li").length>0){//�ж��Ƿ�������
				addTags($(".g-tags-box .m-tags-ios").html(),$(".g-tags-box .m-tags-ios li").first().attr("data-system"),$(".g-tags-box .m-tags-ios li").first().attr("data-id"),$(".g-tags-box .m-tags-ios li a p").first().text(),"iOS");
				}
				
			}else{
				addTags($(".g-tags-box .m-tags-android").html(),$(".g-tags-box .m-tags-android li").first().attr("data-system"),$(".g-tags-box .m-tags-android li").first().attr("data-id"),$(".g-tags-box .m-tags-android li a p").first().text(),"Android");	
			}	
		}else{
			$(".g-tags-box").remove();		
		}	
	}
	function addTags(tagsHtml,firstSystem,firstId,firstName,systemName){ //��ذ汾
		tagsHtml = '<div class="g-tags-box"><ul>'+tagsHtml+'</ul></div>';
		$(".g-tags-box").remove();		
		$("#m-down-msg").after(tagsHtml);
		$(".g-tags-box").show();
		if(_pageinfo.system.indexOf(systemName) == -1){
			$("#m-down-msg .info .pic ul li b").each(function(){
				var systemText = $(this).text();	
				if(systemText.indexOf("ϵͳ��") != -1){
					$(this).text("ϵͳ��"+firstSystem);
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
			re = /(�ٷ����°�|�������°�|�ٷ���ʽ��|�ٷ���׿��|�ٷ���|�շ���|���ΰ�|���°�|360��|�ٶȰ�|uc��|���ΰ�|�����|�ݻ���|�����|�ƽ��|�޸İ�|���޽�Ұ�|���İ�)/;
			liText = liText.replace(re, "<font color=\"red\">$1</font>");
			$(this).html(liText);	
		})
	}
	
	tags.prototype.build = function () {
        tagsChoose();
    };
    return tags;
});
