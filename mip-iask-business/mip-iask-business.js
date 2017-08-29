/**
* @file 脚本支持
* @author hejieye
* @time  2017-08-24
* @version 2.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var busUid = '';
    var ipLoad = function (callback) {
        var url = 'https://mipp.iask.cn/iplookup/search?format=json&callback=?';
        try {
            $.getJSON(url, function (data) {
                callback(data);
            });
        }
      catch (e) {}
    };
    var hotRecommend = function (url, img, title, statsBaid) {
        var htmls = '';
        htmls += '<li>';
        htmls += '<a href=' + url + ' target=\'_blank\' class=\'href_log\'' + statsBaid + '>';
        htmls += '<mip-img class=\'mip-img\' src=' + img + '>';
        htmls += '<p class=\'mip-img-subtitle\'>' + title + '</p>';
        htmls += '</mip-img>';
        htmls += '</a></li>';
        return htmls;
    };
    var hotSpot = function (url, title) {
        var htmls = '';
        htmls += '<li><a href=' + url + ' target=\'_blank\' class=\'href_log\'>' + title + '</a></li>';
        return htmls;
    };
    var getChannel = function () {
        var list = {};
        list['COOPERATE_SOUTHNETWORK'] = 100;  // 南方网通
        list['COOPERATE_HUASHENG'] = 201;     // 华盛
        list['COOPERATE_HUASHENG_QA'] = 201;	 // 华盛QA
        list['COOPERATE_HUASHENG_BY'] = 202;	 // 华盛包月
        list['COOPERATE_TIANZHU'] = 300;		 // 天助
        list['"COOPERATE_XINYUHENG'] = 400;    // 新雨恒
        list['COOPERATE_COMMERCIAL'] = 500;	 // 商业自问自答
        list['COMMERCIAL_CAD'] = 501;	     // 商业纯广告
        list['COOPERATE_BRAND'] = 600;	     // 品牌自问自答
        list['COOPERATE_EFFECT'] = 700;	     // 效果广告
        list['COOPERATE_YOULAI'] = 1000;     // 有来
        return list;
    };
    var getUserId = function (source, uid, adOwnerId) {
        if (source === 202 || source === 500 || source === 501
        || source === 600 || source === 700) {
            return uid;
        }
        else if (source === 1000) {
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
        var pv = '';
        ipLoad(function (data) {
            ip = data.ip || '';
            province = data.province || '';
            city = data.city || '';
            if (!!materialTag) {
                materialTag = materialTag.replace('[', '').replace(']', '');
            }
            pv = encodeURI('pv=' + mode + '_' + qid + '_' + ip + '_' + province + '_' + city + '_' + materialTag
            + '_' + qcid + '_' + cid + '_' + source + '_' + uid + '_');
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
            advLogInfo(sources, 1);
            var url = $(this).attr('href');
            window.open(url);
        });
    };
 // 动态添加 mip-fixed悬浮广告
    var putMXfAd = function (picLink, picLocal, statsBaidu) {
        var htmls = '';
        htmls += '<mip-fixed type=\'top\' id=\'customid\' >';
        htmls += '<div class=\'mip-adbd\'>';
        htmls += '<div on=\'tap:customid.close\' class=\'mip-adbd-close\'><span>关闭</span></div>';
        htmls += '<div href=' + picLink + ' class=\'href_log\' ' + statsBaidu + '>';
        htmls += '<mip-img class=\'mip-img bottom-img\' src=' + picLocal + '></mip-img>';
        htmls += '</div>';
        htmls += '<span class=\'icon-bai-bottom\'></span>';
        htmls += '</div></mip-fixed>';
        return htmls;
    };
    var putQiyeInfo = function (companyName, drName, website, picLocal, statsBaidu) {
        if (companyName.length > 9) {
            companyName = companyName.substring(0, 9);
        }
        var htmls = '<div class=\'firms-con\'>';
        htmls += '<div class=\'firms-pic\'>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><span class=\'name\'>' + companyName + '</span>';
        htmls += '<span class=\'time\'> 1小时前</span><span class=\'icon-tui\'>广告</span></p>';
        htmls += '<p>' + drName + '</p>';
        htmls += '</div>';
        htmls += '<a href=' + website + ' target=\'_blank\' class=\'btn-ask href_log\' ' + statsBaidu + '>咨询专家</a>';
        htmls += '</div>';
        htmls += '</div>';
        return htmls;
    };
    // 商业广告
    var busBottomAM = function () {
        $('.bus_bottom_div').find('div').each(function () {
            var area = $(this).attr('area');
            var imgurl = $(this).attr('imgurl');
            var picurl = $(this).attr('picurl');
            busUid = $(this).attr('uid');
            if (area === '') { // 区域为空表示投放全国
                var html = putMXfAd(imgurl, picurl, '');
                $('.mip_as_bottm_div').append(html);
            }
            else {
                ipLoad(function (data) {
                    if (area.indexOf(data.province) > -1) {
                        var html = putMXfAd(imgurl, picurl, '');
                        $('.mip_as_bottm_div').append(html);
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
                $('.hot-tui-list').append(hotRecommend(url, img, title, ''));
                $('.hot_recomd_div').show();
            }
            else {
                ipLoad(function (data) {
                    $('.hot-tui-list').append(hotRecommend(url, img, title, ''));
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
        + '%22data%22:%22%5B\'_trackEvent\',%20\'100m,%20\'0\',%20\'8002m\'%5D%22%7D"';
        return putMXfAd(putUrl, picUrl, statsBaidu);
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
        $('.mip_as_bottm_div').empty();
    };
    var youLai = function (data) {
        var json = data.adList;
        for (var key in json) {
            if (json[key].type === '4') {
                var statsBaidu = 'data-stats-baidu-obj="%7B%22type%22:%22click%22,%22data%22:%22%5B_trackEvent,'
                + '%20%22M_commercial_youlai%22,%20%22M_commercial_youlai_skip%22,'
                + '%20%22M_commercial_youlai_skip_top_xuanfu%22%5D%22%7D"';
                $('.mip_as_bottm_div').empty();
                $('.mip_as_bottm_div').append(putMXfAd(json[key].picLink, json[key].picUrl, statsBaidu));
            }
            else if (json[key].type === '3') {  // 企业信息
                var obj = json[key];
                var companyName = obj.companyName || '';
                var drName   = obj.drName  || '';
                var statsBaidu = 'data-stats-baidu-obj="%7B%22type%22:%22click%22,'
                + '%22data%22:%22%5B_trackEvent,%20%22M_commercial_youlai%22,%20%22M_commercial_youlai_skip%22'
                + ',%20%22M_commercial_youlai_skip_qiye_info%22%5D%22%7D"';
                var html1 = putQiyeInfo(drName, companyName, data.website, obj.picUrl, statsBaidu);
                if ($('.qs_bar').length > 0) {
                    $('.qs_bar').eq(0).empty();
                    $('.qs_bar').eq(0).append(html1);
                }
                else {
                    $('.mip_as_other_qiye_div').eq(0).empty();
//                    $('.mip_as_other_qiye_div').eq(0).prev().prev().remove();
                    $('.mip_as_other_qiye_div').eq(0).append(html1);
                }
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
                var statsBaidu = '%7B%22type%22:%22click%22,%22data%22:%22%5B_trackEvent,'
                + '%20%22M_commercial_youlai%22,%20%22M_commercial_youlai_skip%22,'
                + '%20%22M_commercial_youlai_skip_feed%22%5D%22%7D';
                var i = 0;
                var obj2PicUrl = '<mip-img class="mip-img" src="' + obj2.picUrl + '"></mip-img>';
                $('.youlai_feed_div .youlai_feed_title').text(obj.title);
                $('.youlai_feed_div .youlai_feed_use_img').html(obj2PicUrl);
                $('.youlai_feed_div .youlai_feed_use_name').html(obj2.companyName);
                $('.youlai_feed_div .youlai_feed_txt').text(obj.describe);
                $('.youlai_feed_div a').attr('src', obj.picLink);
                $('.youlai_feed_div a').attr('data-stats-baidu-obj', statsBaidu);
                $('.youlai_feed_div .youlai_feed').each(function () {
                    $(this).append('<mip-img class="mip-img" src="' + picList[i++] + '"></mip-img>');
                });
                $('.youlai_feed_div').show();
            }
            else if (json[key].type === '6') {
                var obj = json[key];
                var picList = obj.adDetailList;
                var statsBaidu = 'data-stats-baidu-obj="%7B%22type%22:%22click%22,'
                + '%22data%22:%22%5B_trackEvent,%20%22M_commercial_youlai%22,%20%22M_commercial_youlai_skip%22,'
                + '%20%22M_commercial_youlai_skip_quantu%22%5D%22%7D"';
                for (var pic in picList) {
                    var picLink = obj.picLink;
                    var picUrl = picList[pic].picUrl;
                    var describe = picList[pic].describe;
                    $('.hot-tui-list').append(hotRecommend(picLink, picUrl, describe, statsBaidu));
                    $('.hot_recomd_div').show();
                }
            }
        }
        advLogInfoClick();
    };
    var tianZhu = function (data) {
        $('.mip_as_bottm_div').empty();
        $('.mip_as_bottm_div').append(putMXfAd(data.pics[3].picLink, data.pics[3].picLocal, ''));
        advLogInfoClick();
    };
    // 商业广告标准版企业信息
    var commercialSqc  = function (divData, commercialStandardHover) {
        var imgsrc = divData.attr('imgsrc');
        var tp = divData.attr('tp');
        var brandname = divData.attr('brandname');
        var link = divData.attr('link');
        var uid = divData.attr('uid');
        var introduce = divData.attr('introduce');
        var html1 = putQiyeInfo(brandname, introduce, link, imgsrc, '');
        if ($('.qs_bar').length > 0) {
            $('.qs_bar').eq(0).empty();
            $('.qs_bar').eq(0).append(html1);
        }
        else {
            $('.mip_as_other_qiye_div').eq(0).empty();
            $('.mip_as_other_qiye_div').eq(0).append(html1);
        }
        var tImgSrc = commercialStandardHover.attr('imgsrc');
        var tLink = commercialStandardHover.attr('link');
        var tUid = commercialStandardHover.attr('uid');
        $('.mip_as_bottm_div').empty();
        $('.mip_as_bottm_div').append(putMXfAd(tLink, tImgSrc, ''));
        advLogInfoClick();
    };
    var loadAd = function (sources, openId, div) {
        var type = '';
        if (sources === 'COOPERATE_HUASHENG') {
            type = 'HS';
        }
        else if (sources === 'COOPERATE_HUASHENG_QA') {
            type = 'HSQA';
        }
        else if (sources === 'COOPERATE_XINYUHENG') {
            type = 'XYH';
        }
        else if (sources === 'COOPERATE_YOULAI') {
            type = 'YL';
        }
        else if (sources === 'COOPERATE_TIANZHU') {
            type = 'TZ';
        }
        else if (type === '') {
            return;
        }
        var url = 'https://mipp.iask.cn/t/wlsh?openCorporationId=' + openId + '&type=' + type;
        $.get(url,
        function (data) {
            var res = $.parseJSON(data);
            if (res.succ === 'Y') {
                var json = $.parseJSON(res.html);
                var isHuasheng = true;
                var htmls = '';
                var html1 = '';
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
                    htmls = putMXfAd(json.pics[1].picLink, json.pics[1].picLocal);
                }
                else {
                    var pic = json.pics[3] || '';
                    htmls = putMXfAd(pic.picLink, pic.picLocal);
                    var companyName = json.companyName || '';
                    var drName = json.drName || '';
                    var website = json.website || '';
                    var pic = json.pics[0] || '';
                    html1 = putQiyeInfo(companyName, drName, website, pic.picLocal, '');
                }
                $(div).empty();
                $(div).append(htmls);
                if (isHuasheng) {
                    if ($('.qs_bar').length > 0) {
                        $('.qs_bar').eq(0).empty();
                        $('.qs_bar').eq(0).append(html1);
                    }
                    else {
                        $('.mip_as_other_qiye_div').eq(0).empty();
                        $('.mip_as_other_qiye_div').eq(0).prev().prev().remove();
                        $('.mip_as_other_qiye_div').eq(0).append(html1);
                    }
                }
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
        || options.qSourceType === 'COOPERATE_XINYUHENG' || options.qSourceType === 'COOPERATE_HUASHENG'
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
        if (options.lenGood >= pos) {
            var qiyeDiv = $('.qs_bar').eq(pos - 1);
            qiyeDiv.removeClass();
            qiyeDiv.empty();
            qiyeDiv.append(htmls);
        } else {
            pos = options.lenGood > 0 ? pos - 1 : pos;
            var qiyeDiv = $('.mip_as_other_qiye_div').eq(pos - 1);
            qiyeDiv.removeClass();
            qiyeDiv.empty();
            qiyeDiv.prev().prev().remove();
            qiyeDiv.append(htmls);
        }
    };
    var put1 = function (val, options) {
        putAppend(1, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo, ''));
    };
    var put2 = function (val, options) {
        putAppend(2, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo, ''));
    };
    var put3 = function (val, options) {
        $('.mip_as_bottm_div').empty();
        $('.mip_as_bottm_div').append(putMXfAd(val.url, val.mSuspensionImage, ''));
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
    var currencyAM = function (sourceType, openId) {
        loadAd(sourceType, openId, '.mip_as_bottm_div');
    };
    // 南方网通底部悬浮广告
    var southnetwork = function (openId, div) {
        var url = 'https://imgv2-ssl.g3user.com/api/b.php?uid=' + openId + '&type=m&callback=?';
        try {
            $.getJSON(url,
            function (data) {
                var htmls = putMXfAd(data.m[0].link, data.m[0].pic, '');
                $(div).empty();
                $(div).append(htmls);
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
                });
            }
            catch (e) {
            }
        });
    };
    var advEffectCallBack = function (dd) {
        var list = dd.materialList;
        var ve = dd.version;
        $('.paramDiv').attr('uid', dd.userId);
        for (var i = 0; i < list.length; i++) {
            var obj = list[i];
            if (ve === '1') {
                showEffectAdv(obj, 1);
            }
            else if (ve === '2') {
                showEffectAdv(obj, 2);
            }
			else {
                showEffectAdv(obj, 3);
            }
        }
        advLogInfoClick();
    };
    var showEffectAdv = function (json, tp) {
        var baiduObj = 'data-stats-baidu-obj=%7B%22type%22:%22click%22,%22data%22:';
        baiduObj += '%22%5B\'_trackEvent\',%20\'M_effect_adv\',%20\'M_effect_adv_skip\',%20\'M_effect_adv\'%5D%22%7D';
        if (json.adType === '3') {
            removeBaiduAd();
            var html1 = putQiyeInfo(json.brandName, json.shortIntroduce, json.materialLink, json.materialImg, baiduObj);
            if ($('.qs_bar').length > 0) {
                $('.qs_bar').eq(0).empty();
                $('.qs_bar').eq(0).append(html1);
            }
            else {
                $('.mip_as_other_qiye_div').eq(0).empty();
                $('.mip_as_other_qiye_div').eq(0).append(html1);
            }
            return;
        }
        if (json.adType === '2') {
            return;
        }
        if (json.materialType === '5' && tp === 1) {
            removeBaiduAd();
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj);
            $('.mip_as_bottm_div').empty();
            $('.mip_as_bottm_div').append(htmls);
            return;
        }
        if (json.materialType === '5' && tp === 2) {
            removeBaiduAd();
            var html = '<div href=' + json.materialLink + ' class=\'href_log\'><mip-img ';
            html += 'src=' + json.materialImg + '></mip-img></div>';
            $('.effect_avertisement_div').empty();
            $('.effect_avertisement_div').append(html);
            return;
        }
        if (json.materialType === '5' && tp === 3) {
            removeBaiduAd();
            var htmls = putMXfAd(json.materialLink, json.materialImg, baiduObj);
            $('.mip_as_bottm_div').empty();
            $('.mip_as_bottm_div').append(htmls);
            return;
        }
    };
    var brandAvertisement = function (sourceType) {
        advLogInfo(sourceType, 0);
        advLogInfoClick();
    };
    var effects = {
            newLoadAd: function () {
                var $businessSource = $('.business_source');
                var sources = $businessSource.attr('sources');
                if (sources === 'COMMERCIAL_IAD' || sources === 'COMMERCIAL_ZWZD' || sources === 'COMMERCIAL_CAD') {
                    removeBaiduAd();
                    busBottomAM();
                    if (sources === 'COMMERCIAL_ZWZD') {
                        sources = 'COOPERATE_COMMERCIAL';
                    }
                    advLogInfo(sources, 0);
                }
                else if ($businessSource.attr('version') === '2') {
                    var $commercialSqc = $('.commercialStandard_qiye_cp');
                    var $commercialStandardHover = $('.commercialStandardHover');
                    var sourceType = 'COOPERATE_BRAND';
                    $('.business_source').attr('sources', sourceType);
                    commercialSqc($commercialSqc, $commercialStandardHover);
                    advLogInfo(sourceType, 0);
                }
                else if (sources === 'COOPERATE_BRAND' && ($businessSource.attr('version') === '1'
                || $businessSource.attr('version') === '3')) {
                    brandAvertisement(sources);
                }
                else {
                    var sourceType = $('.business_source_type').attr('sourceType');
                    var openId = $('.business_source_type').attr('openId');
                    var tags = $('.business_source_type').attr('tags');
                    var params = $('.business_source_type').attr('params');
                    var questionId = $('.paramDiv').attr('qid');
                    if (sourceType === 'COOPERATE_XINYUHENG' || sourceType === 'COOPERATE_HUASHENG'
                    || sourceType === 'COOPERATE_HUASHENG_QA' || sourceType === 'COOPERATE_YOULAI'
                    || sourceType === 'COOPERATE_TIANZHU') {
                        if (sourceType === 'COOPERATE_YOULAI' || sourceType === 'COOPERATE_TIANZHU') {
                            removeBaiduAd();
                        }
                        currencyAM(sourceType, openId);
                        advLogInfo(sourceType, 0);
                    }
                    else if (sourceType === 'COOPERATE_SOUTHNETWORK') {
                        removeBaiduAd();
                        southnetwork(openId, '.mip_as_bottm_div');
                        advLogInfo(sourceType, 0);
                    }
                    else if (sourceType !== 'COOPERATE_HUASHENG' && sourceType !== 'COOPERATE_HUASHENG_QA') {
                        if (tags) {
                            loadURLJS(tags, params, sourceType);
                        }
                        if ($('.href_log').length === 0) {
                            sourceType = 'COOPERATE_EFFECT';
                            $('.business_source').attr('sources', sourceType);
                            effectAvertisement(questionId, sourceType);
                        }
                    }
                }
            },
            commercialLoad: function () {
                if (validatePut()) {
                    var nowTime = getSysTime();
                    var startTime = $('.yongyouStartTime').text();
                    var endTime   = $('.yongyouEndTime').text();
                    if (startTime <= nowTime && nowTime < endTime) {
                        // 删除百度广告
                        removeBaiduAd();
                        var putUrl = $('.yongyouPutUrl').text();
                        var picUrl = $('.yongyouPicUrl').text();
                        $('.mip_as_bottm_div').append(putTestButHtml(putUrl, picUrl));
                        var urlr = 'http://m.iask.sina.com.cn/t/mipdf?t=yongyou';
                        $.ajax({
                            type: 'GET',
                            url: urlr,
                            dataType: 'html',
                            success: function (data) {
                                if (!!data) {
                                    $('.breadcast_middle_commercial').empty();
                                    $('.breadcast_middle_commercial').append(data);
                                    advLogInfoClick();
                                    var $that = $('.paramDiv');
                                    var sources = $that.attr('sources');
                                    advLogInfo(sources, 0);
                                }
                            }
                        });
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
