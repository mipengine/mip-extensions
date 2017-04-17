/**
 * @file 百度统计插件
 *
 * @author menglingjun, Jenny_L
 * From: mip-stats-baidu
 */

define(function(require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function() {
        var elem = this.element;
        var token = elem.getAttribute('token');
        var setConfig = elem.getAttribute('setconfig');

        /**
         * 检测token是否存在
         */
        if (token) {
            window._hmt = window._hmt || [];
            _hmt.push([
                '_setAccount',
                token
            ]);

            // XXX: 解决iframe内外域名不一致问题
            if (window.parent !== window) {
                fixIframeCase();
            }

            /**
             * 检测setconfig是否存在
             */
            if (setConfig) {
                var setCustom = buildArry(decodeURIComponent(setConfig));
                _hmt.push(setCustom);
            }

            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?' + token;
            $(elem).append(hm);
            hm.onload = function() {
                bindEle();
            };
        }

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
            } catch (e) {
                console.warn("事件追踪data-stats-baidu-obj数据不正确");
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
            } else {
                tagBox[index].addEventListener(eventtype, function(event) {
                    var tempData = this.getAttribute('data-stats-baidu-obj');
                    if (!tempData) {
                        return;
                    }
                    var statusJson;
                    try {
                        statusJson = JSON.parse(decodeURIComponent(tempData));
                    } catch (e) {
                        console.warn("事件追踪data-stats-baidu-obj数据不正确");
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
     * 解决iframe内外域名不一致问题
     */
    function fixIframeCase() {
        var referrer = '';
        var href = window.location.href;
        console.log('cache地址：' + href);
        var originOri = getBaiduUrl(href);
        console.log('mip path 地址: ' + originOri); 
        var hashWord = MIP.hash.get('word') || '';
        var hashEqid = MIP.hash.get('eqid') || '';
        console.log('hash-word: ' + hashWord); 
        console.log('hash-eqid: ' + hashEqid); 
        if (hashWord || hashEqid) {
            referrer = makeReferrer(originOri, hashWord, hashEqid);
            console.log('_setReferrerOverride: ' + referrer);
            _hmt.push('_setReferrerOverride', referrer);
        }

    }

    /**
     * 根据当前页面url，拼装成mip-path/mip-shell url
     *
     * @param  {String} url 当前页面url
     * @return {String}     mip-shell url
     */
    function getBaiduUrl(url) {
        var baiduPrefix = 'https://m.baidu.com/mip/c/';
        var cachePrefix = 'https://mipcache.bdstatic.com/c/';
        var originUrl = url.replace(cachePrefix, '');
        return baiduPrefix + encodeRestfulUrl(originUrl);
    }

    /**
     * 针对Url中"//"的情况做兼容
     *
     * @param  {String} url url
     * @return {String}     url
     */
    function encodeRestfulUrl(url) {
        var restful = encodeURIComponent(url);
        restful = restful.replace(/%2F/g, '/');
        for (var i = 0; i < restful.length; i++) {
            var char = restful.charAt(i);
            var nextChar = restful.charAt(i + 1);
            if (char === '/' && nextChar !== '/') {
                continue;
            }
            while (restful.charAt(i) === '/' && i < restful.length) {
                restful = restful.slice(0, i) + '%2F' + restful.slice(i + 1);
                i += 3;
            }
        }
        return restful;
    }

    function makeReferrer(originUrl, hash1, hash2) {
        var referrer = '';
        var conjMark = originUrl.indexOf('?') < 0 ? '?' : '&';
        var urlData = 'url=' + hash1 + '&eqid=' + hash2;
        if (originUrl.indexOf('#') < 0) {
            referrer = originUrl + conjMark + urlData;
        } else {
            var 
            referrer = originUrl.replace('#', conjMark + urlData + '#')
        }
        return referrer;
    }

    return customElement;
});
