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
        params.query = data.getHashData('word');
        params.logid = data.getHashData('lid');
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
            var script = element.querySelector('script[type="application/json"]');
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
     * @param  {DOM}    element mip-custom 组件节点
     * @return {string} url     拼接后的url
     */
    function getUrl(element, customUrl) {
        var firstKey = true;
        var url = customUrl || data.ajaxUrl;
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

        return url;
    }

    return {
        get: getUrl
    };

});
