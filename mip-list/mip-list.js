/**
 * @file mip-list 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} data 渲染数据
     */
    function renderTemplate(data) {
        var self = this;
        if (data && data.items && data.items instanceof Array) {
            templates.render(
                self.element, data.items
            ).then(render.bind(self));
        }
        else {
            console.error('数据不符合规范');
        }
    }

    /**
     * [render dom渲染函数]
     *
     * @param  {Array} htmls [html对象数组]
     */
    function render(htmls) {
        var self = this;
        htmls.map(function (html) {
            var node = document.createElement('div');
            node.innerHTML = html;
            var element = node.childNodes[1];

            if (!element.hasAttribute('role')) {
                element.setAttribute('role', 'listitem');
            }
            self.container.appendChild(element);
        });
    }

    /**
     * [pushResult push结果函数]
     *
     * @param  {string} src ajax请求的url
     */
    function pushResult(src) {
        var self = this;

        if (self.isEnd) {
            return;
        }

        self.button = document.querySelector('.mip-list-more');
        self.button.innerHTML = '加载中...';

        fetchJsonp(src + '?pn=' + self.pn++, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            renderTemplate.call(self, data);
            self.button.innerHTML = '点击查看更多';
            if (data.isEnd) {
                self.isEnd = data.isEnd;
                self.button.innerHTML = '已经加载完毕';
            }
        });
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;

        self.container = document.createElement('div');
        self.applyFillContent(this.container);
        self.element.appendChild(this.container);

        if (!self.container.hasAttribute('role')) {
            self.container.setAttribute('role', 'list');
        }

        // 同步配置数据
        if (element.hasAttribute('synchronous-data')) {
            var script = element.querySelector('script[type="application/json"]');
            var data = script ? JSON.parse(script.textContent.toString()) : null;
            renderTemplate.call(self, data);
            return;
        }

        // 异步获取数据
        var src = element.getAttribute('src') || '';
        var url = src;
        if (!src) {
            console.error('mip-list 的 src 属性不能为空');
        }

        // 有查看更多属性的情况
        if (element.hasAttribute('has-more')) {
            self.pn = element.getAttribute('pn') || 1;
            url += '?pn=' + self.pn++;

            self.addEventAction('more', function () {
                pushResult.call(self, src);
            });
        }

        fetchJsonp(url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            renderTemplate.call(self, data);
        });
    };

    return customElement;
});
