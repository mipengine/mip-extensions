/**
* @file 脚本支持
* @author hejieye
* @time  2016-12-20
* @version 1.2.1
*/
define(function (require) {

    var $ = require('zepto');
    var customElem = require('customElement').create();
    // 商业广告
    var ipLoad = function (callback) {
        var url = 'https://mipp.iask.cn/iplookup/search?format=json&callback=?';
        try {
            $.getJSON(url,
            function (data) {
                callback(data);
            });
        }
        catch (e) {}
    };
    // 判断区域投放广告
    var hideDiv = function (area, div) {
        try {
            ipLoad(function (data) {
                if (area.indexOf(data.province) === -1) {
                    $(div).remove();
                }
            });
        }
        catch (e) {}
    };
    // 隐藏len小于等于0的DIV
    var lenHide = function (len, div, type) {
        try {
            if ($(len).length <= 0) {
                if (type === 'show') {
                    $(div).show();
                }
                else {
                    $(div).hide();
                }
            }
        }
        catch (e) {}
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
        $('.mip_as_bottm_div').remove();
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
        if (type === '') {
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
                    html1 = putQiyeInfo(companyName, drName, website, pic.picLocal);
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
        });
    };
    // 动态添加 mip-fixed悬浮广告
    var putMXfAd = function (picLink, picLocal) {
        var htmls = '';
        htmls += '<mip-fixed type=\'bottom\' id=\'customid\' >';
        htmls += '<div class=\'mip-adbd\'>';
        htmls += '<div on=\'tap:customid.close\' class=\'mip-adbd-close\'><span>关闭</span></div>';
        htmls += '<a href=' + picLink + ' target=\'_blank\'>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '</a>';
        htmls += '</div></mip-fixed>';
        return htmls;
    };
    // 南方网通底部悬浮广告
    var southnetwork = function (sources, openId, div) {
        var url = 'https://imgv2-ssl.g3user.com/api/b.php?uid=' + openId + '&type=m&callback=?';
        try {
            $.getJSON(url,
            function (data) {
                var htmls = putMXfAd(data.m[0].link, data.m[0].pic);
                $(div).empty();
                $(div).append(htmls);
            });
        }
        catch (e) {}
    };
    var putQiyeInfo = function (companyName, drName, website, picLocal) {
        var htmls = '<div class=\'firms-con\'>';
        htmls += '<div class=\'firms-pic\'>';
        htmls += '<mip-img class=\'mip-img\' src=' + picLocal + '></mip-img>';
        htmls += '<span class=\'icon-v\'></span>';
        htmls += '</div>';
        htmls += '<div class=\'firms-text\'>';
        htmls += '<p><span class=\'name\'>' + companyName + '</span><span class=\'time\'> 16-09-05</span></p>';
        htmls += '<p>' + drName + '</p>';
        htmls += '</div>';
        htmls += '<a href=' + website + ' target=\'_blank\' class=\'btn-ask\'>咨询专家</a>';
        htmls += '</div>';
        htmls += '</div>';
        return htmls;
    };
    // 加载url中的js
    var loadURLJS = function (tags, params) {
        var url = 'https://mipp.iask.cn/mib/tag/';
        var arry = tags.split(':');
        for (var i = 0; i < arry.length; i++) {
            url = url + arry[i];
        }
        try {

            var province = ''; // 省份
            var city = ''; // 城市
            ipLoad(function (data) {
                province = data.province;
                city = data.city;
            });
            $.get(url,
            function (data) {
                var res = $.parseJSON(data);
                console.log(res);
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
                    }

                }
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
        if (options.commercialSource === 'COMMERCIAL_ZWZD' || options.qSourceType === 'COOPERATE_SOUTHNETWORK'
        || options.qSourceType === 'COOPERATE_XINYUHENG' || options.qSourceType === 'COOPERATE_HUASHENG'
        || options.qSourceType === 'COOPERATE_HUASHENG_QA') {
            return;
        }
        // 如果ip获取不到城市信息，则根据省份进行广告主病种随机投放
        if (!options.city) {
            noCityPutAd(options, cmJsonData);
            return;
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
                    }
                }
            }
            catch (e) {}

        });
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
        putAppend(1, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo));
    };
    var put2 = function (val, options) {
        putAppend(2, options, putQiyeInfo(val.hospitalName, val.contacts, val.url, val.logo));
    };
    var put3 = function (val, options) {
        $('.mip_as_bottm_div').empty();
        $('.mip_as_bottm_div').append(putMXfAd(val.url, val.mSuspensionImage));
    };

    function noCityPutAd(options, cmJsonData) {
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
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var elem = this.element;
        var div = $(elem).attr('div');
        var area = $(elem).attr('area');
        var len = $(elem).attr('len');
        var type = $(elem).attr('type');
        var sources = $(elem).attr('sources');
        var openCorporationId = $(elem).attr('openId');
        var tags = $(elem).attr('tags');
        var params = $(elem).attr('params');
        if (len) {
            lenHide(len, div, type);
        }
        if (area) {
            hideDiv(area, div);
        }
        if (sources === 'COMMERCIAL_IAD' || sources === 'COMMERCIAL_ZWZD' || sources === 'COMMERCIAL_CAD') {
            removeBaiduAd();
        }
        if (sources === 'COOPERATE_HUASHENG' || sources === 'COOPERATE_HUASHENG_QA'
        || sources === 'COOPERATE_XINYUHENG') {
            loadAd(sources, openCorporationId, div);
        }
        else if (sources === 'COOPERATE_SOUTHNETWORK') {
            // 南方网通
            southnetwork(sources, openCorporationId, div);
        }
        if (tags) {
            loadURLJS(tags, params);
        }
    };

    return customElem;
});

