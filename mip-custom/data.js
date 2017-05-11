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

    var config = {
        domain: 'https://mipengine.baidu.com/',
        paths: {
            'js/nav': 'static/js/nav',
            'js/util': 'static/js/util',
            'js/mip-ecom/ck': 'static/js/mip-ecom/ck'
        }
    };

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
        subStr: getSubString
    };

});
