/**
 * @file mip-list 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');

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
     * @param  {Array} elements [dom节点对象数组]
     */
    function render(htmls) {
        var self = this;
        htmls.map(function (html) {
            var node = document.createElement("div");
　　         node.innerHTML = html;
            var element = node.childNodes[1];
            
            if (!element.hasAttribute('role')) {
                element.setAttribute('role', 'listitem');
            }
            self.container.appendChild(element);
        });
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.createdCallback = function () {
        var self = this;
        var element = this.element;

        this.container = document.createElement('div');
        this.applyFillContent(this.container);
        this.element.appendChild(this.container);

        if (!this.container.hasAttribute('role')) {
            this.container.setAttribute('role', 'list');
        }
        // 同步配置数据
        if (element.hasAttribute('synchronous-data')) {
            var script = element.querySelector('script[type="application/json"]');
            var data = JSON.parse(script.textContent.toString());
            renderTemplate.call(this, data);
            return;
        }

        // 异步获取数据
        var src = this.element.getAttribute('src') || '';
        if (!src) {
            console.error('mip-list 的 src 属性不能为空');
        }

        var fetchJsonp = require('fetch-jsonp');
        fetchJsonp(src, {
            jsonpCallback: 'cb'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            data = {
                items: [
                    {
                        key: '姓名',
                        value: '钟汉良'
                    }, {
                        key: '性别',
                        value: '男'
                    }, {
                        key: '职业',
                        value: '演员'
                    }
                ]
            };
            renderTemplate.call(self, data);
        });
    };

    return customElement;
});
