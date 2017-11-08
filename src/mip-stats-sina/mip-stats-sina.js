/**
 * @file 新浪统计
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    // SUDA地图统计
    window.sudaMapConfig = {
        uId: '', // 用户uid，如果用户没登陆，可以为空
        pageId: '' // 必填
    };

    /**
     * elemKeysToObj
     *
     * @param  {HTMLElement} elem elem
     * @param  {Array} keys keys
     * @param  {Object} obj  obj
     */
    function elemKeysToObj(elem, keys, obj) {
        var $elem = $(elem);
        $.each(keys, function (i, key) {
            obj[key] = $(elem).attr(key) || '';
        });
    }

    /**
     * protocol
     *
     * @type {string}
     */
    var protocol = location.protocol;

    /**
     * SINA_TONGJI_ROOT
     *
     * @type {string}
     */
    var SINA_TONGJI_ROOT = ''
        + protocol
        + '//mjs'
        + (protocol === 'https:' ? 's' : '')
        + '.sinaimg.cn/wap/public/suda/201607111020/';

    /**
     * getScript promise
     *
     * @param  {string} src 地址
     * @return {promise}     promise
     */
    function getScriptPromise (src) {

        var _promise = new Promise(function(resolve,reject){
            var elescrit = document.createElement("script");
            elescrit.src = src;
            $('body').append(elescrit);
            elescrit.onload = function() {
                resolve();
            };
        });

        return _promise;
    }

    customElement.prototype.build = function () {
        var elem = this.element;

        getScriptPromise(SINA_TONGJI_ROOT + 'suda_log.min.js').then(function(){
             return getScriptPromise(SINA_TONGJI_ROOT + 'suda_map.min.js');
        }).then(function(){
           elemKeysToObj(elem, ['uId', 'pageId'], window.sudaMapConfig);

            if (window.suda_init) {
                window.suda_init(window.sudaMapConfig.pageId, 100);
            }
        });

    }

    return customElement;

});

