/**
 * @file mip-custom 组件
 * @author
 */

define(function () {

    var util = require('util');
    var viewer = require('viewer');
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();

    /**
     * [regexs 正则表达式]
     * @type {Object}
     */
    var regexs = {
        html: /<mip-\S*>(.*)<\/mip-\S*></,
        script: /<script[^>]*>(.*?)<\/script>/g,
        style: /<style[^>]*>(.*?)<\/style>/g,
        innerhtml: />([\S\s]*)<\//,
        customTag: /<(mip-\S+)>/,
        tagandAttr: /<(mip-[^>]*)>/,
        reghttp: /\/c\/(\S*)/,
        reghttps: /\/c\/s\/(\S*)/
    };

    /**
     * [params 请求数据所需参数]
     * @type {Object}
     */
    var params = {
        logid: '',
        query: '',
        title: '',
        cuid: '',
        originalUrl: getSubString(location.pathname, regexs.reghttps) || getSubString(location.pathname, regexs.reghttp)
    };
    var commonData = {};
    var template = {};

    /**
     * [extendObj 合并数据]
     *
     * @param  {Object} opt 默认数据对象
     * @param  {Object} ext 需要合并的数据对象
     * @return {Object}     合并后的数据对象
     */
    function extendObj(opt, ext) {

        for (var key in ext) {
            if (ext.hasOwnProperty(key)) {
                opt[key] = ext[key];
            }
        }

        return opt;
    }

    /**
     * [getHashparams mip连接特殊情况，从 hash 中获取参数
     *
     * @return {Object}     合并后的数据对象
     */
    function getHashparams() {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                params[key] = MIP.hash.get(key) || params[key];
            }
        }

        // 修改字段名
        params.query = MIP.hash.get('word') || '';
        params.logid = MIP.hash.get('lid') || '';
        return params;
    }

    /**
     * [getUrl url 拼接函数]
     *
     * @param  {string} src 获取的最初url
     * @return {string}     拼接后的url
     */
    function getUrl() {
        var self = this;
        var firstKey = true;
        var url = 'https://mipengine.baidu.com/common?';

        for (var key in self.params) {
            if (self.params.hasOwnProperty(key)) {
                url += (!firstKey ? '&' : '') + key + '=' + self.params[key];
                firstKey = false;
            }
        }
        return url;
    }

    /**
     * [getSubString 根据正则获取子串]
     *
     * @param  {string}  str [截取钱字符串]
     * @param  {RegExp}  reg [正则表达式]
     * @param  {integer} pos [位置]
     * @return {string}      [截取后字符串]
     */
    function getSubString(str, reg, pos) {
        pos = pos ? 0 : 1;
        var res = str.match(reg) && str.match(reg)[pos] ? str.match(reg)[pos] : '';
        return res;
    }

    function set(str, reg, tag, attr, container) {

        var node = container.querySelector(tag + '[' + attr + ']') || document.createElement(tag);
        node.setAttribute(attr, '');
        var substrs = str.match(reg);
        substrs && substrs.forEach(function (tmp) {
            var reg = new RegExp('<' + tag + '>([\\S\\s]*)</' + tag + '>', 'g');
            var substr = reg.exec(tmp);
            var innerhtml = substr && substr[1] ? substr[1] : '';

            if (node.innerHTML.indexOf(innerhtml) === -1) {
                node.innerHTML += innerhtml;
            }
        });

        container.appendChild(node);
    }

    /**
     * [getXPath 获取 xpath 数组]
     *
     * @param  {DOM}   node [点击节点]
     * @param  {DOM}   wrap [容器]
     * @param  {Array} path [结果数组]
     * @return {Array}      [结果数组]
     */
    function getXPath(node, wrap, path) {
        path = path || [];
        wrap = wrap || document;
        if (node === wrap || !node || !wrap) {
            return path;
        }
        if (node.parentNode !== wrap) {
            path = getXPath(node.parentNode, wrap, path);
        }
        var count = 1;
        var sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
                count++;
            }
            sibling = sibling.previousSibling;
        }
        if (node.nodeType === 1) {
            path.push(node.nodeName.toLowerCase() + (count > 1 ? count : ''));
        }
        return path;
    }

    /**
     * 构造元素，初次进入到视图区执行
     */
    customElement.prototype.build = function () {

        // 非结果页进入不展现定制化内容
        if (!viewer.isIframed) {
            return;
        }
        if (!(/^https:\/\/m.baidu.com/.test(window.document.referrer) || location.host === 'mipcache.bdstatic.com')) {
            return;
        }

        var self = this;
        var element = self.element;

        // 监听 a 标签点击事件
        util.event.delegate(element, 'a', 'click', function (event) {
            if (this.hasAttribute('clicked', '')) {
                return;
            }

            event && event.preventDefault();
            this.setAttribute('clicked', '');

            var xpath = '';
            var path = getXPath(this, element);
            path && path.forEach(function (val) {
                xpath += xpath ? '_' + val : val;
            });

            this.href += ((this.href[this.href.length - 1] === '&') ? '' : '&')
                      + 'clk_info=' + JSON.stringify({xpath: xpath});
            this.click();
        });

        // 默认参数设置
        self.params = getHashparams();

        // 获取用户设置参数，获取不到
        try {
            var script = element.querySelector('script[type="application/json"]');
            if (script) {
                self.params = extendObj(self.params, JSON.parse(script.textContent.toString()));
            }
        }
        catch (error_msg) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(error_msg); // eslint-disable-line
            return;
        }
        self.url = getUrl.call(self);
        fetchJsonp(self.url, {
            timeout: 5000,
            jsonpCallback: 'cb'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {

            // 返回数据问题
            if (data && data.errno) {
                console.error(data.errmsg);
                return;
            }

            // amd 静态文件配置，短期处理
            data.config = {
                domain: 'https://mipengine.baidu.com/',
                paths: {
                    'js/nav': 'static/js/nav',
                    'js/util': 'static/js/util',
                    'js/mip-ecom/ck': 'static/js/mip-ecom/ck'
                }
            };
            if (data && data.config) {
                if (data.config.paths) {
                    for (var key in data.config.paths) {
                        if (data.config.paths.hasOwnProperty(key)) {
                            data.config.paths[key] = data.config.domain + data.config.paths[key];
                        }
                    }
                }
                require.config(data.config);
            }

            // common 数据缓存
            if (data && data.data && data.data.common) {
                commonData = data.data.common;
            }

            // 模板数据缓存
            if (data && data.data && data.data.template) {
                template = data.data.template;
            }

            for (var tplLen = 0; tplLen < template.length; tplLen++) {
                var tplData = template[tplLen];

                var container = document.createElement('div');
                container.setAttribute('mip-custom-container', tplLen);
                element.appendChild(container);

                for (var len = 0; len < tplData.length; len++) {

                    var str = tplData[len].tpl ? decodeURIComponent(tplData[len].tpl) : null;
                    if (!str) {
                        return;
                    }

                    var html = str.replace(regexs.script, '').replace(regexs.style, '');
                    var reg = new RegExp('\<([^\\s|\>]*)', 'g');
                    var customTag = reg.exec(html)[1];

                    // style 处理
                    set(str, regexs.style, 'style', 'mip-custom-css', document.head);

                    // html 处理
                    var tplId = customTag + '-' + Math.random().toString(36).slice(2);
                    var customNode = document.createElement(customTag);
                    var tag = getSubString(html, regexs.tagandAttr);
                    var tagArray = tag.split(' ');
                    for (var index = 0; index < tagArray.length; index++) {
                        var attrs = tagArray[index].split('=');
                        if (attrs[1]) {
                            customNode.setAttribute(attrs[0], attrs[1].replace(/"/ig, ''));
                        }
                    }

                    var tpl = document.createElement('template');

                    customNode.setAttribute('template', tplId);
                    customNode.appendChild(tpl);

                    tpl.setAttribute('type', 'mip-mustache');
                    tpl.id = tplId;
                    tpl.innerHTML = getSubString(html, regexs.innerhtml);
                    var item = document.createElement('div');
                    item.setAttribute('mip-custom-item', len);
                    item.appendChild(customNode);
                    container.appendChild(item);

                    // 模板渲染
                    templates.render(customNode, tplData[len].tplData, true).then(function (res) {
                        res.element.innerHTML = res.html;
                        return len;
                    });

                    set(str, regexs.script, 'script', customTag, document.body);
                }
            }
        }, function (error) {
            console.error(error);
        }).catch(function (evt) {
            console.warn(evt);
        });
    };

    return customElement;
});
