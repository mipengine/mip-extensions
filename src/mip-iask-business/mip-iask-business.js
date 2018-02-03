/**
* @file 脚本支持
* @author hejieye
* @time  2018-02-02
* @version 2.1.2
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var busUid = '';
    
    var utf8Encode = function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
	var utf8Decode = function (utftext) {
	    var string = '';
	    var i = 0;
	    var c = 0;
	    var c1 = 0;
	    var c2 = 0;
	    var c3 = 0;
	    while (i < utftext.length) {
	        c = utftext.charCodeAt(i);
	        if (c < 128) {
	            string += String.fromCharCode(c);
	            i++;
	        }
	        else if ((c > 191) && (c < 224)) {
	            c2 = utftext.charCodeAt(i + 1);
	            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	            i += 2;
	        }
	        else {
	            c2 = utftext.charCodeAt(i + 1);
	            c3 = utftext.charCodeAt(i + 2);
	            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	            i += 3;
	        }
	    }
	    return string;
	};
	var Base64 = function () {
	    var  keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	    this.encode = function (input) {
	        var output = '';
	        var chr1;
	        var chr2;
	        var chr3;
	        var enc1;
	        var enc2;
	        var enc3;
	        var enc4;
	        var i = 0;
	        var input = utf8Encode(input);
	        while (i < input.length) {
	            chr1 = input.charCodeAt(i++);
	            chr2 = input.charCodeAt(i++);
	            chr3 = input.charCodeAt(i++);
	            enc1 = chr1 >> 2;
	            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	            enc4 = chr3 & 63;
	            if (isNaN(chr2)) {
	                enc3 = enc4 = 64;
	            }
	            else if (isNaN(chr3)) {
	                enc4 = 64;
	            }
	            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	        }
	        return output;
	    };
	    this.decode = function (input) {
	        if (input.indexOf('appid') !== -1 || input.indexOf('smqid') !== -1 || input.indexOf('adList') !== -1) {
	            return input;
	        }
	        var output = '';
	        var chr1;
	        var chr2;
	        var chr3;
	        var enc1;
	        var enc2;
	        var enc3;
	        var  enc4;
	        var i = 0;
	        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
	        while (i < input.length) {
	            enc1 = keyStr.indexOf(input.charAt(i++));
	            enc2 = keyStr.indexOf(input.charAt(i++));
	            enc3 = keyStr.indexOf(input.charAt(i++));
	            enc4 = keyStr.indexOf(input.charAt(i++));
	            chr1 = (enc1 << 2) | (enc2 >> 4);
	            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
	            chr3 = ((enc3 & 3) << 6) | enc4;
	            output = output + String.fromCharCode(chr1);
	            if (enc3 !== 64) {
	                output = output + String.fromCharCode(chr2);
	            }
	            if (enc4 !== 64) {
	                output = output + String.fromCharCode(chr3);
	            }
	        }
	        output = utf8Decode(output);
	        return output;
	    };
	};
	var encodeURIStr = function (str) {
		var result = encodeURIComponent(JSON.stringify(str));
		return result;
	};
    var ipLoad = function (callback) {
        var url = 'https://mipp.iask.cn/iplookup/search?format=json&callback=?';
        try {
            $.getJSON(url, function (data) {
                callback(data);
            });
        }
      catch (e) {}
    };
    var hotRecommend = function (url, img, title, statsBaid, pos) {
        var htmls = '';
        htmls += '<li>';
        if (pos === '') {
            htmls += '<div href=' + url + ' target=\'_blank\' class=\'href_log\'' + statsBaid + '>';
        }
        else {
            htmls += '<div href=' + url + ' target=\'_blank\' pos=' + pos + 'class=\'href_log\'' + statsBaid + '>';
        }
        htmls += '<mip-img class=\'mip-img\' src=' + img + '>';
        htmls += '<p class=\'mip-img-subtitle\'>' + title + '</p>';
        htmls += '</mip-img>';
        htmls += '</div></li>';
        return htmls;
    };
    var hotSpot = function (url, title) {
        var htmls = '';
        htmls += '<li><a href=' + url + ' target=\'_blank\' class=\'href_log\'>' + title + '</a></li>';
        return htmls;
    };
    var getChannel = function () {
        var list = {};
        var $channelSource = $('.channel_source');
        $channelSource.find('li').each(function (){
        	var txt = $(this).attr('txt');
        	var val = $(this).attr('val');
        	list[txt] = val;
        });
        return list;
    };
    var getUserId = function (source, uid, adOwnerId) {
        if (source === '202' || source === '500' || source === '501'
        || source === '600' || source === '700' || source === '800') {
            return uid;
        }
        else if (source === '1000') {
            return adOwnerId;
        }
        return '';
    };
    var advLogInfo = function (sourceType, mode) {
        var $that = $('.paramDiv');
        var qid = $that.attr('qid') || '';
        var materialTag = $that.attr('mainTags') || '';
        var ip = '';
        var province = '';
        var city = '';
        var qcid = $that.attr('qcid') || '';
        var cid = $that.attr('cid') || '';
        var uid = $that.attr('uid') || '';
        var adOwnerId = $that.attr('adOwnerId') || '';
        var source = getChannel()[sourceType] || 999;
        uid = getUserId(source, uid, adOwnerId) || busUid;
        var pos = $that.attr('pos') || '';
        var pv = '';
        ipLoad(function (data) {
            ip = data.ip || '';
            province = data.province || '';
            city = data.city || '';
            if (!!materialTag) {
                materialTag = materialTag.replace('[', '').replace(']', '');
            }
            pv = encodeURI('pv=' + mode + '_' + qid + '_' + ip + '_' + province + '_' + city + '_' + materialTag
            + '_' + qcid + '_' + cid + '_' + source + '_' + uid + '_' + pos);
            var url = 'https://mipp.iask.cn/advLogInfo?' + pv;
            $.ajax({
                type: 'GET',
                url: url
            });
        });
    };
    var advLogInfoClick = function () {
        var sources = $('.business_source').attr('sources') || $('.business_source_type').attr('sourceType');
        $('.href_log').click(function () {
            if (sources === 'COMMERCIAL_ZWZD') {
                sources = 'COOPERATE_COMMERCIAL';
            }
            var pos = $(this).attr('pos');
            $('.paramDiv').attr('pos', pos);
            advLogInfo(sources, 1);
            var url = $(this).attr('href');
            window.open(url);
        });
    };
    var subStringIask = function (str, size) {
        if (!str) {
            return '';
        }
        if (str.length > size) {
            return str.substring(0, size) + '...';
        }
        return str;
    };
 // 动态添加 mip-fixed悬浮广告
    var putMXfAd = function (picLink, picLocal, statsBaidu, pos) {
        var htmls = '';
        htmls += '<mip-fixed type=\'top\' id=\'customid\' >';
        htmls += '<div class=\'mip-adbd\'>';
        htmls += '<div on=\'tap:customid.close\' class=\'mip-adbd-close\'><span>关闭</span></div>';
        if (pos === '') {
            htmls += '<div href=' + picLink + ' class=\'href_log\' ' + statsBaidu + '>';
        }
        else {
            htmls += '<div href=' + picLink + ' pos=' + pos + ' class=\'href_log\'' + statsBaidu + '>';
        }
        htmls += '<mip-img class=\'mip-img bottom-img\' src=' + picLocal + '></mip-img>';
        htmls += '</div>';
        htmls += '<span class=\'icon-bai-bottom\'></span>';
        htmls += '</div></mip-fixed>';
        return htmls;
    };
    var putQiyeInfo = function (companyName, drName, website, picLocal, statsBaidu, pos) {
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        if(drName.length > 15) {
        	drName = drName.substring(0, 15);
        }
        var htmls = '<div class=\'firms-con href_log\' href=' + website + ' ' + statsBaidu + ' pos=' + pos + '>';
        htmls += '<div class=\'firms-pic\'>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><span class=\'name\'>' + companyName + '</span>';
        htmls += '<span class=\'time\'> 1小时前</span><span class=\'icon-tui\'>广告</span></p>';
        htmls += '<p>' + drName + '</p>';
        htmls += '</div>';
        htmls += '<span class=\'btn-ask \' >咨询专家</span>';
        htmls += '</div>';
        htmls += '</div>';
        var $qsBar = $('.qs_bar');
        var $qiyeDiv = $('.mip_as_other_qiye_div');
        if ($qsBar.length > 0) {
        	$qsBar.eq(0).empty();
        	$qsBar.eq(0).append(htmls);
        }
        else {
        	$qiyeDiv.eq(0).empty();
        	$qiyeDiv.eq(0).append(htmls);
        }
    };
    var putBrandQiyeInfo = function (companyName, drName, website, picLocal, statsBaidu, pos, brandLink) {
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        var htmls = '<div class=\'firms-con\' >';
        htmls += '<div class=\'firms-pic\' ><a href=' + brandLink + '>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</a></div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><a href=' + brandLink + '><span class=\'name \'>' + companyName + '</span></a>';
        htmls += '<span class=\'time\'> 1小时前</span><span class=\'icon-tui\'>广告</span></p>';
        htmls += '<p class=\' href_log\' href=' + website + ' ' + statsBaidu + ' pos=' + pos + '>' + drName + '</p>';
        htmls += '</div>';
        htmls += '<span class=\'btn-ask href_log\' href=' + website + ' ' + statsBaidu + ' pos=' + pos + '>咨询专家</span>';
        htmls += '</div>';
        htmls += '</div>';
        var $qsBar = $('.qs_bar');
        var $qiyeDiv = $('.mip_as_other_qiye_div');
        if ($qsBar.length > 0) {
        	$qsBar.eq(0).empty();
        	$qsBar.eq(0).append(htmls);
        }
        else {
        	$qiyeDiv.eq(0).empty();
        	$qiyeDiv.eq(0).append(htmls);
        }
    };
    var feedInfo = function (statsBaidu, userImg,useName, shortIntroduce, materialIntroduce, materialLink, picList, pos) {
        var i = 0;
        var objPicUrl = '<mip-img class="mip-img" src="' + userImg + '"></mip-img>';
        var $feedDiv = $('.youlai_feed_div');
        $feedDiv.find('.youlai_feed_title').text(materialIntroduce);
        $feedDiv.find('.youlai_feed_use_img').html(objPicUrl);
        $feedDiv.find('.youlai_feed_use_name').html(useName);
        $feedDiv.find('.youlai_feed_txt').text(shortIntroduce);
        $feedDiv.find('a').attr('pos', pos);
        $feedDiv.find('a').attr('href', materialLink);
        $feedDiv.find('a').attr('class', 'href_log');
        $feedDiv.find('a').attr('data-stats-baidu-obj', statsBaidu);
        $feedDiv.find('.youlai_feed').each(function () {
            $(this).append('<mip-img class="mip-img" src="' + picList[i++] + '"></mip-img>');
        });
        $feedDiv.show();
    };
    // 商业广告
    var busBottomAM = function () {
    	var $buttonDiv = $('.mip_as_bottm_div');
        $('.bus_bottom_div').find('div').each(function () {
            var area = $(this).attr('area');
            var imgurl = $(this).attr('imgurl');
            var picurl = $(this).attr('picurl');
            busUid = $(this).attr('uid');
            if (area === '') { // 区域为空表示投放全国
                var html = putMXfAd(imgurl, picurl, '', '');
                $buttonDiv.append(html);
            }
            else {
                ipLoad(function (data) {
                    if (area.indexOf(data.province) > -1) {
                        var html = putMXfAd(imgurl, picurl, '', '');
                        $buttonDiv.append(html);
                    }
                });
            }
        });
        $('.bus_hot_recommend_div').find('div').each(function () {
            var area = $(this).attr('area');
            var url = $(this).attr('texturl');
            var img = $(this).attr('img');
            busUid = $(this).attr('uid');
            var title = $(this).attr('imgtitle');
            if (area === '') {
                $('.hot-tui-list').append(hotRecommend(url, img, title, '', ''));
                $('.hot_recomd_div').show();
            }
            else {
                ipLoad(function (data) {
                    $('.hot-tui-list').append(hotRecommend(url, img, title, '', ''));
                    $('.hot_recomd_div').show();
                });
            }
        });
        $('.bus_hot_spot').find('div').each(function () {
            var area = $(this).attr('area');
            var url = $(this).attr('texturl');
            var title = $(this).attr('imgtitle');
            busUid = $(this).attr('uid');
            if (area === '') {
                $('.hot-point-list').append(hotSpot(url, title));
            }
            else {
                ipLoad(function (data) {
                    $('.hot-point-list').append(hotSpot(url, title));
                });
            }
        });
        advLogInfoClick();
    };
    var validatePut = function () {
        var $that = $('.paramDiv');
        var mmaintags = $that.attr('mainTags');
        var qcid = $that.attr('qcid') || '';
        var sources = $that.attr('sources');
        var version = $that.attr('version');
        var iscommercial = $that.attr('iscommercial');
        if ('COOPERATE_BRAND' === sources && version === '2') {
            return false;
        }
        if (iscommercial === 'true' && sources !== 'COOPERATE_COMMERCIAL') {    // 过滤掉第三合作广告
            return false;
        }
        if (qcid === '82' && (mmaintags.indexOf('财务税务') !== -1 || mmaintags.indexOf('商业工具') !== -1)) {
            return true;
        }
        return false;
    };
    var putTestButHtml = function (putUrl, picUrl) {
        var statsBaidu = 'data-stats-baidu-obj="%20%7B%22type%22:%22click%22,'
        + '%22data%22:%22%5B\'_setCustomVar\',%20\'100m,%20\'0\',%20\'8002m\'%5D%22%7D"';
        return putMXfAd(putUrl, picUrl, statsBaidu, '');
    };
    // 移除百度广告
    var removeBaiduAd = function () {
        $('.mip_as_haoping_div').remove();
        $('.mip_as_qita_div').remove();
        $('.mip_as_lswt_div').remove();
        $('.mip_as_xgzs_div').remove();
        $('.mip_as_jrjd').remove();
        $('.mip_dl_jrjd').remove();
        $('.mip_as_tbtj').remove();
        $('.mip_dl_tbtj').remove();
        $('.mip_as_djgz').remove();
        $('.mip_as_wzss').remove();
        $('.load_recom_red').remove();   // 推荐阅读
        $('.load_today_focus').remove(); // 今日焦点
        $('.mip_ad_xgzs_div').remove();
        $('.mip_as_bottm_div').empty();
    };
    var youLai = function (data) {
    	var $buttonDiv = $('.mip_as_bottm_div');
        var json = data.adList;
        for (var key in json) {
            if (json[key].type === '4') {
                var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_1000", "skip", "MIP_SY_1000_top"]}';
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                $buttonDiv.empty();
                $buttonDiv.append(putMXfAd(json[key].picLink, json[key].picUrl, baiduObj, ''));
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName || '';
                var drName   = obj.drName  || '';
                var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_1000", "skip", "MIP_SY_1000_qy"]}';
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                putQiyeInfo(drName, companyName, data.website, obj.picUrl, baiduObj, '');
            }
            else if (json[key].type === '5') {
                var obj2 = {};
                for (var k in json) {
                    if (json[k].type === '3') {
                        obj2 = json[k];
                    }
                }
                var obj = json[key];
                var picList = obj.picList;
                var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_1000", "skip", "MIP_SY_1000_feed"]}';
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                feedInfo(baiduObj, obj2.picUrl, obj2.companyName, obj.title, obj.describe, obj.picLink, picList, '');
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_1000", "skip", "MIP_SY_1000_mpic"]}';
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    $('.hot-tui-list').append(hotRecommend(picLink, picUrl, describe, baiduObj, ''));
                    $('.hot_recomd_div').show();
                }
            }
        }
        advLogInfoClick();
    };
    
    var brandMedical = function (data) { // 品牌医疗
        var json = data.adList;
        var qiyeData = null;
        var $buttonDiv = $('.mip_as_bottm_div');
        for (var k in json) {
        	if (json[k].adType === 3) {
        		qiyeData = json[k];
        	}
        }
        for (var key in json) {
            if (json[key].adType === 1) {
            	var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_800", "skip", "MIP_SY_800_top"]}';
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                $buttonDiv.empty();
                $buttonDiv.append(putMXfAd(json[key].materialLink, json[key].materialImg, statsBaidu, ''));
            }
            else if (json[key].adType === 3) {  // 企业信息
                var obj = qiyeData;
                var companyName = obj.shortIntroduce || '';
                var drName   = obj.brandName  || '';
                var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_800", "skip", "MIP_SY_800_qy"]}';
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                putQiyeInfo(drName, companyName, obj.materialLink, obj.materialImg, statsBaidu, '');
            }
            else if (json[key].adType === 5) {
            	var obj = json[key];
    			var picList = new Array(0);
    			var materImg = obj.materialImg.split(",");
    			for(var k in materImg) {
    				picList.push(materImg[k]);
    			}
                var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_800", "skip", "MIP_SY_800_feed"]}';
                var statsBaidu = encodeURIStr(tempStr);
                feedInfo(statsBaidu, qiyeData.materialImg, qiyeData.brandName, obj.materialIntroduce, obj.shortIntroduce, obj.materialLink, picList, '');
            }
            else if (json[key].adType === 6) {
                var obj = json[key];
                var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_800", "skip", "MIP_SY_800_mpic"]}';
                var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
                var arrayPic = new Array(0);
    			var arrayDesc = new Array(0);
    			var materImg = obj.materialImg.split(",");
    			var materDesc = obj.materialIntroduce.split("|");
    			for(var index in materImg) {
    				arrayPic.push(materImg[index]);
    				arrayDesc.push(materDesc[index]);
    			}
                for (var pic in arrayPic) {
                    var picLink = obj.materialLink;
                    var picUrl = arrayPic[pic];
                    var describe = arrayDesc[pic];
                    $('.hot-tui-list').append(hotRecommend(picLink, picUrl, describe, statsBaidu, ''));
                    $('.hot_recomd_div').show();
                }
            }
        }
        advLogInfoClick();
    };
    
    var tianZhu = function (data) {
        removeBaiduAd();
        var $buttonDiv = $('.mip_as_bottm_div');
        var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_300", "skip", "MIP_SY_300_sj"]}';
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        $buttonDiv.empty();
        $buttonDiv.append(putMXfAd(data.pics[3].picLink, data.pics[3].picLocal, statsBaidu, ''));
        advLogInfoClick();
    };
    // 商业广告标准版企业信息
    var commercialSqc  = function (divData, commercialStandardHover) {
    	var $buttonDiv = $('.mip_as_bottm_div');
        var tempStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_600", "skip", "MIP_SY_600_2_qy"]}';
        var statsBaidu = 'data-stats-baidu-obj="' + encodeURIStr(tempStr) + '"';
        var imgsrc = divData.attr('imgsrc');
        var brandname = divData.attr('brandname');
        var link = divData.attr('link');
        var introduce = divData.attr('introduce');
        var uid =  divData.attr('uid');
    	var brandLink = 'http://m.iask.sina.com.cn/brand/' + uid + '.html';
    	putBrandQiyeInfo(brandname, introduce, link, imgsrc, statsBaidu, '', brandLink);
        var tImgSrc = commercialStandardHover.attr('imgsrc');
        var tLink = commercialStandardHover.attr('link');
        var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_600", "skip", "MIP_SY_600_2_top"]}';
        var baiduTop = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
        $buttonDiv.empty();
        $buttonDiv.append(putMXfAd(tLink, tImgSrc, baiduTop, ''));
        advLogInfoClick();
    };
    var loadAd = function (sources, openId, div, questionId, version) {
        var type = '';
        if (sources === 'COOPERATE_HUASHENG') {
            type = 'HS';
        }
        else if (sources === 'COOPERATE_HUASHENG_QA') {
            type = 'HSQA';
        }
        else if (sources === 'COOPERATE_YOULAI') {
            type = 'YL';
        }
        else if (sources === 'COOPERATE_TIANZHU') {
            type = 'TZ';
        }
        else if(sources === 'COOPERATE_BRAND_MARKET' && version === '4') {
        	type = 'PPYL';
        }
        else if (type === '') {
            return;
        }
        var url = 'https://mipp.iask.cn/t/wlsh?openCorporationId=' + openId + '&type=' + type +"&questionId=" + questionId + "&version=" + version;
        $.get(url,
        function (data) {
            var base = new Base64();
            var res = $.parseJSON(data);
            if (res.succ === 'Y') {
                var json = $.parseJSON(base.decode(res.html));
                var htmls = '';
                if (type === 'YL') {
                    youLai(json);
                    return;
                }
                if (type === 'TZ') {
                    tianZhu(json);
                    return;
                }
                if (type === 'XYH') {
                    isHuasheng = false;
                    htmls = putMXfAd(json.pics[1].picLink, json.pics[1].picLocal, '');
                }
                if (type === 'PPYL') {
                	brandMedical(json);
                	return;
                }
                else {
                    var pic = json.pics[3] || '';
                    htmls = putMXfAd(pic.picLink, pic.picLocal, '');
                    var companyName = json.companyName || '';
                    var drName = json.drName || '';
                    var website = json.website || '';
                    var pic = json.pics[0] || '';
                    putQiyeInfo(companyName, drName, website, pic.picLocal, '', '');
                }
                $(div).empty();
                $(div).append(htmls);
            }
            advLogInfoClick();
        });
    };
    // 加载url中的js
    var loadURLJS = function (tags, params, sourceType) {
        var url = 'https://mipp.iask.cn/mib/tag/';
        var arry = tags.split(':');
        for (var i = 0; i < arry.length; i++) {
            url = url + arry[i].replace('[', '').replace(']', '');
        }
        try {
            var province = ''; // 省份
            var city = ''; // 城市
            var ip = '';
            ipLoad(function (data) {
                province = data.province;
                city = data.city;
                ip = data.ip;
                $.get(url, function (datas) {
                    var res = '';
                    try {
                        res = $.parseJSON(datas);
                        if (res.succ === 'Y') { // 不等于空
                            var paramsArry = params.split(':');
                            var cmJsonData = $.parseJSON(res.html);
                            var lenGood = parseInt(paramsArry[0], 0); // 好评回答数量
                            var lenOther = parseInt(paramsArry[1], 0); // 普通答案数量
                            var qSourceType = paramsArry[2]; // 来源
                            var commercialSource = paramsArry[3]; // 商业广告类型
                            var qTags = paramsArry[4]; // 标签
                            var mainTags = paramsArry[5]; // 病种
                            var nowTime = getSysTime(); // 时间
                            var qCid = paramsArry[6] || '79';
                            var bCid = paramsArry[7];
                            var sCid = paramsArry[8];
                            var qid = paramsArry[9];
                            if ('undefined' !== typeof cmJsonData) {
                                var param = loadInit({
                                    mainTags: mainTags,
                                    province: province,
                                    qCid: qCid,
                                    bCid: bCid,
                                    city: city,
                                    lenGood: lenGood,
                                    lenother: lenOther,
                                    commercialSource: commercialSource,
                                    qSourceType: qSourceType,
                                    qTags: qTags,
                                    nowTime: nowTime
                                });
                                loadData(param, cmJsonData);
                                advLogInfo(sourceType, 0);
                            }
                        }
                    } catch (e) {}
                });
            });
        }
        catch (e) {
        }

    };

    var loadInit = function (options) {
        var defaults = {
            province: '',
            lenGood: 0,
            lenother: 0,
            commercialSource: '',
            qSourceType: ''
        };
        var opts = $.extend(defaults, options);
        return opts;
    };

    var loadData = function (options, cmJsonData) {
        var iscmBy = false;
        if (options.commercialSource === 'COMMERCIAL_ZWZD' || options.qSourceType === 'COOPERATE_SOUTHNETWORK'
        || options.qSourceType === 'COOPERATE_HUASHENG'
        || options.qSourceType === 'COOPERATE_HUASHENG_QA') {
            return iscmBy;
        }
        // 如果ip获取不到城市信息，则根据省份进行广告主病种随机投放
        if (!options.city) {
            return noCityPutAd(options, cmJsonData);
        }
        $.each(cmJsonData,
        function (index) {
            try {
                var val = cmJsonData[index];
                var qTags = val.qTags;
                var mainTags = val.mainTags;
                var startTime = val.startTime;
                var endTime = val.endTime;
                var province = '不限';
                var nprovince = '不限';
                var city = '不限';
                var ncity = '不限';
                if (!!val.city) {
                    city = val.city;
                }
                if (!!val.ncity) {
                    ncity = val.ncity;
                }
                if (!!val.province) {
                    province = val.province;
                }
                if (!!val.nprovince) {
                    nprovince = val.nprovince;
                }
                if (options.qCid === '79' || options.bCid === '147') {
                    if (checkTime(options.nowTime, startTime, endTime)
                    && checkProvince(options.province, province, nprovince)
                    && checkCity(options.city, city, ncity)
                    && checkTag(options.qTags, qTags, options.mainTags, mainTags)) {
                        adPut(val, options);
                        iscmBy = true;
                    }
                }
            }
            catch (e) {}
        });
        return iscmBy;
    };

    var adPut = function (val, options) {
        if (val === undefined) {
            return;
        }
        var adPosition = val.adPosition;
        var arry = adPosition.split(',');
        for (var i = 0; i < arry.length; i++) {
            callMethod(arry[i], val, options);
        }
    };
    var callMethod = function (tp, val, options) {
        try {
            if (tp === '1') {
                put1(val, options);
            } else if (tp === '2') {
                put2(val, options);
            } else if (tp === '3') {
                put3(val, options);
            }
        }
        catch (e) {}
    };
    var putAppend = function (pos, options, htmls) {
    };
    var put1 = function (val, options) {
        putAppend(1, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo, '', ''));
    };
    var put2 = function (val, options) {
        putAppend(2, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo, '', ''));
    };
    var put3 = function (val, options) {
    	var $buttonDiv = $('.mip_as_bottm_div');
    	$buttonDiv.empty();
    	$buttonDiv.append(putMXfAd(val.url, val.mSuspensionImage, '', ''));
    };

    function noCityPutAd(options, cmJsonData) {
        var iscmBy = false;
        var arr1 = new Array(0);
        var arr2 = new Array(0);
        var arr3 = new Array(0);
        $.each(cmJsonData,
        function (index) {
            try {
                var val = cmJsonData[index];
                var qTags = val.qTags;
                var mainTags = val.mainTags;
                var startTime = val.startTime;
                var endTime = val.endTime;
                var province = '不限';
                var nprovince = '不限';
                if (!!val.province) {
                    province = val.province;
                }
                if (!!val.nprovince) {
                    nprovince = val.nprovince;
                }
                if (options.qCid === '79' || options.bCid === '147') {
                    if (checkTime(options.nowTime, startTime, endTime)
                    && checkProvince(options.province, province, nprovince)
                    && checkTag(options.qTags, qTags, options.mainTags, mainTags)) {
                        var adPosition = val.adPosition;
                        var arry = adPosition.split(',');
                        for (var i = 0; i < arry.length; i++) {
                            if (arry[i] === '1') {
                                arr1.push(val);
                            }
                            if (arry[i] === '2') {
                                arr2.push(val);
                            }
                            if (arry[i] === '3') {
                                arr3.push(val);
                            }
                            iscmBy = true;
                        }

                    }
                }
            }
            catch (e) {}
        });
        if (arr1.length > 0) {
            var index1 = fRandomBy(0, arr1.length - 1);
            adPut(arr1[index1], options);
        }
        if (arr2.length > 0) {
            var index2 = fRandomBy(0, arr2.length - 1);
            adPut(arr2[index2], options);
        }
        if (arr3.length > 0) {
            var index3 = fRandomBy(0, arr3.length - 1);
            adPut(arr3[index3], options);
        }
        return iscmBy;
    }
    var checkTime = function (nowTime, startTime, endTime) {
        if (startTime <= nowTime && nowTime < endTime) {
            return true;
        }
        return false;
    };
    var checkCity = function (city, putCity, nCity) {
        if (nCity.indexOf(city) !== -1) {
            return false;
        }
        if (putCity === '不限') {
            return true;
        }
        if (putCity.indexOf(city) !== -1) {
            return true;
        }
        return false;
    };
    var checkProvince = function (province, putProvince, nprovince) {
        if (nprovince.indexOf(province) !== -1 && nprovince !== '不限') {
            return false;
        }
        if (putProvince === '不限') {
            return true;
        }
        if (putProvince.indexOf(province) !== -1) {
            return true;
        }
        return false;
    };
    var checkTag = function (tag, putTag, mainTags, putMainTags) {
        if (!!putTag) {
            var arr = putTag.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (tag.indexOf(arr[i]) !== -1) {
                    return true;
                }
            }
        }
        if (!!putMainTags) {
            var arr = putMainTags.split(',');
            for (var i = 0; i < arr.length; i++) {
                if (mainTags.indexOf(arr[i]) !== -1) {
                    return true;
                }
            }
        }
        return false;
    };
    var fRandomBy = function (under, over) {
        switch (arguments.length) {
            case 1 :
                return parseInt((Math.random() * under + 1), 0);
            case 2:
                return parseInt((Math.random() * (over - under + 1) + under), 0);
            default:
                return 0;
        }
    };
    var getSysTime = function () {
        var mydate = new Date();
        var month = mydate.getMonth() + 1;
        var day = mydate.getDate();
        var hours = mydate.getHours();
        var minutes = mydate.getMinutes();
        var seconds = mydate.getSeconds();
        return mydate.getFullYear() + '-' + (month < 10 ? '0' + month : month)
        + '-' + (day < 10 ? '0' + day : day) + ' ' + (hours < 10 ? '0' + hours : hours)
        + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    };
    // 广告
    var currencyAM = function (sourceType, openId, questionId, version) {
        loadAd(sourceType, openId, '.mip_as_bottm_div', questionId, version);
    };
    // 南方网通底部悬浮广告
    var southnetwork = function (openId, div) {
        var url = 'https://imgv2-ssl.g3user.com/api/iask.php?uid=' + openId + '&type=m&callback=?';
        try {
            $.getJSON(url, function (data) {
                var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_100", "skip", "MIP_SY_100_sj"]}';
                var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
                var htmls = putMXfAd(data.mobile.link, data.mobile.pic, baiduObj, '');
                $(div).empty();
                $(div).append(htmls);
                putQiyeInfo(data.logo.brand, data.logo.intro, data.logo.link, data.logo.pic, baiduObj, '');
                if(data.feed !== null && data.feed.length > 0) {
                	for(var index in data.feed) {
                		var picLink = data.feed[index].link;
                		var picUrl = data.feed[index].pic;
                		var picDesc = data.feed[index].title;
                		$('.hot-tui-list').append(hotRecommend(picLink, picUrl, picDesc, baiduObj, ''));
                	}
                	$('.hot_recomd_div').show();
                }
                advLogInfoClick();
                
            });
        }
        catch (e) {}
    };
    // 商业效果广告
    var effectAvertisement = function (questionId, sourceType) {
        ipLoad(function (data) {
            var provinceCode = data.provinceCode;
            var url = 'https://mipp.iask.cn/mib/tag/test?q=' + questionId + '&c=' + provinceCode;
            try {
                $.getJSON(url, function (res) {
                    if (res.jsonData != null) {
                        advEffectCallBack(res.jsonData);
                        advLogInfo(sourceType, 0);
                    }
                    else {
                        advLogInfo('', 0);
                    }
                });
            }
            catch (e) {
            }
        });
    };
    var advEffectCallBack = function (dd) {
        var list = dd.materialList;
        var ve = dd.version;
        var channelCode = dd.channelCode;
        $('.paramDiv').attr('uid', dd.userId);
        if ("2" !== ve) {
        	// 如果不是标准版，则删除百度广告
        	removeBaiduAd();
        }
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (ve === '1') {
                showEffectAdv(obj, 1, channelCode);
            }
            else if (ve === '2') {
                showEffectAdv(obj, 2, channelCode);
            }
			else {
                showEffectAdv(obj, 3, channelCode);
            }
        }
        var baiduStr = '{"type":"load", "data":["_setPageTag", "MIP_SY_700", "skip", "MIP_SY_效果广告"]}';
        var baiduObj = '<div data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '" ></div>';
        $('.baidu_label_div').append(baiduObj);
        advLogInfoClick();
    };
    var showEffectAdv = function (json, tp, channelCode) {
    	var $buttonDiv = $('.mip_as_bottm_div');
        if (json.adType === '3') {
            var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_700", "skip", "MIP_SY_700_' + tp + '_qiye"]}';
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var brandLink = '';
            var uid = $('.paramDiv').attr('uid');
            if('10002' === channelCode) {
            	brandLink = json.materialLink;  // 南方网通效果广告-链接跳转自己的物料链接
            }
            else {
            	brandLink = 'http://m.iask.sina.com.cn/brand/' + uid + '.html';
            }
            putBrandQiyeInfo(json.brandName, json.shortIntroduce, json.materialLink, json.materialImg, baiduObj, '', brandLink);
            return;
        }
        if (json.adType === '2') {
            return;
        }
        // 旗舰版feed
        if (json.adType === '5') {
            var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_700", "skip", "MIP_SY_700_' + tp + '_feed"]}';
            var materialImg = json.materialImg;
            var picList = materialImg.split(',');
            var picUrl = 'http://tp2.sinaimg.cn/1169181841/50/0/1';
            feedInfo(encodeURIStr(baiduStr), picUrl, json.brandName, json.shortIntroduce, json.materialIntroduce, json.materialLink, picList, '');
            return;
        }
        // 旗舰版-顶部悬浮
        if (json.materialType === '5' && tp === 1) {
            var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_700", "skip", "MIP_SY_700_' + tp + '_top"]}';
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $buttonDiv.empty();
            $buttonDiv.append(htmls);
            return;
        }
        // 标准版顶部悬浮
        if (json.materialType === '5' && tp === 2) {
            var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_700", "skip", "MIP_SY_700_' + tp + '_top"]}';
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $buttonDiv.empty();
            $buttonDiv.append(htmls);
            return;
        }
        // 专业版-顶部悬浮
        if (json.materialType === '5' && tp === 3) {
            var baiduStr = '{"type":"click", "data":["_setCustomVar", "MIP_SY_700", "skip", "MIP_SY_700_' + tp + '_top"]}';
            var baiduObj = 'data-stats-baidu-obj="' + encodeURIStr(baiduStr) + '"';
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj, '');
            $buttonDiv.empty();
            $buttonDiv.append(htmls);
            return;
        }
    };
    var brandAvertisement = function (sourceType) {
        advLogInfo(sourceType, 0);
        advLogInfoClick();
    };
    // 保险广告
    var iAskDisplayHtml = {
        iaskCallMethod: function (opts) {
            var type = opts.type;
            var dsbo = this.iaskInsuranceLabel(type);
            if (type === '1') {
                this.topSuspension(opts, dsbo);		// 顶部悬浮
            }
            else if (type === '2') {
                this.answerInfo(opts, dsbo);			// 企业信息
            }
            else if (type === '3') {
                this.image(opts, dsbo);
            }
            else if (type === '4') {
                this.hot(opts, dsbo);	   // 热门推荐
            }
            else if (type === '5') {
                this.feed(opts, dsbo);			// feed 广告
            }
            else if (type === '6') {
                this.wenzilian(opts, dsbo);	// 文字链接
            }
            else if (type === '7') {
                this.tuijian(opts, dsbo);	// 推荐
            }
            else if (type === '8') {
                this.info(opts, dsbo);
            }
        },
        getUUid: function () {  // 随机ID
            return 'iAsk-uuid-' + Math.random().toString(36).slice(2);
        },
        topSuspension: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var $buttonDiv = $('.mip_as_bottm_div');
            $buttonDiv.empty();
            $buttonDiv.append(putMXfAd(opts.picLink, opts.mPicUrl, statsBaidu, opts.type));
        },
        answerInfo: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            putQiyeInfo(opts.drName, opts.companyName, opts.website, opts.picUrl, statsBaidu, opts.type);
        },
        feed: function (opts, dsbo) {
            var object = this.conversionsObject(opts);
            feedInfo(dsbo, object.picUrl, object.companyName, object.title, object.describe, object.picLink, object.picList, object.type);
        },
        hot: function (opts, dsbo) {
            var object = this.conversionsObject(opts);
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            for (var pic in object.adDetailList) {
                var picUrl = object.adDetailList[pic].picUrl;
                var describe = object.adDetailList[pic].describe;
                $('.hot-tui-list').append(hotRecommend(object.picLink, picUrl, describe, statsBaidu, object.type));
            }
            $('.hot_recomd_div').show();
        },
        tuijian: function (opts, dsbo) {
        	var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="api-pic-con" url="' + object.picLink + '" pos="' + object.type + '"';
            html += 'czctype="' + object.czctype + '" czcskip="skip" czcintroduce="' + object.czcintroduce + '">';
            html += '<h2 class="api-pic-title">为您推荐<span class="icon-bai"></span></h2>';
            html += '<ul class="api-pic-list">';
            html += '<li><div class="href_log" href=' + object.picLink + ' pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src=' + object.adDetailList[0].picUrl + '></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[0].describe + '</p></div></li>';
            html += '<li><div class="href_log" href=' + object.picLink + ' pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src=' + object.adDetailList[1].picUrl + '></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[1].describe + '</p></div></li>';
            html += '<li><div class="href_log" href=' + object.picLink + ' pos="' + object.type + '" ' + statsBaidu + '>';
            html += '<mip-img class=\'mip-img\' src=' + object.adDetailList[2].picUrl + '></mip-img>';
            html += '<p class=\'mip-img-subtitle\'>' + object.adDetailList[2].describe + '</p></div></li>';
            html += '</ul></div>';
            $('.wj_relative_kownlege').append(html);
        },
        wenzilian: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<ul class="answer-list mt0">';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '" ';
            html += 'href="' + object.adDetailList[0].picUrl + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[0].describe, 8) + '</a></li>';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '"';
            html += 'href="' + object.adDetailList[1].picUrl + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[1].describe, 8) + '</a></li>';
            html += '<li><a class="href_log" target=\'_blank\'  pos="' + object.type + '"';
            html += 'href="' + object.adDetailList[2].picUrl + '" ' + statsBaidu + '>';
            html += subStringIask(object.adDetailList[2].describe, 8) + '</a>';
            html += '<span class="recommend-txtlink-tui2 fr"><span class="icon-bai"></span></li>';
            html += '</ul>';
            $('.wj_wait_question_as').append(html);
        },
        image: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="api-pic-con href_log" href="' + object.picLink + '"';
            html += 'pos=' + object.type + ' ' + statsBaidu + '>';
            html += '<mip-img class="mip-img height105" src="' + object.picUrl + '">';
            html += '</mip-img><span class=\'icon-tui\'>广告</span></div>';
            $('.wj_djgz_as').append(html);
        },
        info: function (opts, dsbo) {
            var statsBaidu = 'data-stats-baidu-obj="' + dsbo + '"';
            var object = this.conversionsObject(opts);
            var html = '<div class="recommend-me-main recoTYmain" url="' + object.picLink + '"';
            html += 'pos="' + object.type + '" czctype="' + object.czctype + '" czcskip="skip"';
            html += 'czcintroduce="' + object.czcintroduce + '">';
            html += '<ul class="recommend-me-ul">';
            html += '<li class="recommend-me-txt fl">';
            html += '<p class=\'recommend-me-tatle\'> <a class="href_log" target=\'_blank\'';
            html += 'href=' + object.picLink + ' pos="' + object.type + '"';
            html += statsBaidu + '>' + object.title + '</a></p>';
            html += '<p class="recommend-me-link"><span><a class="href_log" target=\'_blank\'';
            html += 'href="' + object.picLink + '" pos="' + object.type + '" ' + statsBaidu + '>';
            html += '查看详情 &gt;</a></span><span class="recommend-me-tui2 fr"><span class="icon-bai"></span></span></p>';
            html += '</li>';
            html += '<li class="recommend-me-img fl"><mip-img class="mip-img"';
            html += 'src="' + object.picUrl + '"></mip-img></li>';
            html += '</ul></div>';
            $('.wj_hot_top_as').append(html);
        },
        iaskInsuranceLabel: function (type) {
            var dsbo = $('.iaskInsuranceDsbo').attr('dsbo');
            return dsbo.replace('number', type);
        },
        conversionsObject: function (opts) {
            var nObject = opts;
            nObject.title = opts.title || '';
            nObject.picLink  = opts.picLink  || '';
            nObject.picList  = opts.picList  || {};
            nObject.describe = opts.describe || '';
            nObject.picUrl   = opts.picUrl || '';
            nObject.czctype  = 'MIP_SY_901';
            nObject.czcintroduce  = 'MIP_SY_901_' + opts.type;
            nObject.companyName = opts.companyName  || '';
            nObject.pos  = opts.pos || '';
            return nObject;
        }
    };
    var iaskInsurance = function (data) {
        try {
            var base = new Base64();
            var res = $.parseJSON(data);
            var json = null;
            if (res.succ === 'Y') {
                json = $.parseJSON(base.decode(res.html));
            }
            else {
                return;
            }
            var url = json.website;
            // 去掉百度广告
            removeBaiduAd();
            for (var index in json.adList) {
                var obj = json.adList[index];
                obj.website = url;
                iAskDisplayHtml.iaskCallMethod(obj);
            }
            if (typeof data.successCallBack === 'function') {
                data.successCallBack();
            }
            // 给点击事件做来源
            $('.business_source').attr('sources', 'COOPERATE_BAOXIAN');
            advLogInfo('COOPERATE_BAOXIAN', 0);
            advLogInfoClick();
        }
        catch (e) {
            console.log(e);
            if (typeof data.failCallBack === 'function') {
                data.failCallBack();
            }
        }
    };
    // 选择投放广告
    var selectAS = function () {
        var $businessSource = $('.business_source');
        var sources = $businessSource.attr('sources');
        var version = $businessSource.attr('version');
        var mainTags  = $('.paramDiv').attr('maintags');
        var sourceType = $('.business_source_type').attr('sourceType');
        var openId = $('.business_source_type').attr('openId');
        var tags = $('.business_source_type').attr('tags');
        var params = $('.business_source_type').attr('params');
        var questionId = $('.paramDiv').attr('qid');
        var cid = $('.paramDiv').attr('cid');
        if (sources === 'COMMERCIAL_IAD' || sources === 'COMMERCIAL_ZWZD' || sources === 'COMMERCIAL_CAD') {
            // 商业广告
            removeBaiduAd();
            busBottomAM();
            if (sources === 'COMMERCIAL_ZWZD') {
                sources = 'COOPERATE_COMMERCIAL';
            }
            advLogInfo(sources, 0);
        }
        else if ((sources === 'COOPERATE_BRAND' || sources === 'COOPERATE_BRAND_MARKET')
        		&& (version === '1' || version === '3')) {
            // 商业广告-旗舰版、专业版本
            brandAvertisement(sources);
        }
        else if (sourceType === 'COOPERATE_BRAND' && version === '2') {
            // 商业广告-标准版
            var $commercialSqc = $('.commercialStandard_qiye_cp');
            var $commercialStandardHover = $('.commercialStandardHover');
            $businessSource.attr('sources', 'COOPERATE_BRAND');
            commercialSqc($commercialSqc, $commercialStandardHover);
            advLogInfo('COOPERATE_BRAND', 0);
        }
        else if (sourceType === 'COOPERATE_HUASHENG' || sourceType === 'COOPERATE_HUASHENG_QA'
        	|| sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU' || sourceType === 'COOPERATE_BRAND_MARKET') {
            // 第三方合作广告
            if (sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU'
            	|| (sourceType === 'COOPERATE_BRAND_MARKET' && version === '4')) {
                // 需要删除百度广告
                removeBaiduAd();
            }
            currencyAM(sourceType, openId, questionId, version);
            advLogInfo(sourceType, 0);
        }
        else if (sourceType === 'COOPERATE_SOUTHNETWORK') {
            // 南方网通广告
            removeBaiduAd();
            southnetwork(openId, '.mip_as_bottm_div');
            advLogInfo(sourceType, 0);
        }
        else if ('182' === cid && (mainTags.indexOf('意外险') > -1
        || mainTags.indexOf('品牌词') > -1 || mainTags.indexOf('少儿险') > -1
        || mainTags.indexOf('重疾险') > -1)) {
            var nowTime = getSysTime();
            var startTime = $('.bxStartTime').text();
            var endTime   = $('.bxEndTime').text();
            if (startTime <= nowTime && nowTime < endTime) {
                // 商业广告-保险标签投放
                var url = 'https://mipp.iask.cn/t/wlsh?type=BX&bxt=';
                if (mainTags.indexOf('少儿险') > -1) {
                    url += 'jl';
                }
                else if (mainTags.indexOf('品牌词') > -1 || mainTags.indexOf('意外险') > -1) {
                    url += 'at';
                }
                else if (mainTags.indexOf('重疾险') > -1) {
                    url += 'il';
                }
                $.get(url, function (data) {
                    iaskInsurance(data);
                });
            }
        }
        else if (sourceType !== 'COOPERATE_HUASHENG' && sourceType !== 'COOPERATE_HUASHENG_QA') {
            if (tags) {
                loadURLJS(tags, params, sourceType);
            }
            if ($('.href_log').length === 0) {
                sourceType = 'COOPERATE_EFFECT';
                $businessSource.attr('sources', sourceType);
                // 商业效果广告
                effectAvertisement(questionId, sourceType);
            }
        }
    };
    var effects = {
            newLoadAd: function () {
                selectAS();
            },
            commercialLoad: function () {
            	var $buttonDiv = $('.mip_as_bottm_div');
                if (validatePut()) {
                    var nowTime = getSysTime();
                    var startTime = $('.yongyouStartTime').text();
                    var endTime   = $('.yongyouEndTime').text();
                    if (startTime <= nowTime && nowTime < endTime) {
                        // 删除百度广告
                        removeBaiduAd();
                        var putUrl = $('.yongyouPutUrl').text();
                        var picUrl = $('.yongyouPicUrl').text();
                        $buttonDiv.append(putTestButHtml(putUrl, picUrl));
                        var urlr = 'https://mipp.iask.cn/t/mipdf?t=yongyou';
                        $.ajax({
                            type: 'GET',
                            url: urlr,
                            dataType: 'html',
                            success: function (data) {
                                if (!!data) {
                                    $('.breadcast_middle_commercial').empty();
                                    $('.breadcast_middle_commercial').append(data);
                                    advLogInfoClick();
                                }
                            }
                        });
                        var $that = $('.paramDiv');
                        var sources = $that.attr('sources');
                        advLogInfo(sources, 0);
                    }
                }
            },
            init: function () {
                this.newLoadAd();
                this.commercialLoad();
            }
        };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        effects.init();
    };
    return customElem;
});
