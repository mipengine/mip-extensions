/**
 * @file 百度统计插件
 *
 * @author menglingjun, Jenny_L, dongshihao
 * From: mip-stats-baidu
 */
/* global MIP */
define(function (require) {
    var viewer = require('viewer');
    var util = require('util');
    var Gesture = util.Gesture;
    var fn = require('util').fn;

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
            window._hmt.push([
                '_setAccount',
                token
            ]);

            // 如果是在iframe内部，则单独处理referrer，因为referrer统计不对
            if (viewer.isIframed) {
                setReferrer();
            }
            if (config && Array.isArray(config.conf) && config.conf.length) {
                var conf = config.conf;
                for (var i = 0; i < conf.length; i++) {
                    window._hmt.push(conf[i]);
                }
            }

            bindEle();

            var hm = document.createElement('script');
            hm.src = 'https://hm.baidu.com/hm.js?' + token;


            elem.appendChild(hm);
        }
        else {
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
            token: this.element.getAttribute('token'),
            conf: setconfig ? new Array(buildArray(decodeURIComponent(setconfig))) : null
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
                continue;
            }

            try {
                statusData = JSON.parse(decodeURIComponent(statusData));
            }
            catch (e) {
                console.warn('事件追踪data-stats-baidu-obj数据不正确');
                continue;
            }

            var eventType = statusData.type;

            /**
             * 检测传递数据是否存在
             */
            if (!statusData.data) {
                continue;
            }

            // 格式化数据
            var data = buildArray(statusData.data);

            if (eventType !== 'click' && eventType !== 'mouseup' && eventType !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                continue;
            }

            if (tagBox[index].classList.contains('mip-stats-eventload')) {
                continue;
            }

            tagBox[index].classList.add('mip-stats-eventload');

            if (eventType === 'load') {
                window._hmt.push(data);
            }
            // 解决on=tap: 和click冲突短线方案
            // TODO 这个为短线方案
            else if (eventType === 'click'
                && tagBox[index].hasAttribute('on')
                && tagBox[index].getAttribute('on').match('tap:')
                && fn.hasTouch()) {
                var gesture = new Gesture(tagBox[index]);
                gesture.on('tap', eventHandler);
            }
            else {
                tagBox[index].addEventListener(eventType, eventHandler, false);
            }
        }
    }

    // 事件触发
    function eventHandler(event) {
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

        var attrData =  buildArray(statusJson.data);
        window._hmt.push(attrData);
    }

    /**
     * 数据换转 兼容两种格式
     *
     * @param {string} arrayStr 百度统计用户配置数据
     * @example (不需要处理) ["_trackPageview", "/mip-stats/sheji"]
     * @example (需要处理) "[_trackPageview, /mip-stats/sheji]"
     *
     * @return {Object} ["_trackPageview", "/mip-stats/sheji"]
     */
    function buildArray(arrayStr) {
        if (!arrayStr) {
            return;
        }

        // (不需要处理) ["_trackPageview", "/mip-stats/sheji"]
        if (typeof arrayStr === 'object') {
            return arrayStr;
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
     * 通过百度统计API设置新的referrer
     * 因为在iframe中，统计到的referrer不对，所以需要转换referrer
     * 
    */
    function setReferrer() {
        var originUrl = '';
        var params = {};

        var hashWord = MIP.hash.get('word') || '';
        var hashEqid = MIP.hash.get('eqid') || '';
        var hashQuery = MIP.hash.get('q') || '';
        var from = MIP.hash.get('from') || '';


        if (isMatch(from, 'result')) {
            // 百度搜索查询参数
            if(hashWord || hashEqid) {
                params.eqid = hashEqid;
                params.word = hashWord;
            }
            // 神马搜索查询参数
            if(hashQuery) {
                params.q = hashQuery
            }
            if (document.referrer) {
                params.url = '';
                originUrl = document.referrer;
            }
        }
        else {
            params.url = '';
            originUrl = location.origin + location.pathname + location.search;
        }
        window._hmt.push(['_setReferrerOverride', buildReferrer(originUrl, params)]);
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
        }
        return false;
    }

    /**
     * 生成百度统计_setReferrerOverride对应的referrer
     *
     * @param  {string} url       需要被添加参数的 url
     * @param  {Object} params   参数对象
     * @return {string}           拼装后的 url
     */
    function buildReferrer(url, params) {
        var referrer = '';
        var params = params;
        var conjMark = url.indexOf('?') < 0 ? '?' : '&';
        var urlData = '';
        for (var key in params) {
            urlData += '&' + key + '=' + params[key];
        }
        urlData = urlData.slice(1);
        if (url.indexOf('#') < 0 && urlData) {
            referrer = url + conjMark + urlData;
        }
        else {
            referrer = url.replace('#', conjMark + urlData + '#');
        }
        return referrer;
    }
    return customElement;
});
