/**
* Ѱҽ��ҩmip���� ������
* @file �ű�֧��
* @author jqthink@gmail.com
* @time 2017.03.02
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var ua = navigator.userAgent;
    var loadAd = function (elem, className, content) {
        var el = document.createElement('div');
        var script = document.createElement('script');
        var json = JSON.parse(content);
        if (typeof window['keys_arr'] === 'undefined') {
            window['keys_arr'] = {};
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
    // build ������Ԫ�ز��뵽�ĵ�ʱִ�У�����ִ��һ��
    customElem.prototype.build = function () {
     // this.element ��ȡ����ǰʵ����Ӧ�� dom Ԫ��
        var elem = this.element;
        var elStr = $(elem).attr('el');
        var adStr = $(elem).attr('ads');
        var complex = $(elem).attr('complex');
        var subject = parseInt($(elem).attr('subject'), 10);
        var adJson = null;
        if (complex === 'on') {
            adJson = JSON.parse($(elem).attr('adJson'));
            loadAd(elem, elStr, parse(adJson, ua, subject));
        }
        else {
            loadAd(elem, elStr, adStr);
        }
    };
    return customElem;
});
