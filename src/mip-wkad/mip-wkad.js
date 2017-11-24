/**
* 寻医问药mip改造 广告组件
* @file 脚本支持
* @author jqthink@gmail.com
* @time 2017.07.05
* @version 1.0.4
*/
define(function (require) {
    var $ = require('zepto');
    var util = require('util');
    var customElem = require('customElement').create();
    var ua = navigator.userAgent;
    var loadAd = function (elem, className, content) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = JSON.parse(content);
        if (typeof window['adStore'] === 'undefined') {
            window['adStore'] = {};
        }
        el.className = className;
        script.type = 'text/javascript';
        script.innerHTML = json.join('');
        $(elem).append(el);
        $(el).append(script);
    };
    var parse = function (obj, userAgent, subject) {
        if (typeof  obj !== 'object') {
            return;
        }
        var tmp = obj;
        var x;
        for (x in tmp) {
            if (x.substr(0, 2) === 'if' || x === 'elseif') {
                if (tmp[x].hasOwnProperty('condition_type')) {
                    if (tmp[x]['condition_type'] === 'ua') {
                        var reg = new RegExp(tmp[x]['condition']);
                        if (reg.test(userAgent)) {
                            if (tmp[x].hasOwnProperty('return')) {
                                return JSON.stringify(tmp[x]['return']);
                            }
                            else {
                                return parse(tmp[x]['body'], userAgent, subject);
                            }
                        }
                    }
                    else if (tmp[x]['condition_type'] === 'in_array') {
                        if (tmp[x]['condition'].indexOf(subject) > -1) {
                            if (tmp[x].hasOwnProperty('return')) {
                                return JSON.stringify(tmp[x]['return']);
                            }
							else {
                                return parse(tmp[x]['body'], userAgent, subject);
                            }
                        }
                    }
                }
            }
			else {
                if (tmp[x].hasOwnProperty('return')) {
                    return JSON.stringify(tmp[x]['return']);
                }
                else {
                    return parse(tmp[x]['body'], userAgent, subject);
                }
            }
        }
    };
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
     // this.element 可取到当前实例对应的 dom 元素
        var elem = this.element;
        var elStr = $(elem).attr('el');
        var adStr = $(elem).attr('ads');
        var complex = $(elem).attr('complex');
        var subject = parseInt($(elem).attr('subject'), 10);
        var adJson = null;
        var domain = document.domain;
        var url = document.URL;
        if (complex === 'on') {
            adJson = JSON.parse($(elem).attr('adJson'));
            loadAd(elem, elStr, parse(adJson, ua, subject));
        }
        else {
            if (domain === '3g.xywy.com') {
                $('mip-fixed[type="top"]').hide();
                $('.hot-news-panel').addClass('none');
                $('.mobile-ad-rnk1-panel').removeClass('none');
                $('.mobile-ad-rnk2-panel').removeClass('none');
            }
            if (util.fn.isCacheUrl(url) && url.indexOf('3g.xywy.com') > -1) {
                $('mip-fixed[type="bottom"]').hide();
                $('.mobile-ad-rnk3-panel').removeClass('none');
            }
            loadAd(elem, elStr, adStr);
        }
    };
    return customElem;
});
