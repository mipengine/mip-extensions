/**
 * @file mip-custom 组件
 * @author
 */

define(function () {
    /**
     * [viewer 窗口]
     * @type {Object}
     */
    var viewer = require('viewer');

    /**
     * [fetchJsonp jsonp异步请求库]
     * @type {Object}
     */
    var fetchJsonp = require('fetch-jsonp');

    /**
     * [customElement 组件元素]
     * @type {Object}
     */
    var customElement = require('customElement').create();

    var url = require('mip-custom/url');
    var dom = require('mip-custom/dom');
    var dataProcessor = require('mip-custom/data');

    /**
     * 构造元素，初次进入到视图区执行
     */
    customElement.prototype.build = function () {

        var self = this;
        var element = self.element;
        var regexs = dataProcessor.regexs;

        // 非结果页进入不展现定制化内容
        if (!viewer.isIframed) {
            element.remove();
            return;
        }

        if (!(regexs.domain.test(window.document.referrer) || location.host === 'mipcache.bdstatic.com')) {
            element.remove();
            return;
        }

        var commonData = {};
        var template = {};

        // 监听 a 标签点击事件
        dom.proxyLink(element);

        self.url = url.get(element);
        if (!self.url) {
            element.remove();
            return;
        }
        fetchJsonp(self.url, {
            timeout: 10000,
            jsonpCallback: 'cb'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            
            // 返回数据问题
            if (data && data.errno) {
                console.error(data.errmsg);
                element.remove();
                return;
            }

            // amd 静态文件配置，短期处理
            if (data && dataProcessor.config) {
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
            element.remove();
            console.error(error);
        }).catch(function (evt) {
            console.warn(evt);
        });
    };

    return customElement;
});
