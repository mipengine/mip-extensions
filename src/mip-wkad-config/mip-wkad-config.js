/**
* 寻医问药mip改造 广告配置组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2018.01.22
* @version 1.1.0
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var loadJs = function (elem, url, callback) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.src = url;
        $(elem).append(script);
        if (typeof callback !== 'function') {
            // return false;
        }
        else {
            script.onload = script.onerror = function () {
                callback();
            };
        }
    };
    var showPoster = function (key, val) {
        var ggArr = {};
        var string = '';
        $.each(adStore, function (index, value) {
            string = string + '|' + value;
        });
        ggArr['ad_key'] = string.substr(1);
        val !== undefined ? ggArr[key] = val : 0;
        ggArr['charset'] = 'utf8';
        mobileAd.getAd(ggArr);
        mobileAd.getParseWordInp();
    };
    // build说明: 广告组件，在页面展示，需要尽快加载
    customElem.prototype.build = function () {
        var elem = this.element;
        var attr = $(elem).attr('aid');
        var channel = $(elem).attr('channel');
        var department = $(elem).attr('department');
        var column = $(elem).attr('column');
        var departId = $(elem).attr('depart_id');
        var departSid = $(elem).attr('depart_sid');
        // display_load.js说明：站内广告投放js，必须
        var posterUrl = 'https://a.xywy.com/display/display_load.js';
        // news.php说明：站内广告反屏蔽策略(非百度联盟反屏蔽)，必须
        var bdmUrl = 'https://3g.club.xywy.com/zhuanti/news.php?from=mip&f=';
        if (departId) {
            window['subject_pid'] = departId;
        }
        if (departSid) {
            window['subject'] = departSid;
        }
        switch (attr) {
            case 'take_ip':
                // take_ip说明：展示广告需要的ip地址，必须
                loadJs(elem, 'https://ipdisplay.xywy.com/take_ip', function () {
                    if (typeof channel === 'undefined') {
                        loadJs(elem, posterUrl, function () {
                            if (typeof mobileAd === 'undefined') {
                                loadJs(elem, bdmUrl);
                            }
                            else {
                                showPoster();
                            }
                        });
                    }
                    else if (channel === 'newclub') {
                        loadJs(elem, posterUrl, function () {
                            if (typeof mobileAd === 'undefined') {
                                loadJs(elem, bdmUrl + 'department&v=' + department);
                            }
                            else {
                                showPoster('department', department);
                            }
                        });
                    }
                    else if (channel === 'yimei') {
                        loadJs(elem, posterUrl, function () {
                            if (typeof mobileAd === 'undefined') {
                                loadJs(elem, bdmUrl + 'column&v=' + column);
                            }
                            else {
                                showPoster('column', column);
                            }
                        });
                    }
                });
                break;
            case 'stat':
                // stat.js：广告展示量统计
                loadJs(elem, 'https://a.xywy.com/mip/stat.js');
                break;
            case 'tongji':
                // a.js说明：流量统计
                loadJs(elem, 'https://stat.xywy.com/a.js');
                break;
            case 'odm':
                // odm.js说明：点击统计
                loadJs(elem, 'https://stat.xywy.com/odm.js');
                break;
            case 'visit':
                // visit.js说明：搜索展示量统计
                loadJs(elem, 'https://stat.xywy.com/visit.js');
                break;
            case 'get_ip':
                // get_ip说明：药品网展示广告所需的ip
                loadJs(elem, 'https://page.xywy.com/get_ip');
                break;
            default:
                break;
        }
    };
    return customElem;
});
