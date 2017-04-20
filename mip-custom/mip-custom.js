/**
 * @file mip-custom 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();

    var templates = require('templates');
    var viewer = require('viewer');

    var regexs = {
        html: /<mip-\S*>(.*)<\/mip-\S*></,
        script: /<script[^>]*>(.*?)<\/script>/g,
        style: /<style[^>]*>(.*?)<\/style>/g,
        innerhtml: />([\S\s]*)<\//,
        customTag: /<(mip-[^>]*)>/,
        httppathname: /\/c\/(\S*)/,
        httpspathname: /\/c\/s\/(\S*)/
    };

    var params = {
        lid: "",
        query: "",
        title: '',
        cuid: "",
        originUrl: getSubString(location.pathname, regexs.httpspathname) || getSubString(location.pathname, regexs.httppathname)
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

    function getHashparams() {
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                params[key] = MIP.hash.get(key) || params[key];
            }
        }

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
        var url = 'https://mipcache.bdstatic.com/custom?';

        for (var key in self.params) {
            if (self.params.hasOwnProperty(key)) {
                url += key + '=' + self.params[key] + '&';
            }
        }
        return url;
    }

    function getSubString(str, reg, pos) {
        pos = pos ? 0 : 1;
        var res = str.match(reg) && str.match(reg)[pos] ? str.match(reg)[pos] : '';
        return res;
    }

    function set (str, reg, tag, attr, container) {
        var node = container.querySelector(tag+ '[' + attr + ']') || document.createElement(tag);
        node.setAttribute(attr,'');
        var style = str.match(reg);
        style && style.forEach(function(tmp) {
            var r = new RegExp("<" + tag + ">([\\S\\s]*)</" + tag + ">");
            var innerhtml = tmp.match(r)[1];
            if (node.innerHTML.indexOf(innerhtml) === -1) {
                node.innerHTML += innerhtml;
            }
        });
        container.appendChild(node);
    }

    /**
     * 构造元素，初次进入到视图区执行
     */
    customElement.prototype.build = function () {

        // if (!viewer.isIframe) {
        //     return;
        // }

        var self = this;
        var element = self.element;

        // 默认参数设置
        self.params = getHashparams();

        // 获取用户设置参数
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
        // self.url = 'http://cp01-aladdin-product-28.epc.baidu.com:8500/common?query=%E9%BA%BB%E7%83%A6&originalurl=xywy.com/fdsjifosdf/fjdsof&uid=12133&title=test';
        console.log(self.url);

        fetch(self.url).then(function (res) {
            return res.json();
        }).then(function (data) {

            if (data && data.errno) {
                console.error(data.status.errormsg);
                return;
            }
            if (data && data.data && data.data.common) {
                commonData = data.data.common;
            }
            if (data && data.data && data.data.template) {
                template = data.data.template;
            }

            for(var k = 0; k < template.length; k++) {
                var tplData = template[k];
                var container = document.createElement('div');
                container.setAttribute('mip-custom-item', k);
                element.appendChild(container);

                console.log(3);
                for (var i = 0; i < tplData.length; i++) {
                    var str = tplData[i].tpl ? decodeURIComponent(tplData[i].tpl) : null;
                    if (!str) {
                        return;
                    }
                    var html = str.replace(regexs.script, '')
                                  .replace(regexs.style, '');
                    var customTag = getSubString(html, regexs.customTag);

                    // style 处理
                    set(str, regexs.style, 'style', 'mip-custom-css', document.head);

                    // script 处理
                    set (str, regexs.script, 'script', customTag, document.body);

                    // html 处理
                    var tplId = customTag + '-' + Math.random().toString(36).slice(2);
                    var customNode = document.createElement(customTag);
                    var tpl = document.createElement('template');

                    customNode.setAttribute('template', tplId);
                    customNode.appendChild(tpl);

                    tpl.setAttribute('type', 'mip-mustache');
                    tpl.id = tplId;
                    tpl.innerHTML = getSubString(html, regexs.innerhtml);
                    container.appendChild(customNode);

                    // 模板渲染
                    var key = 0;
                    templates.render(customNode, tplData[i].tpldata, true).then(function (res) {
                        res.element.innerHTML = res.html;
                    });
                }
            }
        });
    };

    return customElement;
});
