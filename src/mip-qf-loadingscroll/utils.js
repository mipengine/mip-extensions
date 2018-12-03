/**
 * @file 工具包
 * @author 9-lives
 */

define(function (require) {
    var fetchJsonp = require('fetch-jsonp');
    var mustache = require('templates');
    var util = require('util');

    /**
     * 获取自定义参数
     * @param {Object} el 组件元素
     * @return {Object} 请求参数对象
     */

    function getCustomParams(el) {
        var params = {
            clientType: util.platform.isIos() ? 'ipa' : 'apk', // 客户端类型。默认 apk 安卓；ipa 苹果
            columns: '', // 返回的列
            cpFlag: 'Y', // 价值
            pageIndex: 0, // 开始页数
            pageSize: 20, // 分页大小
            publishTarget: 'Html5', // PC 端 'pc'， 移动端 'Html5'
            rankCode: undefined, // 自定义榜单编码
            siteId: undefined, // 站点 ID
            type: undefined // 排行榜类型。1 热门; 7 自定义
        }; // 默认参数
        var script = el.querySelector('script[type="application/json"]');

        if (script) {
            params = util.fn.extend(params, JSON.parse(script.textContent));
        }

        return params;
    }

    /**
     * 获取数据
     * @param {Object} 参数对象
     */

    function getDataByJsonp(options) {
        fetchJsonp(options.url, {
                jsonpCallback: 'callback',
                timeout: options.timeout
            })
            .then(function (rs) {
                return rs.json();
            })
            .then(function (rs) {
                if (rs.status !== 0) {
                    throw new Error('status code:', rs.status);
                }

                options.success(rs.data.items);
            })
            .catch(function (e) {
                if (e && e.message) {
                    console.error(e.message); // eslint-disable-line
                }

                options.failure();
            });
    }

    /**
     * 获取 HTML 属性
     * @param {Object} el 组件元素
     * @param {Object} btn 加载按钮
     * @return {Object} HTML 标签属性对象
     */

    function getHtmlProperties(el, btn) {
        if (!el.getAttribute('data-url')) {
            throw new Error('invalid argument data-url');
        }

        return {
            completedTxt: btn.getAttribute('txt-completed') ? btn.getAttribute('txt-completed') : '加载完毕',
            failedTxt: btn.getAttribute('txt-failed') ? btn.getAttribute('txt-failed') : '加载失败',
            gap: el.getAttribute('gap') ? Number.parseInt(el.getAttribute('gap'), 10) : 0,
            loadingTxt: btn.getAttribute('txt-loading') ? btn.getAttribute('txt-loading') : '正在加载...',
            timeout: el.getAttribute('timeout') ? Number.parseInt(el.getAttribute('timeout'), 10) * 1000 : 7000,
            url: el.getAttribute('data-url')
        };
    }

    /**
     * 检测被动事件兼容性
     * @return {boolean} 是否支持被动事件
     */
    function isPassiveEvtSupport() {
        var passiveSupported = false;

        window.addEventListener('_testpassive', null, Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
                return false;
            }
        }));

        return passiveSupported;
    }

    /**
     * 解析 API 返回的 downloadLink 对象数组
     * @param {Array} arr 下载对象数组
     * @return {Object} 下载链接对象（apk、ipa）
     */
    function parsePackInfo(arr) {
        if (util.platform.isWechatApp()) {
            // 微信浏览器
            return null;
        }

        if (!(arr instanceof Array)) {
            throw new Error('invalid argument arr');
        }

        var link = {}; // 无 IOS 下载包

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].link && arr[i].defaultpackage === 'Y') {
                link[arr[i].type] = arr[i].link;
            }
        }

        return link;
    }

    /**
     * 请求动画帧
     * @param {Function} callback 待执行的方法
     */

    var rqFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

    /**
     * 设置 url 参数
     * @param {string} url 处理前的url
     * @param {Object} params 请求参数
     * @return {string} 处理后的 url
     */

    function setUrlParams(url, params) {
        url += '?';

        var flag = true;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                url += (flag ? '' : '&') + key.toLowerCase() + '=' + params[key];
                flag = false;
            }
        }

        return url;
    }

    return {
        getCustomParams: getCustomParams,
        getDataByJsonp: getDataByJsonp,
        getHtmlProperties: getHtmlProperties,
        isPassiveEvtSupport: isPassiveEvtSupport,
        parsePackInfo: parsePackInfo,
        rqFrame: rqFrame,
        setUrlParams: setUrlParams
    };
});