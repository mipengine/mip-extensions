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
        // self.url = 'http://cp01-aladdin-product-28.epc.baidu.com:8500/common?query=%E4%B8%B0%E8%83%B8&originalUrl=xywy.com/fijdsjfidsf&accid=e2217bab684fbb898dccf04b&title=%E8%87%AA%E4%BD%93%E8%84%82%E8%82%AA%E4%B8%B0%E8%83%B8,%E5%B0%86%E4%BD%93%E5%86%85%E5%A4%9A%E4%BD%99%E8%84%82%E8%82%AA%E7%A7%BB%E6%A4%8D%E4%B8%B0%E8%83%B8,%E5%90%8C%E6%97%B6%E5%81%9A%E5%88%B0%E7%98%A6%E8%BA%AB%E5%92%8C%E4%B8%B0%E8%83%B8,%E8%84%82..&logid=10421587805058473194'
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
