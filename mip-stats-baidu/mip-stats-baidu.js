/**
 * @file 百度统计插件
 *
 * @author menglingjun, Jenny_L, dongshihao
 * From: mip-stats-baidu
 */

define(function (require) {
    var $ = require('zepto');
    var viewer = require('viewer');
    var util = require('util');

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {
        var elem = this.element;
        var config = this.getConfig();
        var token = config.token;

        /**
         * 检测token是否存在
         */
        if (token) {
            window._hmt = window._hmt || [];
            _hmt.push([
                '_setAccount',
                token
            ]);

            // XXX: 解决来自百度搜索，内外域名不一致问题
            if (viewer.isIframed) {
                bdSearchCase();
            }
            if (config && Array.isArray(config.conf) && config.conf.length) {
                var conf = config.conf;
                for (var i = 0; i < conf.length; i++) {
                    _hmt.push(conf[i]);
                }
            }
            var hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?' + token;
            $(elem).append(hm);
            hm.onload = function () {
                bindEle();
            };
        } else {
            console.warn('token is unavailable'); // eslint-disable-line
        }

    };

    /**
     * get config from script has type="application/json"
     *
     * @return {Object} config  return stats config
     */
    customElement.prototype.getConfig = function () {
        var config = {};
        var setconfig = this.element.getAttribute('setconfig');
        try {
            var script = this.element.querySelector('script[type="application/json"]');
            if (script) {
                var textContent = JSON.parse(script.textContent);
                if (JSON.stringify(textContent) !== '{}') {
                    config.token = textContent.token;
                    util.fn.del(textContent, 'token');
                    config.conf = this.objToArray(textContent);
                }
                return config;
            }
        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
        }
        return {
            'token': this.element.getAttribute('token'),
            'conf': setconfig ? new Array(buildArry(decodeURIComponent(setconfig))) : null
        };
    };

    /**
     * JSON object to Array
     *
     * @param {Object} configObj configObj from script has type="application/json"
     * @return {Object} outConfigArray return stats array
     */
    customElement.prototype.objToArray = function (configObj) {
        var outConfigArray = [];
        if (!configObj) {
            return;
        }
        for (var key in configObj) {
            if (configObj.hasOwnProperty(key) && Array.isArray(configObj[key])) {
                configObj[key].unshift(key);
                outConfigArray.push(configObj[key]);
            }
        }
        return outConfigArray;
    };

    // 绑定事件追踪
    function bindEle() {

        // 获取所有需要触发的dom
        var tagBox = document.querySelectorAll('*[data-stats-baidu-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = tagBox[index].getAttribute('data-stats-baidu-obj');

            /**
             * 检测statusData是否存在
             */
            if (!statusData) {
                return;
            }

            try {
                statusData = JSON.parse(decodeURIComponent(statusData));
            }
            catch (e) {
                console.warn('事件追踪data-stats-baidu-obj数据不正确');
                return;
            }

            var eventtype = statusData.type;

            /**
             * 检测传递数据是否存在
             */
            if (!statusData.data) {
                return;
            }

            var data = buildArry(statusData.data);

            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if ($(tagBox[index]).hasClass('mip-stats-eventload')) {
                return;
            }

            $(tagBox[index]).addClass('mip-stats-eventload');

            if (eventtype === 'load') {
                _hmt.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function(event) {
                    var tempData = this.getAttribute('data-stats-baidu-obj');
                    if (!tempData) {
                        return;
                    }
                    var statusJson;
                    try {
                        statusJson = JSON.parse(decodeURIComponent(tempData));
                    }
                    catch (e) {
                        console.warn('事件追踪data-stats-baidu-obj数据不正确');
                        return;
                    }
                    if (!statusJson.data) {
                        return;
                    }
                    var attrData = buildArry(statusJson.data);
                    _hmt.push(attrData);
                }, false);
            }
        }
    }

    // 数据换转
    function buildArry(arrayStr) {
        if (!arrayStr) {
            return;
        }

        var strArr = arrayStr.slice(1, arrayStr.length - 1).split(',');
        var newArray = [];

        for (var index = 0; index < strArr.length; index++) {
            var item = strArr[index].replace(/(^\s*)|(\s*$)/g, '').replace(/\'/g, '');
            if (item === 'false' || item === 'true') {
                item = Boolean(item);
            }

            newArray.push(item);
        }
        return newArray;
    }

    /**
     * 解决来自百度搜索，内外域名不一致问题
     */
    function bdSearchCase() {
        var referrer = '';

        var bdUrl = document.referrer;
        var hashWord = MIP.hash.get('word') || '';
        var hashEqid = MIP.hash.get('eqid') || '';
        var from = MIP.hash.get('from') || '';
        if ((hashWord || hashEqid) && bdUrl) {
            var hashObj = {};
            if (hashEqid && isMatch(from, 'result')) {
                hashObj.url = '';
                hashObj.eqid = hashEqid;
            }
            else {
                hashObj.word = hashWord;
            }
            referrer = makeReferrer(bdUrl, hashObj);
            _hmt.push(['_setReferrerOverride', referrer]);
        }

    }

    /**
     * to determine whether from the targetFrom
     *
     * @param  {string} from  referrer from mipService
     * @param  {string} targetFrom  the target that `from` need to match.
     * @return {boolean}     return whether from the results page
     */
    function isMatch(from, targetFrom) {
        if (from && targetFrom && from === targetFrom) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 生成百度统计_setReferrerOverride对应的referrer
     *
     * @param  {string} url       需要被添加参数的 url
     * @param  {Object} hashObj   参数对象
     * @return {string}           拼装后的 url
     */
    function makeReferrer(url, hashObj) {
        var referrer = '';
        var conjMark = url.indexOf('?') < 0 ? '?' : '&';
        var urlData = '';
        for (var key in hashObj) {
            urlData += '&' + key + '=' + hashObj[key];
        }
        urlData = urlData.slice(1);
        if (url.indexOf('#') < 0) {
            referrer = url + conjMark + urlData;
        }
        else {
            referrer = url.replace('#', conjMark + urlData + '#');
        }
        return referrer;
    }
    return customElement;
});
