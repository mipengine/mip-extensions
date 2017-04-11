/**
 * @file mip-custom 组件
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    var templates = require('templates');
    var fetchJsonp = require('fetch-jsonp');

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

    function getUrlparams () {
        var params = {};
        
        var url = location.href.split('#');
        var args = url && url[1] ? url[1].split('&') : [];

        for(var index = 0; index < args.length; index ++) {
            var tmp = args[index].split('=');
            if(tmp[0] && tmp[1]) {
                params[tmp[0]] = tmp[1];
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
        var url = 'http://172.20.136.127:3000/mip-custom?';
        
        for (key in self.params) {
            if (self.params.hasOwnProperty(key)) {
                url += key + '=' + self.params[key] + '&';
            }
        }
        return url;
    }

    function getSubString(str, reg) {
        var res = str.match(reg) && str.match(reg)[1] ? str.match(reg)[1] : '';
        return res;
    }

    /**
     * 构造元素，初次进入到视图区执行
     */
    customElement.prototype.firstInviewCallback = function () {
        // TODO
        var self = this;
        var element = self.element;

        // 默认参数设置
        self.params = getUrlparams();

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

        fetchJsonp(self.url, {
            jsonpCallback: 'callback'
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var str = decodeURIComponent(data[i].tpl);

                // style 处理
                var style = getSubString(str, /<style>(\S*)<\/style>/);
                var head = document.querySelector('head');
                if (style && head) {
                    var styleTag = head.querySelector('style[mip-custom]');
                    if (styleTag) {
                        styleTag.innerText = styleTag.innerHTML + style;
                    } else {
                        var styleCustom = document.createElement('style');
                        styleCustom.setAttribute('mip-custom', '');
                        styleCustom.innerHTML = style;
                        head.appendChild(styleCustom);
                    }
                }

                // html 处理
                var html = getSubString(str,/<\/style>([\S\s]*)<script>/);
                var customTag = getSubString(html, /<(\S*)>/);
                var tplId = customTag + '-' + Math.random().toString(36).slice(2);
                var customNode = document.createElement(customTag);
                var tpl = document.createElement('template');

                customNode.setAttribute('template', tplId);
                customNode.appendChild(tpl);

                tpl.setAttribute('type', 'mip-mustache');
                tpl.id = tplId;
                tpl.innerHTML = getSubString(html, />([\S\s]*)<\//);
                element.appendChild(customNode);
                
                // 模板渲染
                templates.render(customNode, data[i].data).then(function (htmls) {
                    customNode.innerHTML += htmls;
                });
                
                // script 处理
                var script = getSubString(str, /<script>([\S\s]*)<\/script>/);
                var node = document.createElement('script');
                node.innerHTML = script;
                element.appendChild(node);
            }
        });

    };

    return customElement;
});
