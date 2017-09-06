/**
 * @file mip-custom 组件
 * @author
 */

define(function () {
    /**
     * [util 引入工具类]
     * @type {Object}
     */
    var util = require('util');
    /**
     * [viewer 窗口]
     * @type {Object}
     */
    var viewer = require('viewer');

    /**
     * [customElement 组件元素]
     * @type {Object}
     */
    var customElement = require('customElement').create();

    var url = require('mip-custom/url');
    var dom = require('mip-custom/dom');
    var log = require('mip-custom/log');
    var dataProcessor = require('mip-custom/data');
    var logData = dataProcessor.logData;

    /**
     * 初次进入到视图区执行
     */
    customElement.prototype.firstInviewCallback = function () {

        // 曝光日志
        logData.params.t = +new Date();
        log.sendLog(logData.host, util.fn.extend(logData.exposure, logData.params));
     };
  
    /**
     * 构造元素
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;
        var regexs = dataProcessor.regexs;
        var customUrl = self.element.getAttribute('custom-url') || '';

        // 非结果页进入不展现定制化内容
        if (!viewer.isIframed) {
            element.remove();
            return;
        }

        if (!(regexs.domain.test(window.document.referrer) || util.fn.isCacheUrl(location.href))) {
            element.remove();
            return;
        }

        var commonData = {};
        var template = {};
        var errorData = {};

        // 监听 a 标签点击事件
        dom.proxyLink(element);

        self.url = url.get(element, customUrl);

        if (!self.url) {
            element.remove();
            return;
        }

        // fetchJsonp to fetch
        fetch(self.url, {
            credentials: 'include'
        }).then(function (res) {
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
                element.remove();
                return;
            }

            // amd 静态文件配置，短期处理
            if (data && data.data && data.data.config) {
                var config = dataProcessor.addPaths(data.data.config);
                require.config(config);
            }
            else if (data && dataProcessor.config) {
                var config = dataProcessor.addPaths(dataProcessor.config);
                require.config(config);
            }

            // common 数据缓存
            if (data && data.data && data.data.common) {
                commonData = data.data.common;
            }

            // 模板数据缓存
            if (data && data.data && data.data.template) {
                template = data.data.template;
            }

            for (var i = 0; i < template.length; i++) {

                var tplData = template[i];
                var container = document.createElement('div');

                container.setAttribute('mip-custom-container', i);
                element.appendChild(container);

                // dom 渲染
                dom.render(element, tplData, container);
            }
        }, function (error) {
            log.sendLog(logData.host, util.fn.extend(logData.error, logData.params, errorData));
            element.remove();
            errorData.en = error;
            console.error(error);
        }).catch(function (evt) {
            console.warn(evt);
        });
    };

    return customElement;
});
