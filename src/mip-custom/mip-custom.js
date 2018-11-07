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

    // creat钩子
    var customElement = require('customElement').create();
    var logData = dataProcessor.logData;
    var performanceData = dataProcessor.performanceData;
    var globalCustomElementInstance;

    var UA = navigator.userAgent;

    function handler(e) {
        var me = globalCustomElementInstance;
        var detailData = e && e.detail && e.detail[0] || {};
        me.customId = detailData.customId;
        me.novelData = detailData.novelData;
        if (detailData.fromSearch) {
            me.fromSearch = detailData.fromSearch;
        }
        // XXX:解决window实例和组件实例的诡异的问题。。。。。。
        if (me.customId === window.MIP.viewer.page.currentPageId
            && me.element.querySelector('.mip-custom-placeholder')) {
            // 广告合并的策略
            var novelInstance = window.MIP.viewer.page.isRootPage ? window.MIP.novelInstance : window.parent.MIP.novelInstance;
            novelInstance = novelInstance || {};
            var adsCache = novelInstance.adsCache || {};
            if (!adsCache.isNeedAds && adsCache.directRender && adsCache.adStategyCacheData) {
                me.render(adsCache.adStategyCacheData, me.element)
            }
            me.initElement(dom)
            window.removeEventListener('showAdvertising', handler)
        }
        if (me.customId === window.MIP.viewer.page.currentPageId
            && adsCache.ignoreSendLog) {
            me.initElement(dom)
        }
    }

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
     * 添加小说相关的事件监听
     */
    customElement.prototype.addNovelListener = function () {
        var me = this;
        window.addEventListener('ignoreSendLogFetch', function (e) {
            var detailData = e && e.detail && e.detail[0] || {};
            me.customId = detailData.customId;
            me.novelData = detailData.novelData;
            me.initElement(dom)
        });
        // 监听小说shell播放的广告请求的事件
        window.addEventListener('showAdvertising', handler);
        // 当小说shell优先加载时——向小说shell发送custom已经ready的状态以方便后续事件的执行
        var shellWindow = window.MIP.viewer.page.isRootPage ? window : window.parent;
        // 定制化再加确认事件事件防止
        window.addEventListener('customReadyConfirm', function () {
            window.MIP.viewer.page.emitCustomEvent(shellWindow, false, {
                name: 'customReady',
                data: {
                    customPageId: window.MIP.viewer.page.currentPageId
                }
            })
        })
        window.MIP.viewer.page.emitCustomEvent(shellWindow, false, {
            name: 'customReady',
            data: {
                customPageId: window.MIP.viewer.page.currentPageId
            }
        })
    };

    /**
     * build钩子，触发渲染
     *
     */
    customElement.prototype.build = function () {
        // 如果是百度spider抓取，如果是百度spider抓取则不执行接下来的逻辑
        if (isBaiduSpider()) {
            return
        }
        var me = this;
        globalCustomElementInstance = this;
        dom.addPlaceholder.apply(this);
        // 判断是否是MIP2的环境，配合小说shell，由小说shell去控制custom的请求是否发送
        if (window.MIP.version && +window.MIP.version === 2) {
            this.addNovelListener();
        }
        else {
            this.initElement(dom)
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
     * 获取当前定制化页面的window——小说垂类
     *
     * @return {window} 当前iframe的window
     */
    function getCurrentWindow() {
        var pageId = window.MIP.viewer.page.currentPageId
        var pageInfo = window.MIP.viewer.page.getPageById(pageId)
        return pageInfo.targetWindow
    }

    /**
     * 渲染小说shell的计算的cache的广告
     *
     * @param {Object} data fetch返回的数据
     * @param {handle} callback 回调
     * @param {HTMLElement} element 数据返回后需要渲染的element
     */
    customElement.prototype.renderNovelCacheAdData = function (data, callback, element) {
        var currentWindow = getCurrentWindow();
        var isRootPage = currentWindow.MIP.viewer.page.isRootPage;
        var novelInstance = isRootPage ? window.MIP.novelInstance : window.parent.MIP.novelInstance
        var adsCache = novelInstance.adsCache || {};
        var rendered = false
        if (JSON.stringify(adsCache) === "{}") {
            // 当请求走的是小流量的广告合并时，需要走新的逻辑，用schema字段来区分，需要修改data.data
            var adTime = +new Date()
            data.data.adTime = adTime
            window.addEventListener('showAdStategyCache', function (e) {
                var adData = e && e.detail && e.detail[0] || {};
                // 模板的前端渲染
                rendered = true
                callback && callback(adData, element);
            });
            window.MIP.viewer.page.emitCustomEvent(isRootPage ? window : window.parent, false, {
                name: 'adDataReady',
                data: {
                    pageId: window.MIP.viewer.page.currentPageId,
                    adData: data.data
                }
            })
        }
        if (!rendered && adsCache.directRender != null && adsCache.directRender == false) {
            // 当渲染cache广告的时候缺少tpl的时候，依赖于请求返回的tpl
            this.renderCacheDataByTpl(data, callback, element)
        }
        if (!rendered && adsCache.noAdsRender != null && adsCache.noAdsRender) {
            this.renderCacheDataByTpl({data: {data: {}}}, callback, element)
        }
    }

    /**
     * 获取当前定制化页面的window——小说垂类
     *
     * @param {Object} data fetch返回的数据
     * @param {handle} callback 回调
     * @param {HTMLElement} element 数据返回后需要渲染的element
     * @return {window} 当前iframe的window
     */
    customElement.prototype.renderCacheDataByTpl = function (data, callback, element) {
        var currentWindow = getCurrentWindow();
        var isRootPage = currentWindow.MIP.viewer.page.isRootPage;
        var novelInstance = isRootPage ? currentWindow.MIP.novelInstance : currentWindow.parent.MIP.novelInstance
        var adsCache = novelInstance.adsCache || {}
        var me = this;
        var novelAds = adsCache.adStategyCacheData && adsCache.adStategyCacheData.template || [];
        if (novelAds) {
            novelAds.map(function (value) {
                if (Array.isArray(value)) {
                    value.map(function (ad) {
                        if (ad.tpl == null && data.data.template[ad.tplName]) {
                            ad.tpl = data.data.template[ad.tplName]
                        }
                    })
                }
            })
            util.fn.extend(adsCache.fetchedData.adData.template, data.data.template);
        }
        // 模板的前端渲染
        callback && callback(adsCache.adStategyCacheData, element);
    }

    /**
     * 异步获取数据
     *
     * @param {string} url 异步请求接口
     * @param {handle} callback 回调
     * @param {HTMLElement} element 数据返回后需要渲染的element
     */
    customElement.prototype.fetchData = function (url, callback, element) {
        var me = this;
        // url = 'http://yq01-psdy-diaoyan1006.yq01.baidu.com:8637/common?'
        url = 'http://localhost:8080/mock/novelMock?'
        if (!url) {
            return;
        }
        var errorData = {};
        // 性能日志
        var performance = {};
        performance.fetchStart = new Date() - 0;
        var paramUrl = url

        // 小说的特殊参数——novelData和fromSearch
        if (me.novelData) {
            var novelData = encodeURIComponent(JSON.stringify(me.novelData))
            paramUrl = paramUrl + '&novelData=' + novelData
        }
        if (me.fromSearch) {
            paramUrl = paramUrl + '&fromSearch=' + me.fromSearch
        }
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
            // 当命中小流量
            if (window.MIP.version && +window.MIP.version === 2 && data.data.schema) {
                me.renderNovelCacheAdData(data, callback, element);
            }
            else {
                // 模板的前端渲染
                callback && callback(data.data, element);
            }
            // 性能日志：按照流量 1/500 发送日志
            me.setPerformanceLogs(performance);
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
    customElement.prototype.setPerformanceLogs = function (performance) {
        var random500 = Math.random() * 500;
        if (random500 < 1) {
            // 性能日志：emptyTime-广告未显示时间
            performance.renderEnd = new Date() - 0; // 渲染结束时间戳
            performance.emptyTime = performance.renderEnd - performance.fetchStart; // 页面空白毫秒数
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
