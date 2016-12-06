/**
*  
* @file 脚本支持
* @author  
* @time  
* @version 1.0.0
*/
define("mip-iask-business",['require', 'customElement', 'zepto'],function(require) {
	
	var $ = require('zepto');
	var customElem = require('customElement').create();
	// 商业广告
	var ipLoad = function (callback) {
		var url = "http://ipip.iask.cn/iplookup/search?format=json&callback=?";
		try{
			$.getJSON(url,function (data) {
				province = data.province;
				city = data.city;
				callback(data);
			});
		}catch (e) { }
	};
	// 判断区域投放广告
	var hideDiv = function(area,div) {
		try{
			ipLoad(function(data){
				if(area.indexOf(data.province) == -1){
					$(div).remove();
				}
			});
		}catch (e) { }
	};
	// 隐藏len小于等于0的DIV
	var lenHide = function(len,div,type) {
		try{
			if($(len).length <= 0){
				if(type == "show"){
					$(div).show();
				}else{
					$(div).hide();
				}
			}
		}catch (e) {}
	};
	// 移除百度广告
	var removeBaiduAd = function() {
		$("#mip_as_haoping_div").remove();
		$("#mip_as_qita_div").remove();
		$("#mip_as_lswt_div").remove();
		$("#mip_as_xgzs_div").remove();
		$("#mip_as_jrjd").remove();
		$("#mip_dl_jrjd").remove();
		$("#mip_as_tbtj").remove();
		$("#mip_dl_tbtj").remove();
		$("#mip_as_djgz").remove();
		$("#mip_as_footer_div").remove();
	};
	
	var loadAd = function(sources,openId,div) {
		var type = "";
		if(sources == 'COOPERATE_HUASHENG') {
			type = "HS";
		}else if(sources == 'COOPERATE_HUASHENG_QA') {
			type = "HSQA";
		}else if(sources == 'COOPERATE_XINYUHENG') {
			type = "XYH";
		}
		if(type == "") {
			return;
		}
		var url = "http://m.iask.sina.com.cn/t/wlsh?openCorporationId="+openId+"&type="+type;
		$.get(url,function(data){
			var res = eval('(' + data + ')');
			if(res.succ == "Y"){
				$(div).empty();
				var json = eval('(' + res.html + ')');
				var isHuasheng = true;
				var htmls = "";  
				var html1 = "";
				if(json.succ == "Y" && type=="XYH"){
					isHuasheng = false;
					htmls = putMXfAd(json.pics[1].picLink,json.pics[1].picLocal);
				}else{
					var pic  = json.pics[3] || "";
					htmls = putMXfAd(pic.picLink,pic.picLocal);
					
					var companyName = json.companyName || "",
				    drName   = json.drName  || "",
				    website  = json.website || "",
				    pic      = json.pics[0] || "";
					html1 = putQiyeInfo(companyName,drName,website,pic);
				}
				$(div).append(htmls);
				$(".foot-plan-close").click(function(){
	        		$(div).remove();
	        	});
				if(isHuasheng) {
					$("#mip_as_other_qiye_div").append(html1);
				}
			}
		});
	};
	// 悬浮广告
	var putMXfAd = function(picLink,picLocal) {
		var htmls = "";
		htmls += "<div class='foot-plan' >";
		htmls += "<span class='foot-plan-close'>关闭</span> <span class='icon-bai'></span>";
		htmls += "<a href='"+picLink+"' target='_blank'>";
		htmls += "<mip-img class='mip-img' src='"+picLocal+"'></mip-img>";
		htmls += "</a></div>";
		return htmls;
	};
	var putQiyeInfo = function(companyName,drName,website,pic) {
		var htmls = "<div class='firms-con'>";
			htmls += "<div class='firms-pic'>";
			htmls += "<mip-img class='mip-img' src="+pic.picLocal+"></mip-img>";
			htmls += "<span class='icon-v'></span>";
			htmls += "</div>";
			htmls += "<div class='firms-text'>";
			htmls += "<p><span class='name'>"+companyName+"</span><span class='time'> 16-09-05</span></p>";
			htmls += "<p>"+drName+"</p>";
			htmls += "</div>";
			htmls += "<a href="+website+" target='_blank' class='btn-ask'>咨询专家</a>";
			htmls += "</div>";
			htmls += "</div>";
			return htmls;
	};
	// build 方法，元素插入到文档时执行，仅会执行一次
	customElem.prototype.build = function () {
		var elem = this.element;
		var div = $(elem).attr('div');
		var area = $(elem).attr('area');
		var len = $(elem).attr('len');
		var type = $(elem).attr('type');
		var sources = $(elem).attr('sources');
		var openCorporationId = $(elem).attr('openId');
		if(len) {
			lenHide(len,div,type);
		}
		if(area){
			hideDiv(area,div);
		}
		if(sources == "COMMERCIAL_IAD" || sources == "COMMERCIAL_ZWZD" || sources == "COMMERCIAL_CAD") {
			removeBaiduAd();
		}
		if(sources == 'COOPERATE_HUASHENG' || sources == 'COOPERATE_HUASHENG_QA' || sources == 'COOPERATE_XINYUHENG') {
			loadAd(sources,openCorporationId,div);
		}
	};
	
	return customElem;
});

require(['mip-iask-business'], function (plugindemo) {
    // 注册mip-iask-business 组件
    MIP.registerMipElement('mip-iask-business', plugindemo);
});
