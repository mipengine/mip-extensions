/**
 * @file mip-ad-ecom/dom
 * @author JennyL
 */
define(function (require) {

    /**
     * [util 引入工具类]
     * @type {Object}
     */
    var util = require('util');

    /**
     * [templates 模板库]
     * @type {Object}
     */
    var templates = require('templates');

    /**
     * [fixedElement 引入 fixed 元素类]
     * @type {Object}
     */
    var fixedElement = require('fixed-element');

    // var log = require('mip-ad-ecom/log');
    var dataProcessor = require('mip-ad-ecom/data');
    var regexs = dataProcessor.regexs;

    var maxzIndex = 0;
    var excr = 44;

    /**
     * [getCss 获取样式]
     * 由于目前只需要取 height 和 paddig-bottom,
     * 所以对util.css结果进行处理, 返回整数
     *
     * @param  {DOM} elem     dom 节点
     * @param  {string} style 获取样式
     * @return {integer} res 返回的数值
     */
    function getCss(elem, style) {
        var res = parseInt(util.css(elem, style), 10);
        return res || 0;
    }

    /**
     * [renderStyleOrScript 渲染 style/script 函数]
     * 截取 style/script 并插入到 dom 中
     *
     * @param {string} str    返回的 tpl 字符串
     * @param {RegExp} reg    截取的正则表达式
     * @param {string} tag    定制化 MIP 标签名
     * @param {string} attr   style/script
     * @param {DOM} container style/script 节点的容器
     */
    function renderStyleOrScript(str, reg, tag, attr, container) {
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
     * [createTemplateNode 创建定制化组件的 template 子节点]
     *
     * @param  {string}  html 定制化组件 dom 字符串
     * @param  {integer} id   template id
     * @return {DOM}     tpl  template 子节点
     */
    function createTemplateNode(html, id) {
        var tpl = document.createElement('template');
        tpl.setAttribute('type', 'mip-mustache');
        tpl.id = id;
        tpl.innerHTML = dataProcessor.subStr(html, regexs.innerHtml);
        return tpl;
    }

    /**
     * [createCustomNode 创建定制化组件节点]
     *
     * @param  {string} html      定制化组件 dom 字符串
     * @param  {string} customTag 定制化组件标签
     * @return {DOM}    node      定制化组件节点
     */
    function createCustomNode(html, customTag) {
        var node = document.createElement(customTag);
        var tagandAttrs = dataProcessor.subStr(html, regexs.tagandAttr).split(' ');

        for (var i = 0; i < tagandAttrs.length; i++) {
            var attrs = tagandAttrs[i].split('=');

            if (attrs[0] && attrs[1]) {
                node.setAttribute(attrs[0], attrs[1].replace(/"/ig, ''));
            }
        }

        var id = customTag + '-' + Math.random().toString(36).slice(2);
        node.setAttribute('template', id);
        node.appendChild(createTemplateNode(html, id));

        return node;
    }

    /**
     * [renderHtml 渲染html]
     *
     * @param  {DOM}     element   mip-ad-ecom 节点
     * @param  {string}  str       返回的 tpl 字符串
     * @param  {integer} len       模块中第几个组件
     * @param  {Object}  result    渲染mustache模板的数据
     * @param  {DOM}     container 装载定制化组件节点的容器
     * @return {string}  customTag 定制化组件标签
     */
    function renderHtml(element, str, len, result, container) {
        var html = str.replace(regexs.script, '').replace(regexs.style, '');
        var customTag = (new RegExp(regexs.tag, 'g')).exec(html);
        customTag = customTag && customTag[1] ? customTag[1] : null;

        if (!customTag) {
            return null;
        }

        // html 处理
        var customNode = createCustomNode(html, customTag);
        var itemNode = document.createElement('div');
        itemNode.setAttribute('mip-ad-ecom-item', len);
        itemNode.appendChild(customNode);
        container.appendChild(itemNode);
        // 模板渲染
        templates.render(customNode, result, true).then(function (res) {
            res.element.innerHTML = res.html;

            if (res.element.hasAttribute('mip-fixed')
                && res.element.parentNode.getAttribute('type') === 'bottom') {
                fixedElement.setPlaceholder();
                var zIndex = getCss(res.element.parentNode, 'z-index');

                if (zIndex >= maxzIndex) {
                    maxzIndex = zIndex;
                    // alert(getCss(res.element, 'height') - 10)
                    fixedElement.setPlaceholder(getCss(res.element, 'height') - excr);
                }
            }
        });

        return customTag;
    }

    /**
     * [render dom 渲染]
     *
     * @param  {DOM}   element   mip-ad-ecom 节点
     * @param  {Array} tplData   渲染mustache模板的数据数组
     * @param  {DOM}   container 装载定制化组件节点的容器
     */
    function render(element, tplData, container) {
        for (var len = 0; len < tplData.length; len++) {

            // 某条结果为空时不渲染此条结果
            var result = tplData[len].tplData;
            if (!result || (result instanceof Array && !result.length)
                || (result instanceof Object && !Object.keys(result).length)) {
                continue;
            }

            // 某条结果 tpl 为空时不渲染此条结果
            var str = tplData[len].tpl ? decodeURIComponent(tplData[len].tpl) : null;
            if (!str) {
                continue;
            }

            // style 处理
            renderStyleOrScript(str, regexs.style, 'style', 'mip-ad-ecom-css', document.head);

            // html 处理
            var customTag = renderHtml(element, str, len, result, container);

            if (!customTag) {
                continue;
            }

            // script 处理
            renderStyleOrScript(str, regexs.script, 'script', customTag, document.body);

        }
    }

    /**
     * [proxyLink a 标签事件代理]
     *
     * @param  {DOM} element    mip-ad-ecom, 只监听当前组件下的 a 标签
     * @param  {DOM} fixedLayer fixed body
     */
    function proxyLink(element, fixedLayer) {
        util.event.delegate(element, 'a', 'click', function (event) {
            if (this.hasAttribute('mip-link') || /clk_info/.test(this.href)) {
                return;
            }

            // 处理需要单独发送日志的 a 标签
            var link = this.getAttribute('data-log-href');

            var path = null;
            if (fixedLayer) {
                path = log.getXPath(this, fixedLayer);
                path.unshift('.mip-fixedlayer');
            }
            else {
                path = log.getXPath(this, element);
            }
            var xpath = path ? path.join('_') : '';

            var logUrl = (link) ? link : this.href;
            logUrl += ((logUrl[logUrl.length - 1] === '&') ? '' : '&')
                      + 'clk_info=' + JSON.stringify({xpath: xpath});
            if (link) {
                // log.sendLog(logUrl, {});
            }
            else {
                this.href = logUrl;
            }
        });
    }


    /**
     * [getConfigScriptElement 获取页面配置的content内容]
     * 不在此做解析
     *
     * @param  {HTMLElement} elem     mip-ad-ecom element 节点
     * @return {HTMLScriptElement}    返回`application/json`的script配置节点
     */
    function getConfigScriptElement(elem) {
        if (!elem) {
            return;  
        }
        // scriptJson: 配置script写在组件标签内部
        var scriptJson = elem.querySelector('script[type="application/json"]');
        if (!scriptJson) {
            // 需要mustache渲染情况下，为了防止sanitizer.js移除script，将配置写在组件外
            scriptJson = document.querySelector('script[for="' + elem.id + '"]');
        }
        return scriptJson;
    }

    // 广告加载前loading效果
    function addPlaceholder() {
        var placeholder = document.createElement('div');
        this.placeholder = placeholder;
        placeholder.classList.add('mip-ad-ecom-placeholder');
        placeholder.setAttribute('mip-ad-ecom-container', '');
        placeholder.innerHTML = ''
            + '<span class="mip-ad-ecom-placeholder-title"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text1"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text2"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text3"></span>'
            + '<span class="mip-ad-ecom-placeholder-space"></span>'
            + '<span class="mip-ad-ecom-placeholder-title"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text1"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text2"></span>'
            + '<span class="mip-ad-ecom-placeholder-text text3"></span>';
        this.element.appendChild(placeholder);
    }
    // 移除 广告占位
    function removePlaceholder() {
        var me = this;
        this.placeholder.classList.add('fadeout');
        // 占位符增加淡出效果
        this.placeholder.addEventListener('transitionend', function () {
            me.placeholder.remove();
        }, false);
        this.placeholder.addEventListener('webkitTransitionend', function () {
            me.placeholder.remove();
        }, false);
    }

    return {
        render: render,
        proxyLink: proxyLink,
        getConfigScriptElement: getConfigScriptElement,
        addPlaceholder: addPlaceholder,
        removePlaceholder: removePlaceholder
    };
});
