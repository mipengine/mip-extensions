/**
 * @file mip-custom/url
 * @author pearl
 */
define(function (require) {
    /**
     * [util 引入工具类]
     * @type {Object}
     */
    var util = require('util');
    var viewer = require('viewer');
    var dom = require('mip-custom/dom');
    var data = require('mip-custom/data');

    /**
     * [getHashparams mip连接特殊情况，从 hash 中获取参数
     *
     * @return {Object}     合并后的数据对象
     */
    function getHashParams() {
        var params = data.params;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                params[key] = data.getHashData(key) || params[key];
            }
        }

        // 修改字段名
        params.logid = data.getHashData('lid');
        params.eqid = data.getHashData('eqid');

        // 内容联盟来源 导流字段
        var feedArr = ['originalSource', 'mediaid', 'fn'];
        for (var i = 0; i < feedArr.length; i ++) {
            var arr = feedArr[i];
            if (data.getHashData(arr)) {
                params[arr] = data.getHashData(arr);
            }
        }

        // pc标识字段
        params.fromSite = data.getHashData('fromSite');

        return params;
    }

    /**
     * [getUserParams 获取页面上用户设置的参数]
     *
     * @param  {DOM}    element    mip-custom 组件节点
     * @return {Object} userParams 用户设置的参数对象
     */
    function getUserParams(element) {
        var userParams = null;

        // 获取用户设置参数，获取不到则报错并返回
        try {
            var script = dom.getConfigScriptElement(element);
            if (script) {
                userParams = JSON.parse(script.textContent);
                if (!userParams.accid) {
                    console.warn('mip-custom 缺少 accid 参数');
                    return;
                }
                if (!userParams.title) {
                    console.warn('mip-custom 缺少 title 参数');
                    return;
                }

                // 站长传过来的title 是编码后的，需要进行解码
                for (var key in userParams) {
                    if (userParams.hasOwnProperty(key)) {
                        userParams[key] = decodeURIComponent(userParams[key]);
                    }
                }
            }
        }
        catch (error_msg) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(error_msg); // eslint-disable-line
            return;
        }
        return userParams;
    }

    /**
     * [getUrlParams 集合异步请求所需要的所有参数]
     *
     * @param  {DOM}    element mip-custom 组件节点
     * @return {Object}         异步请求所需要的参数对象
     */
    function getUrlParams(element) {
        var userParams = getUserParams(element);
        if (!userParams) {
            return null;
        }

        return util.fn.extend(getHashParams(), userParams);
    }

    /**
     * [getUrl url 拼接函数]
     *
     * @param  {HTMLElement}    element mip-custom 组件节点
     * @param  {string}    poi 区分AB区的url
     * @return {string} url     拼接后的url
     */
    function getUrl(element, poi) {
        var firstKey = true;
        var url = poi === 'top' ? data.topAjaxUrl : data.ajaxUrl;
        var urlParams = getUrlParams(element);

        if (!urlParams) {
            return;
        }


        for (var key in urlParams) {
            if (urlParams.hasOwnProperty(key)) {
                url += (!firstKey ? '&' : '') + key + '=' + urlParams[key];
                firstKey = false;
            }
        }

        if (poi === 'top') {
            var sourceId = getSourceId();
            if (sourceId) {
                url += '&sourceId=' + encodeURIComponent(sourceId);
            }
        }
        // 非mip-shell增加noshell参数
        var mipShell = inMipShell(element);
        if (!mipShell[0]) {
            url = url + '&from=noshell&noshelltype=' + mipShell[1];
        }
        return url;
    }

    function getSourceId() {
        var customs = document.querySelectorAll('mip-custom[position=top]');
        var sourceIdArr = [];
        var cLen = customs.length;
        if (customs && cLen > 0) {
            for (var i = 0; i < cLen; i++) {
                var singleCustom = customs[i];
                var sourceId = singleCustom && singleCustom.getAttribute('source-type');
                sourceId && sourceIdArr.push(sourceId);
            }
        }
        return sourceIdArr.join(',');
    }

    /**
     * 判断是否在特定广告环境中
     *
     * @return {Array} inMipShell 是否在mip-shell中
     */
    function inMipShell(element) {
        var inMipShell = [true];
        // 非结果页进入，不是mip-shell
        if (!viewer.isIframed) {
            inMipShell[0] = false;
            inMipShell[1] = 'notIframed';
        }
        // 非百度、cache不在mip-shell中
        if (!(data.regexs.domain.test(window.document.referrer) || util.fn.isCacheUrl(location.href))) {
            inMipShell[0] = false;
            inMipShell[1] = 'notDomainOrCacheUrl';
        }
        
        return inMipShell;
    };


    return {
        get: getUrl
    };

});
