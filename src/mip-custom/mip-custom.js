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
        var me = this;
        dom.addPlaceholder.apply(this);
        this.initElement(dom)
        if (window.MIP.viewer.page) {
            // 监听外层播放的广告事件
            window.addEventListener('showAdvertising', e => {
                var detailData = e && e.detail && e.detail[0] && e.detail[0] || {};
                me.customId = detailData.customId;
                me.novelData = detailData.novelData;
                if (detailData.fromSearch) {
                    me.fromSearch = detailData.fromSearch;
                }
                if (me.customId === window.MIP.viewer.page.pageId && me.novelData) {
                    me.initElement(dom)
                }
            })
            // 告知shell该custom已经准备好了
            setTimeout(() => {
                window.MIP.viewer.page.emitCustomEvent(window.MIP.viewer.page.isRootPage ? window : window.parent, false, {
                    name: 'mip-custom-element-ready',
                    data: {
                    customId: window.MIP.viewer.page.pageId
                    }
                })
            }, 200);
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
        var paramUrl = url
        if (me.novelData) {
            var novelData = encodeURIComponent(JSON.stringify(me.novelData))
            paramUrl = paramUrl + '&novelData=' + novelData
        }
        if (me.fromSearch) {
            paramUrl = paramUrl + '&fromSearch=' + me.fromSearch
        }
        // fetch
        fetch(url, {
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

                console.error(data.errmsg);
                me.element.remove();
                return;
            }

            callback && callback(data.data, element);
            // 广告插入页面时，增加渐显效果
            var mipCustomContainers = document.querySelectorAll('[mip-custom-container]');
            for (var i = mipCustomContainers.length - 1; i >= 0; i--) {
                var mipCustomContainer = mipCustomContainers[i];
                mipCustomContainer.classList.add('fadein');
            }

            // 性能日志：按照流量 1/500 发送日志
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

            dom.removePlaceholder.apply(me);
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
