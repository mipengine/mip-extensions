/**
 * @file pp助手下载
 * @author Zhou
 */
define(function (require) {
    var $ = require('zepto');
    var showtanceng = require('showtanceng').create();
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

	var catearr = [151,156,158,159,160,161,162,163,164,256,257,258,178,179,180,181,182,183,184,185,186,207,208,81,209,210,211,212,218,219,220,221,222,223,224,225,226,230,237,238,239,240,241,308,309,310,311,328,322,323,324,325,326,329]; //安卓分类
	var catearrIos = [141,214,215,216,227,228,229,231,232,233,234,235,312,313,314,315,316,317,318,319,327,330]; //ios分类
	
	var tcStyle= '<style>.m-click-show{ width:100%; height:100%; position:fixed; left:0; top:0; display:none; overflow:hidden; z-index:99999}.m-black-bg{ width:100%; height:100%; background:#000; opacity:0.7; display:block; overflow:hidden; position:fixed; left:0; top:0; z-index:10;}.m-click-show .m-show-cont{ width:94%; height:auto; max-height:94%; background:#fff; border-radius:6px; padding:0 0 62px; box-sizing:border-box; position:fixed; left:3%; top:3%; display:block;overflow-x:hidden; z-index:20;}.m-click-show .m-show-cont .g-show-title{width:auto;height:auto;line-height:24px;font-size:15px;font-weight:normal;color:#333;margin: 0px 12px 0;display:block;overflow:hidden;border-bottom:1px solid #eee;padding:2px 0 8px 0;}.m-click-show .m-show-cont .g-show-title p{ width:100%; height:auto; float:left; display:inline; overflow:hidden}.m-click-show .m-show-cont .g-show-title b{ width:auto; height:16px; line-height:16px; font-size:14px; font-weight:normal; color:#999; margin:5px 0 0; float:left; display:inline;overflow:hidden}.m-click-show .m-show-cont .g-show-title b i{ width:16px; height:16px; border:1px solid #ccc; float:left; margin:0 10px 0 0; display:inline;}.m-click-show .m-show-cont .g-show-title b i:before{content: "";transform: rotate(-45deg) translate(-2px,6px);display:block;overflow:hidden;width: 2px;height: 6px;background: #777;}.m-click-show .m-show-cont .g-show-title b i:after{content: "";transform: rotate(45deg) translate(3px,-9px);display:block;overflow:hidden;width: 2px;height: 11px;background: #777;}.m-click-show .m-show-cont .g-show-title em{ float:left; height:16px; line-height:16px; font-size:14px; font-weight:normal; color:#999; float:left; margin:5px 0 0 10px; display:inline; overflow:hidden}.m-click-show .m-show-cont .g-show-title span{ color: #1ADFB2; font-weight:normal}.m-click-show .m-show-cont .g-show-title a{ float:right; font-size:12px; font-weight:normal; color:#999; padding:0 10px 0 0; display:inline; overflow:hidden}.m-click-show .m-show-cont .m-close-btn{ width:auto; height:auto; font-size:30px; font-weight:bold; color:#333; -webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);-ms-transform: rotate(45deg);transform: rotate(45deg); display:block; overflow:hidden; position:absolute; right:6px; top:0; z-index:30; cursor:pointer}.m-click-show .m-show-cont .m-show-ul{ width:100%; height:auto; display:block; overflow:hidden;}.m-click-show .m-show-cont .m-show-ul li{ width:50%; height:auto; float:left; margin:12px 0 0; display:inline; overflow:hidden;}.m-click-show .m-show-cont .m-show-ul li a{ width:100%; height:auto; display:-webkit-box; overflow:hidden; cursor:pointer; text-decoration:none}.m-click-show .m-show-cont .m-show-ul li a img{ width:60px; height:60px; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p{ width:auto; height:auto; padding:0 0 0 10px; box-sizing:border-box; display:block; overflow:hidden; -webkit-box-flex:1;}.m-click-show .m-show-cont .m-show-ul li a p strong{ width:100%; height:20px; line-height:20px; font-size:14px; font-weight:bold; color:#333; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p em{ width:100%; height:20px; line-height:20px; font-size:12px; font-weight:normal; color:#B5B5B5; display:block; overflow:hidden}.m-click-show .m-show-cont .m-show-ul li a p b{ width:44px; height:20px; line-height:20px; border-radius:2px; background:#70E2BA; font-size:14px; font-weight:normal; color:#fff; text-align:center; display:block; overflow:hidden}.m-hideshow-top{width:100%;height:auto;padding: 0 0 10px 0;display:block;overflow:hidden;box-sizing:border-box;}.m-hideshow-top li{ width:25%; margin-top:17px; float:left; text-align:center;}.m-hideshow-top li a img { width:62px; height:62px; border-radius:6px;margin:0 auto; display:block; overflow:hidden}.m-hideshow-top li a strong{width:70px;line-height:14px; height:14px; font-size:14px; color:#151415; font-weight:normal; text-align:center;white-space: nowrap;  text-overflow: ellipsis; display:block; overflow:hidden;margin:0 auto; margin-top:5px; }.m-hideshow-top li b{ width:48px; height:20px; line-height:20px; font-size:13px; font-weight:normal; color:#41C1FA; border:1px #41C1FA solid; border-radius:3px; margin:5px auto 0 auto; text-align:center; display:block; overflow:hidden}.m-hideshow-middle{ width:100%; height:auto; padding:0 12px; display:block; overflow:hidden; box-sizing:border-box;}.m-hideshow-middle li{width:100%;height:auto;padding: 10px 8px;box-sizing:border-box;border-bottom:1px solid #eee;display:block;overflow:hidden;}.m-hideshow-middle li a{ width:100%; height:auto; display:-webkit-box; overflow:hidden;}.m-hideshow-middle li a img{ width:56px; height:56px; margin:0 10px 0 0; display:block; overflow:hidden;}.m-hideshow-middle li p{ width:auto; height:56px; display:block; overflow:hidden; -webkit-box-flex:1;}.m-hideshow-middle li p strong{width:100%;height: 20px;line-height: 20px;font-size: 17px;font-weight:normal;color:#333;margin: 6px 0 0;display:block;overflow:hidden;}.m-hideshow-middle li p strong i{width: 18px;height: 18px;line-height: 18px;font-size: 14px;font-weight:normal;color:#fff;text-align:center;font-style:normal;background:#ff0000;float:left;margin: 0px 9px 0 0;display:inline;overflow:hidden;}.m-hideshow-middle li:nth-child(2) p strong i{ background:#ff6430}.m-hideshow-middle li:nth-child(3) p strong i{ background:#f97a4f}.m-hideshow-middle li p em{ width:100%; height:14px; line-height:14px; font-size:12px; font-weight:normal; font-style:normal; color:#0da5ee; margin:7px 0 0; display:block; overflow:hidden} .m-hideshow-middle li p span{width:100%;height:14px;line-height:14px;font-size: 13px;font-weight:normal;color:#999;margin: 8px 0 0;display:block;overflow:hidden;} .m-hideshow-middle li b{ width:54px; height:27px; line-height:27px; font-size:15px; font-weight:normal; color:#41C1FA; text-align:center; border:1px solid #41C1FA; box-sizing:border-box; border-radius:4px; margin-top:14px; display:block; overflow:hidden;}.m-hideshow-middle li:nth-child(3){ border:0}</style>';	
	var androidHtml = '<ul class="m-hideshow-top"><li><a href="http://tj.tt1386.com/570226851/1960004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"红色复仇\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-1.jpg" /><p><strong>红色复仇</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/171226946/9480004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"屠龙战\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-2.jpg" /><p><strong>屠龙战</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/406209839/1370004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"最佳阵容\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-3.jpg" /><p><strong>最佳阵容</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/841057445/4090004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"决战沙城\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-4.jpg" /><p><strong>决战沙城</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/593384125/4310000" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"免费wifi\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-5.jpg" /><p><strong>免费wifi</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/638384264/5000000" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"微信多开\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-6.jpg" /><p><strong>微信多开</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/066386059/0900000" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"PPTV\",\"\",\"\"])\'><img src="http://pic1.cr173.com/cr173/mb/up/2016-6/20166281645503883_120_120.png" /><p><strong>PPTV</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/498373944/0530000" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"今日头条\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-8.jpg" /><p><strong>今日头条</strong><b>下载</b></p></a></li></ul><strong class="g-show-title">游戏排行榜</strong><ul class="m-hideshow-middle"><li><a href="http://tj.tt1386.com/305209160/8950004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"江湖侠客令\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-9.jpg" /><p><strong><i>1</i>江湖侠客令</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li><li><a href="http://tj.tt1386.com/650305409/9880004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"劲舞团\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-10.jpg" /><p><strong><i>2</i>劲舞团</strong><span>音乐舞蹈 / 中文</span></p><b>下载</b></a></li><li><a href="http://tj.tt1386.com/889290569/9090004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"天将雄兵\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-11.jpg" /><p><strong><i>3</i>天将雄兵</strong><span>卡牌策略 / 中文</span></p><b>下载</b></a></li></ul><strong class="g-show-title">相关应用</strong><ul class="m-hideshow-top"><li><a href="http://tj.tt1386.com/805232152/2810004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"手机百度\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-12.jpg" /><p><strong>手机百度</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/892321139/5240004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"微信多开助手\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-13.jpg" /><p><strong>微信多开助手</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/975247891/1770004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"wifi万能钥匙\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-14.jpg" /><p><strong>wifi万能钥匙</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/250291131/2190004" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"猎豹清理大师\",\"\",\"\"])\'><img src="/skin/new2016/images/androidad-15.jpg" /><p><strong>猎豹清理大师</strong><b>下载</b></p></a></li></ul>';
	var ioshtml = '<ul class="m-hideshow-top"><li><a href="http://tj.tt1386.com/262029296/0080005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"去吧皮卡丘\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-1.jpg" /><p><strong>去吧皮卡丘</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/315045178/8880005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"口袋妖怪复刻\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-2.jpg" /><p><strong>口袋妖怪复刻</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/142006155/3580005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"小冰冰传奇\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-3.jpg" /><p><strong>小冰冰传奇</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/262006271/8420005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"全民枪战\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-4.jpg" /><p><strong>全民枪战</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/415266950/9140005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"口袋妖怪起源\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-5.jpg" /><p><strong>口袋妖怪起源</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/027053379/7900005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"我在大清当皇帝\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-6.jpg" /><p><strong>我在大清当皇帝</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/249235356/7320005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"我的世界\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-7.jpg" /><p><strong>我的世界</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/825312968/2660005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"东方头条\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-8.jpg" /><p><strong>东方头条</strong><b>下载</b></p></a></li></ul><strong class="g-show-title">游戏排行榜</strong><ul class="m-hideshow-middle"><li><a href="http://tj.tt1386.com/645185551/0070005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"死神觉醒\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-9.jpg" /><p><strong><i>1</i>死神觉醒</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li><li><a href="http://tj.tt1386.com/799027351/9960005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"少年三国志\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-10.jpg" /><p><strong><i>2</i>少年三国志</strong><span>角色扮演 / 中文</span></p><b>下载</b></a></li><li><a href="http://tj.tt1386.com/016087028/3190005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"究极数码暴龙\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-11.jpg" /><p><strong><i>3</i>究极数码暴龙</strong><span>卡牌养成 / 中文</span></p><b>下载</b></a></li></ul><strong class="g-show-title">相关推荐</strong><ul class="m-hideshow-top"><li><a href="http://tj.tt1386.com/471099000/2960005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"神奇宝贝绿宝石\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-12.jpg" /><p><strong>神奇宝贝绿宝石</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/575302538/1400005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"口袋妖怪重制\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-13.jpg" /><p><strong>口袋妖怪重制</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/527321473/0960005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"热血战神\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-14.jpg" /><p><strong>热血战神</strong><b>下载</b></p></a></li><li><a href="http://tj.tt1386.com/533052612/2250005" onclick=\'_czc.push([\"_trackEvent\",\"弹层\",\"下载\",\"血族\",\"\",\"\"])\'><img src="/skin/new2016/images/iosad-15.jpg" /><p><strong>血族</strong><b>下载</b></p></a></li></ul>';
	function tanceng(){
		$("head").append(tcStyle);//添加弹层的css
		var isAds=false; //是否为商务包
		var downHref = $("#address").attr("href");
		var noAd = ["6071.com","1030.apk","duokoo.baidu.com","ugame.uc.cn","ugame.9game.cn","360.cn","ewan.cn","anfan.com","caohua.com","open.play.cn","tj.tt1386.com","http://g.","http://tj.","yiwan.com","x1.241804.com","moban.com","s.qq.com","456.com.cn","xinkuai.com","g.hgame.com","yxgames.com","qianghongbaoyo.com","down1.qianghongbaoyo.com","down2.guopan.cn","dl.guopan.cn","guopan.cn"]
		
		for(i=0;i<noAd.length;i++){
			//if(downHref.indexOf(noAd[i]) > -1){isAds=true;}
		}		
		
	    if(address==""){ if(browser.versions.ios){  address = "itms-services://?action=download-manifest&url=https://www.haima.me/download/000001533.plist" ;}else{address = $("#address").attr("href");}
		$('#downAddress a').attr('href','javascript:;').text("暂无下载包").addClass("zanwu"); 
		
		} //如果没有下载地址的情况 设置默认的下载地址
		console.log(browser.versions.ios+"===="+_pageinfo.categroyId+"====="+isAds)
		if(!browser.versions.ios){//安卓设备
			var idArray = [];
			var downHref = $("#downAddress .m-down-ul li a").attr("href");
			idArray = downHref.split(".");						
			if(downHref.indexOf("mo.L5645.net") != -1 && $(".g-tags-box ul li").length <= 0){
				$("#downAddress .m-down-ul li a").attr("href","/down.asp?id="+idArray[4]);
				$("#m-down-msg .type b:last").html('系统：Android')	;
			}else{
				if($.inArray(_pageinfo.categroyId,catearr) == -1 && $(".m-tags-android li").length <=0){//非安卓资源,没有tags匹配						
					$('#address').attr({"href":"javascript:;","ispc":true});	//非匹配资源
				}else{//安卓设备访问安卓资源
					$('#address').attr('issw',true);//匹配资源	
				}			
			}				
			androidTanceng();
			if(!isAds){
				addhighLab(); //安卓资源广告
			}
		}else{//IOS设备
			if($.inArray(_pageinfo.categroyId,catearrIos) == -1 && $(".m-tags-ios li").length <= 0){ //非IOS资源,没有tags匹配
				$('#address').attr({"href":"javascript:;","ispc":true});//非匹配资源
			}else{
				$('#address').attr('issw',true);//匹配资源		
			}			
			iosTancent();
			if(!isAds){				
				iossoftAdd(); //IOS资源广告
			}
		}		
		$(".m-down-ul li a").click(function(){
			setTimer = setTimeout(function(){
				$(".m-click-show").show();								
			},100);
		})
		$(".m-close-btn,.m-black-bg").click(function(){			
			$(".m-click-show").hide();
		})
	}	
	function androidTanceng(){//安卓弹层	//新加判断地区
		var province = '' ;
		var city = '' ;
		var html = "";
		
		if($('#address').attr('ispc')){
			html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>该软件无安卓版，大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>'+ androidHtml +'</div><b class="m-black-bg"></b></div>';		
		}else{		
			html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>'+ androidHtml +'</div><b class="m-black-bg"></b></div>';		
		}		
		if($(".m-click-show").length<=0){
			$("body").append(html);
		};		
	}
	function iosTancent(){
		//IOS无广告弹层		
		if($(".m-click-show").length<=0){
			if($('#address').attr('ispc')){
				$("body").append('<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>该软件无苹果版，大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>'+ioshtml +'</div><b class="m-black-bg"></b></div>')
				$("#address").attr("href","javascript:;");
			}else{
				$("body").append('<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title"><p>大家<span>还喜欢</span>这些：</p></strong><b class="m-close-btn">+</b>'+ioshtml +'</div><b class="m-black-bg"></b></div>')	
			}			
		};	
	}
   	function addhighLab(){ //增加高速下载框  
		var RefUrl =document.referrer;
		var showAdsRef   = ["baidu.com","sm.cn","sogou.com","so.com","google.com","bing.com","www.cr173.com","http://cr173.com"];
		isShowPicAds= showAdsRef.findUrl(RefUrl);
		console.log(123)
		//if(isShowPicAds){
			$.getScript("http://ca.6071.com/?id=cr1731002333", function(){});
		//}
	}
	function iossoftAdd(){ //IOS资源广告
		console.log("ios")
		var RefUrl =document.referrer;
		var showAdsRef   = ["baidu.com","sm.cn","sogou.com","so.com","google.com","bing.com","www.cr173.com","http://cr173.com"];
		isShowPicAds= showAdsRef.findUrl(RefUrl);
		//if(isShowPicAds){
			$.getScript("http://ca.6071.com/?id=cr17310023331", function(){});
		//}
	}
	function _getScript(url, callback) {
        var head = document.getElementsByTagName('head')[0],
            js = document.createElement('script');

        js.setAttribute('type', 'text/javascript'); 
        js.setAttribute('src', url); 

        head.appendChild(js);

        //执行回调
        var callbackFn = function(){
                if(typeof callback === 'function'){
                    callback();
                }
            };

        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn();
                }
            }
        } else {
            js.onload = function() {
                callbackFn();
            }
        }
    }

    //如果使用的是zepto，就添加扩展函数
    if(Zepto){
        $.getScript = _getScript;
    }
	Array.prototype.findUrl = function(e) { for(i=0;i<this.length;i++)  {  if(e.indexOf(this[i])>-1)  return this[i]; }  return 0; }
	
	showtanceng.prototype.build = function () {
        tanceng();
    };
    return showtanceng;
});
