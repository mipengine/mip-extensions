/**
 * @file mip-custom 渲染框架
 * @author dongshihao<dongshihao@baidu.com>
 */

define(function () {

    // rquire tools
    var util = require('util');
    var viewer = require('viewer');
    // require modules
    var url = require('mip-custom/url');
    var dom = require('mip-custom/dom');
    var log = require('mip-custom/log');
    var dataProcessor = require('mip-custom/data');

    // require novel feature
    var novel = require('mip-custom/novelFeature');

    // creat钩子
    var customElement = require('customElement').create();
    var logData = dataProcessor.logData;
    var performanceData = dataProcessor.performanceData;
    var globalCustomElementInstance;

    var UA = navigator.userAgent;

    /**
     * 获取是否是百度spider抓取
     */
    function isBaiduSpider() {
        return UA.indexOf('Baiduspider') > -1;
    }
    /**
     * prerenderAllowed钩子,优先加载
     */
    customElement.prototype.prerenderAllowed = function () {
        return true;
    };

    /**
     * build钩子，触发渲染
     *
     */
    customElement.prototype.build = function () {
        // 如果是百度spider抓取，如果是百度spider抓取则不执行接下来的逻辑
        if (isBaiduSpider()) {
            return;
        }
        var me = this;
        globalCustomElementInstance = this;
        // 判断是否是MIP2的环境，配合小说shell，由小说shell去控制custom的请求是否发送
        var novelShell = document.querySelector('mip-shell-xiaoshuo');
        if (window.MIP.version && +window.MIP.version === 2 && novelShell) {
            novel.addNovelListener.apply(this, [this.initElement]);
        }
        else {
            dom.addPlaceholder.apply(this);
            this.initElement(dom);
        }
    };

    /**
     * 发出请求+渲染页面
     *
     */
    customElement.prototype.initElement = function (dom) {
        var me = this;
        var checkElement = function () {
            if (dom.getConfigScriptElement(me.element)) {
                me.initCustom();
                return true;
            }
            return false;
        };
        if (!checkElement()) {
            window.requestAnimationFrame(checkElement);
        }
    };

    /**
     * 定制化渲染的主流程：分区请求+渲染
     *
     */
    customElement.prototype.initCustom = function () {
        var me = this;

        // 参数初始化
        me.position = me.element.getAttribute('position') || '';
        me.sourceType = me.element.getAttribute('source-type') || '';
        // 判断是否在mip-shell中，决定请求传递参数
        me.commonUrl = url.get(me.element);

        // 监听代理 a 标签点击事件
        dom.proxyLink(me.element);

        /**
         * AB区分处理
         */
        if (me.getPosition() === 'top') {
            if (me.getTagNum(me.element).current === 0) {
                me.initQueue();
                me.fetchData(url.get(me.element, 'top'), me.renderQueue.bind(me));
            }
            var queue = me.getQueue();
            var templateData = me.getMatchData(me.element, queue && queue.tempData);
            if (templateData && templateData.template.length > 0) {
                me.render(templateData, me.element);
            } else {
                me.pushQueue(me.element);
            }

        } else {
            me.fetchData(me.commonUrl, me.render.bind(me), me.element);
        }
    };

    /**
     * firstInviewCallback钩子，发送曝光日志
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        // 曝光日志
        logData.params.t = +new Date();
        log.sendLog(logData.host, util.fn.extend(logData.exposure, logData.params));
    };

    /**
     * 获取标签所在的位置
     *
     * @return {Object} position 标签位置
     */
    customElement.prototype.getPosition = function () {
        return this.position === 'top' ? 'top' : 'bottom';
    };

    /**
     * 初始化
     *
     * @param {HTMLElement} el mip-custom元素
     * @return {Object} tagNum 返回标签数量信息
     * @return {string} tagNum.total 标签总数量
     * @return {string} tagNum.current 当前标签序号
     */
    customElement.prototype.getTagNum = function (el) {
        var element = [].slice.call(document.querySelectorAll('mip-custom[position=top]'));
        return {
            total: element.length,
            current: element.indexOf(el)
        };
    };

    /**
     * 渲染
     *
     * @param {Object} data 和模板匹配的数据
     * @param {HTMLElement} element 需要渲染的element
     */
    customElement.prototype.render = function (data, element) {
        var commonData = {};
        var template = {};
        if (!data || !element) {
            return;
        }
        if (data.config) {
            var config = dataProcessor.addPaths(data.config);
            require.config(config);
        }
        else if (dataProcessor.config) {
            var config = dataProcessor.addPaths(dataProcessor.config);
            require.config(config);
        }

        // common 数据缓存
        if (data.common) {
            commonData = data.common;
        }

        // 模板数据缓存
        if (data.template) {
            template = data.template;
        }

        for (var i = 0; i < template.length; i++) {
            var tplData = template[i];
            var container = document.createElement('div');
            container.setAttribute('mip-custom-container', i);
            element.appendChild(container);

            // dom 渲染
            dom.render(element, tplData, container);
        }

        // 广告插入页面时，增加渐显效果
        var mipCustomContainers = document.querySelectorAll('[mip-custom-container]');
        for (var i = mipCustomContainers.length - 1; i >= 0; i--) {
            var mipCustomContainer = mipCustomContainers[i];
            mipCustomContainer.classList.add('fadein');
        }
        // 广告渲染完成
        window.MIP.adShow = true
        // 移除广告占位符号
        dom.removePlaceholder.apply(this);
    };

    /**
     * 获取标签匹配的数据
     *
     * @param {HTMLElement} element 需要匹配的element
     * @param {Object} data 所有数据
     * @return {Object} matchTempData 返回element匹配的数据
     * @return {Object} matchTempData.common common数据信息
     * @return {Object} matchTempData.config 配置
     * @return {Array} matchTempData.template 模板
     */
    customElement.prototype.getMatchData = function (element, data) {
        var me = this;
        if (!element || !data) {
            return;
        }

        var sourceType = element.getAttribute('source-type') || '';
        if (!sourceType) {
            return;
        }

        var template = data.template;
        var matchTempData = {
            common: data.common,
            config: data.config,
            template: []
        };

        var tLen = template && template.length;
        if (tLen && tLen > 0) {
            for (var i = 0; i < tLen; i++) {
                var singleTempData = template[i];
                if (!singleTempData || !singleTempData.length) {
                    break;
                }
                var singleRid = singleTempData[0] && singleTempData[0].rid;
                if (singleRid && singleRid === sourceType) {
                    matchTempData.template.push(singleTempData);
                    break;
                }
            }
        }

        return matchTempData;
    };

    /**
     * 异步获取数据
     *
     * @param {string} url 异步请求接口
     * @param {handle} callback 回调
     * @param {HTMLElement} element 数据返回后需要渲染的element
     */
    customElement.prototype.fetchData = function (url, callback, element) {
        var me = this;
        if (!url) {
            return;
        }
        var errorData = {};
        // 性能日志
        var performance = {};
        performance.fetchStart = new Date() - 0;

        var paramUrl = url;

        // 小说的特殊参数——novelData和fromSearch
        paramUrl = novel.addNovelDate.apply(this, [url]);

        // fetch
        fetch(paramUrl, {
            credentials: 'include'
        }).then(function (res) {
            // 性能日志：duration-网络请求时间
            performance.responseEnd = new Date() - 0;
            performance.duration = performance.responseEnd - performance.fetchStart;
            errorData = {
                st: res.status,
                info: res.statusText,
                t: +new Date()
            };
            if (!res.ok) {
                log.sendLog(logData.host, util.fn.extend(logData.error, logData.params, errorData));
            }
            return res.json();
        }).then(function (data) {
            // 返回数据问题
            if (data && data.errno) {
                // send error log
                errorData = {
                    info: data.errmsg,
                    t: +new Date()
                };
                log.sendLog(logData.host, util.fn.extend(logData.error, logData.params, errorData));

                console.warn(data.errmsg);
                me.element.remove();
                return;
            }
            // 小说内命中小流量
            if (window.MIP.version && +window.MIP.version === 2 && data.data.schema) {
                new Promise(function (resolve) {
                    novel.renderNovelCacheAdData.apply(this, [data, me.element, resolve]);
                }).then(function (result) {
                    // 模板的前端渲染
                    callback && callback.apply(this, [result, me.element]);
                }).catch(function (reason) {
                    console.log('失败：' + reason);
                });
            }
            else {
                // 模板的前端渲染
                callback && callback(data.data, element);
            }
            // 性能日志：按照流量 1/500 发送日志
            me.setPerformanceLogs(performance, data);
        }, function (error) {
            log.sendLog(logData.host, util.fn.extend(logData.error, logData.params, errorData));
            me.element.remove();
            errorData.en = error;
            console.error(error);
        }).catch(function (evt) {
            console.warn(evt);
        });
    };

    /**
     * 性能日志：按照流量 1/500 发送日志
     *
     * @param {Object} performance 性能参数
     */
    customElement.prototype.setPerformanceLogs = function (performance, data) {
        // 性能日志：emptyTime-广告未显示时间
        // 渲染结束时间戳
        performance.renderEnd = new Date() - 0;

        // 给到SF
        // 合作页业务性能监控需要两个主要指标
        // 1. 从搜索点出开始到mip页主体内容展现
        // 2. 从搜索点出开始到mip页面整体展现 （除了主体内容，可能存在mip-custom等异步加载的内容）
        // 在mip页内，将整体展现完成时间 和 mip页属于哪个产品类型 传给SF，SF统一上报
        // 同时支持拓展其他指标
        var mainData = data.data;
        // mainData.common.product = 'medicine';
        if (mainData && mainData.common && mainData.common.product && mainData.responseTime) {
            // 在search-sfr-services仓库的mipService里监听它
            window.MIP.viewer.sendMessage('product-baseperf-log', {
                fullLoadTime: performance.renderEnd,
                otherDurations: {
                    // 后端渲染时间
                    mipServerAllTime: mainData.responseTime.mipServerAllTime || 0,
                    // 前端渲染时间
                    frontendRender: performance.renderEnd - performance.responseEnd
                },
                product: mainData.common.product
            });
        }

        // 这是在加上发送mip-product-baseperf-log事件统计之前的日志逻辑
        // 不清楚用途，继续保留
        var random500 = Math.random() * 500;
        if (random500 < 1) {
            // 页面空白毫秒数
            performance.emptyTime = performance.renderEnd - performance.fetchStart;
            performance.frontendRender = performance.renderEnd - performance.responseEnd;

            // 前端打点时间
            var frontendData = {
                duration: performance.duration,
                emptyTime: performance.emptyTime,
                frontendRender: performance.frontendRender
            };
            // 加入后端打点时间
            var frontAndServerData;
            if (data.data.responseTime) {
                frontAndServerData = util.fn.extend(frontendData, data.data.responseTime);
            }
            else {
                frontAndServerData = frontendData;
            }

            // 加入默认统计参数
            performanceData.params.info = JSON.stringify(util.fn.extend(performanceData.params.info, frontAndServerData, 1));

            // 添加小说的特殊逻辑字段
            var novelShell = document.querySelector('mip-shell-xiaoshuo');
            if (window.MIP.version && +window.MIP.version === 2 && novelShell) {
                performanceData.params.dim = {pd: 'novel'}
            }
            log.sendLog(performanceData.host, performanceData.params);
        }
    };

    /**
     * 缓存异步数据
     *
     * @param {Object} data 需要缓存的数据
     */
    customElement.prototype.storeData = function (data) {
        var me = this;
        var queue = me.getQueue();
        if (!data || !queue) {
            return;
        }
        if (queue.tempData) {
            queue.tempData = data;
        }
    };

    /**
     * 初始化模板、数据队列
     *
     */
    customElement.prototype.initQueue = function () {
        var me = this;
        window.MIP = window.MIP || {};
        MIP.custom = MIP.custom || {};
        MIP.custom.tempQueue = [];
        MIP.custom.tempData = {};
    };

    /**
     * 模板入队列
     *
     * @param {HTMLElement} temp 入队列元素
     */
    customElement.prototype.pushQueue = function (temp) {
        var me = this;
        var queue = me.getQueue();
        if (!temp || !queue) {
            return;
        }
        queue.tempQueue && queue.tempQueue.push(temp);
    };

    /**
     * 获取模板队列和缓存数据状态
     *
     * @return {}
     */
    customElement.prototype.getQueue = function () {
        return window.MIP && MIP.custom && {
                tempQueue: MIP.custom.tempQueue,
                tempData: MIP.custom.tempData
            };
    };

    /**
     * 渲染模板的等待队列
     *
     * @param {Object} data 渲染匹配的数据
     */
    customElement.prototype.renderQueue = function (data) {
        var me = this;
        var queue = me.getQueue();
        var tempQueue = queue && queue.tempQueue;
        if (!data) {
            return;
        }
        if (tempQueue && tempQueue.length > 0) {
            var tLen = tempQueue.length;
            for (var i = 0; i < tLen; i++) {
                var element = tempQueue[i];
                var elementData = me.getMatchData(element, data);
                me.render(elementData, element);
            }
        }
        me.storeData(data);
    };

    return customElement;
});
