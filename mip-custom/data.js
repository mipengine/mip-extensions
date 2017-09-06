/**
 * @file mip-custom/data
 * @author pearl
 */
define(function (require) {

    /**
     * [regexs 正则表达式]
     * @type {Object}
     */
    var regexs = {
        html: /<mip-\S*>(.*)<\/mip-\S*></,
        script: /<script[^>]*>(.*?)<\/script>/g,
        style: /<style[^>]*>(.*?)<\/style>/g,
        innerHtml: />([\S\s]*)<\//,
        customTag: /<(mip-\S+)>/,
        tag: '\<([^\\s|\>]*)',
        tagandAttr: /<(mip-[^>]*)>/,
        regHttp: /\/c\/(\S*)/,
        regHttps: /\/c\/s\/(\S*)/,
        domain: /^(http(s)?:\/\/)?[^\/]*baidu.com/
    };


    /**
     * [params 请求数据所需参数]
     * @type {Object}
     */
    var params = {
        logid: '',
        query: '',
        title: '',
        originalUrl: getSubString(location.pathname, regexs.regHttps) || getSubString(location.pathname, regexs.regHttp)
    };

    var logData = {
        host: 'https://sp1.baidu.com/5b1ZeDe5KgQFm2e88IuM_a/owb.gif',
        params: {
            type: 3,
            pid: 1106,
            qid: getHashData('lid'),
            q: getHashData('word'),
            srcid: getHashData('srcid')
        },
        exposure: {
            fm: 'view',
            data: encodeURIComponent('[{"type": "w", "action": "show"}]')
        },
        error: {
            fm: 'ex',
            en: 'mip_async_err'
        }
    };

    var config = {
        domain: 'https://mipengine.baidu.com/',
        paths: {
            'js/nav': 'static/js/nav',
            'js/util': 'static/js/util',
            'js/mip-ecom/ck': 'static/js/mip-ecom/ck'
        }
    };

    /**
     * [getHashData 根据 key 获取 hash 中的数据]
     *
     * @param  {string} key key
     * @return {string}     value
     */
    function getHashData(key) {
        var MIP = window.MIP || {};
        return MIP && MIP.hash && MIP.hash.get ? MIP.hash.get(key) : '';
    }

    function addPaths(config) {
        if (config.paths) {
            for (var key in config.paths) {
                if (config.paths.hasOwnProperty(key)) {
                    config.paths[key] = config.domain + config.paths[key];
                }
            }
        }

        return config;
    }

    /**
     * [getSubString 根据正则获取子串]
     *
     * @param  {string}  str [截取钱字符串]
     * @param  {RegExp}  reg [正则表达式]
     * @param  {integer} pos [位置]
     * @return {string}      [截取后字符串]
     */
    function getSubString(str, reg, pos) {
        pos = pos ? 0 : 1;
        var res = str.match(reg) && str.match(reg)[pos] ? str.match(reg)[pos] : '';
        return res;
    }


    return {
        domain: 'https://mipengine.baidu.com/',
        ajaxUrl: 'https://mipengine.baidu.com/common?',
        regexs: regexs,
        params: params,
        config: config,
        addPaths: addPaths,
        subStr: getSubString,
        logData: logData,
        getHashData: getHashData
    };

});