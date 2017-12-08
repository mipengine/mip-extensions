/**
* 寻医问药mip改造 广告配置组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.12.07
* @version 1.0.8
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
    // build说明: 广告组件，在页面展示，需要尽快加载
    customElem.prototype.build = function () {
        var elem = this.element;
        var attr = $(elem).attr('aid');
        var channel = $(elem).attr('channel');
        var department = $(elem).attr('department');
        var paramId = $(elem).attr('param');
        var departId = $(elem).attr('depart_id');
        var departSid = $(elem).attr('depart_sid');
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
                        // display_load.js说明：最新站内广告投放js，必须
                        loadJs(elem, 'https://a.xywy.com/display/display_load.js', function () {
                            var ggArr = {};
                            var string = '';
                            $.each(adStore, function (index, value) {
                                string = string + '|' + value;
                            });
                            ggArr['ad_key'] = string.substr(1);
                            ggArr['charset'] = 'utf8';
                            mobileAd.getAd(ggArr);
                            //mobileAd.getParseWordInp();
                        });
                    }
                    else if (channel === 'club') {
                        // mobile_v3.js说明：老版站内广告投放js，必须。后期会下掉。
                        loadJs(elem, 'https://a.xywy.com/mobile_v3.js', function () {
                            var ggArr = {};
                            var string = '';
                            $.each(adStore, function (index, value) {
                                string = string + '|' + value;
                            });
                            ggArr['ad_key'] = string.substr(1);
                            ggArr['department'] = department;
                            ggArr['charset'] = 'utf8';
                            mobileAd.getAd(ggArr);
                        });
                    }
                    else if (channel === 'newclub') {
                        loadJs(elem, 'https://a.xywy.com/display/display_load.js', function () {
                            var ggArr = {};
                            var string = '';
                            $.each(adStore, function (index, value) {
                                string = string + '|' + value;
                            });
                            ggArr['ad_key'] = string.substr(1);
                            ggArr['department'] = department;
                            ggArr['charset'] = 'utf8';
                            mobileAd.getAd(ggArr);
                            //mobileAd.getParseWordInp();
                        });
                    }
                    else if (channel === 'medicine') {
                        // keyword_v1.js说明：药品网站内广告投放js，必须。
                        loadJs(elem, 'https://a.xywy.com/keyword/keyword_v1.js', function () {
                            var ggArr = {};
                            var string = '';
                            $.each(adStore, function (index, value) {
                                string = string + '|' + value;
                            });
                            ggArr['ad_key'] = string.substr(1);
                            ggArr['charset'] = 'utf8';
                            mobileAd.getAd(ggArr);
                        });
                    }
                });
                break;
            case 'stat':
                //stat.js：广告展示量统计
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
            case 'a_new_test':
                // a_new_test.js说明：某单个科室流量统计，后期会下掉
                loadJs(elem, 'https://stat.xywy.com/a_new_test.js?param=' + paramId + '&projectid=2250537300');
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
