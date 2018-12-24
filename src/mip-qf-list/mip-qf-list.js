/**
 * @file mip-qf-list 组件
 * @author W_peach
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var $ = require('zepto');
    var fetchJsonp = require('fetch-jsonp');

    /**
     * [renderTemplate 获取模板]
     *
     * @param  {Object} data 渲染数据
     */
    function renderTemplate(data) {
        var self = this;
        if (data) {
            templates.render(
                self.element, data.data
            ).then(render.bind(self));
        }
        else {
            tip(self.element, '数据不符合规范', 'success');
        }
    }

    /**
     * [render dom渲染函数]
     *
     * @param  {Array} htmls [html对象数组]
     */
    function render(htmls) {
        var self = this;
        var fragment = document.createDocumentFragment();
        htmls.map(function (html) {
            var node = document.createElement('div');
            node.innerHTML = html;
            node.setAttribute('role', 'listitem');
            fragment.appendChild(node);
        });
        self.container.appendChild(fragment);
    }

    /**
     * [getUrl 函数获取最后拼接好的数据请求]
     *
     * @param  {string}  src      原始 url
     * @param  {string}  pnName   翻页字段名
     * @param  {integer} pn       页码
     * @param  {string}  relaid   游戏id
     * @param  {string}  columns  参数
     * @param  {string}  pagesize 请求元素数量
     * @param  {el}      el       提示框绑定元素
     * @return {url}              拼接好的url
     */
    function getUrl(src, pnName, pn, relaid, columns, pagesize, el) {
        if (!src) {
            tip(el, 'mip-qf-list 的 src 属性不能为空', 'error');
            return;
        }
        if (!pnName || !pn) {
            return;
        }

        var url = src;

        if (src.indexOf('?') > 0) {
            url += src[src.length - 1] === '?' ? '' : '&';
        }
        else {
            url += '?relaid=' + relaid + '&relatype=Game';
            url += '&columns=' + columns;
            url += '&' + pnName + '=' + pn;
            url += '&pagesize=' + pagesize;
        }

        return url;
    }

    /**
     * [pushResult push结果函数]
     *
     * @param  {string} src ajax请求的url
     */
    function pushResult(src) {
        var self = this;

        self.button.innerHTML = '加载中...';
        var pn = Number(self.pn) + 1;
        var url = getUrl(src, self.pnName, pn, self.relaid, self.columns, self.pageSize, self.element);

        fetch(url, {
            jsonpCallback: 'callback',
            timeout: self.timeout
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data._Status && data.data) {
                renderTemplate.call(self, data);
                self.button.innerHTML = '点击查看更多';
                if (data.total === 0) {
                    self.total = data.total;
                    self.button.innerHTML = '已经加载完毕';
                    self.button.removeAttribute('on');
                }
            }
            else {
                self.button.innerHTML = '加载失败';
            }
        });
    }

    /**
     * [updateResult 发表评论刷新列表函数]
     *
     * @param {string}   src      ajax请求的url
     * @param {string}   pn       页码
     * @param {string}  pnName   翻页字段名
     * @param {string}  relaid   游戏id
     * @param {string}  columns  参数
     * @param {string}  pageSize 请求元素数量
     * @param {string}  el       标记元素
     * @param {string}  self     标记
     */
    function updateResult(src, pn, pnName, relaid, columns, pageSize, el, self) {
        var url = getUrl(src, pnName, pn, relaid, columns, pageSize, el);

        fetch(url, {
            jsonpCallback: 'callback',
            timeout: self.timeout
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data._Status && data.data) {
                if (data._Status === 1) {
                    self.container.innerHTML = ''; // 先清空模版内元素再请求数据渲染
                    renderTemplate.call(self, data);
                    tip(el, '评论成功！', 'success');
                }
            }
        });
    }

    /**
     * [tip 提示框函数]
     *
     * @param {string} el      提示框位置相对元素
     * @param {string} message 提示框文案
     * @param {string} type    提示框类型
     */
    function tip(el, message, type) {
        document.querySelector('html').style.fontSize = '50px';
        var tipBox = document.createElement('span');
        var color;

        tipBox.innerHTML = message;
        el.appendChild(tipBox);
        tipBox.classList.add('tip-box');

        type === 'success' ? color = '#909399' : type === 'error' ? color = '#F56C6C' : color = '#67C23A';
        tipBox.style.background = color;

        $(tipBox).fadeIn('slow');
        setTimeout(function () {
            $(tipBox).fadeOut('slow');
        }, 2000);
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var self = this;
        var element = this.element;
        var columns = element.getAttribute('columns') || 'id,member,content,support';

        self.container = document.createElement('div');
        self.applyFillContent(this.container);
        self.element.appendChild(this.container);


        if (!self.container.hasAttribute('role')) {
            self.container.setAttribute('role', 'list');
        }

        // 异步获取数据
        var src = element.getAttribute('src') || '';
        var url = src;
        if (!src) {
            tip(element, 'mip-qf-list 的 src 属性不能为空', 'success');
        }


        self.relaid = element.getAttribute('relaid') || '';
        self.columns = columns.replace(/,/g, '%2C');
        self.pageSize = element.getAttribute('pageSize') || 10;
        self.pnName = element.getAttribute('pnName') || 'pageindex';
        self.pn = element.getAttribute('pn') || 1;

        // fetch-jsonp timeout 请求时长
        self.timeout = element.getAttribute('timeout') || 5000;
        // 有查看更多属性的情况
        if (element.hasAttribute('has-more')) {
            // 点击查看更多触发
            self.addEventAction('more', function (e) {
                self.button = e.target;
                pushResult.call(self, src);
            });
        }

        // 发表评论触发
        self.addEventAction('update', function (e) {
            self.button = e.target;
            updateResult(src, self.pn, self.pnName, self.relaid, self.columns, self.pageSize, element, self);
        });

        var url = getUrl(src, self.pnName, self.pn, self.relaid, self.columns, self.pageSize);
        fetch(url, {
            jsonpCallback: 'callback',
            timeout: self.timeout
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data._Status && data.data) {
                if (data.total === 0) { // 暂无评论
                    var span = document.createElement('span');
                    span.innerHTML = '暂无评论';
                    element.appendChild(span);
                    document.querySelector('#btn-more').style.display = 'none';
                    return false;
                }
                renderTemplate.call(self, data); // 模版渲染
            } else {
                tip(element, '发生错误, 请联系管理员', 'success');
            }
        });
    };

    return customElement;
});
