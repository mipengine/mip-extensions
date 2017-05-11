/**
 * @file mip-custom/dom
 * @author pearl
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

    var log = require('mip-custom/log');
    var dataProcessor = require('mip-custom/data');
    var regexs = dataProcessor.regexs;

    /**
     * [getCss 获取样式]
     * 由于目前只需要取 height 和 paddig-bottom，
     * 所以对util.css结果进行处理，返回整数
     *
     * @param  {DOM} elem     dom 节点
     * @param  {string} style 获取样式
     * @return {integer} res 返回的数值
     */
    function getCss(elem, style) {
        var res = parseInt(util.css(elem, style).slice(0, -2), 10);
        return res || 0;
    }

    /**
     * [moveToFixedLayer 需要悬浮的组件外层嵌套mip-fixed并移动到 fixed layer]
     *
     * @param  {DOM} element    mip-custom 节点
     * @param  {DOM} customNode 定制化组件节点
     * @param  {DOM} container  装载定制化组件节点的容器
     */
    function moveToFixedLayer(element, customNode, container) {
        container.remove();
        var idx = document.querySelectorAll('mip-fixed').length || 0;
        var type = customNode.getAttribute('mip-fixed');
        var top = customNode.getAttribute('top') || null;
        var bot = customNode.getAttribute('bottom') || null;
        var fixedParent = document.createElement('mip-fixed');

        // 所有悬浮时，设置距离 top/bottom 的距离
        if (customNode.hasAttribute('top') && top) {
            util.css(fixedParent, {top: top});
        }
        if (customNode.hasAttribute('bottom') && bot) {
            util.css(fixedParent, {bottom: bot});
        }
        fixedParent.setAttribute('type', type);
        fixedParent.appendChild(customNode);
        element.appendChild(fixedParent);

        // 结果页打开，移动到 fixed layer
        if (fixedElement._fixedLayer) {
            var data = {
                element: fixedParent,
                id: 'Fixed' + idx
            };
            fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
        }
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
        tpl.innerHTML = dataProcessor.subStr(html, regexs.innerhtml);

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
     * @param  {DOM}     element   mip-custom 节点
     * @param  {string}  str       返回的 tpl 字符串
     * @param  {integer} len       模块中第几个组件
     * @param  {Object}  result    渲染mustache模板的数据
     * @param  {DOM}     container 装载定制化组件节点的容器
     * @return {string}  customTag 定制化组件标签
     */
    function renderHtml(element, str, len, result, container) {
        var html = str.replace(regexs.script, '').replace(regexs.style, '');
        var customTag = (new RegExp(regexs.tag, 'g')).exec(html)[1];

        // html 处理
        var customNode = createCustomNode(html, customTag);
        var itemNode = document.createElement('div');
        itemNode.setAttribute('mip-custom-item', len);
        itemNode.appendChild(customNode);
        container.appendChild(itemNode);

        if (customNode.hasAttribute('mip-fixed')) {
            moveToFixedLayer(element, customNode, container);
        }

        // 模板渲染
        templates.render(customNode, result, true).then(function (res) {
            res.element.innerHTML = res.html;

            if (res.element.hasAttribute('mip-fixed')
                && res.element.parentNode.getAttribute('type') === 'bottom') {

                var height = getCss(res.element, 'height');
                var paddingBottom = getCss(element, 'padding-bottom');
                util.css(element, {'padding-bottom': paddingBottom - 10 + height});
            }
        });

        return customTag;
    }

    /**
     * [render dom 渲染]
     *
     * @param  {DOM}   element   mip-custom 节点
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
            renderStyleOrScript(str, regexs.style, 'style', 'mip-custom-css', document.head);

            // html 处理
            var customTag = renderHtml(element, str, len, result, container);

            // script 处理
            renderStyleOrScript(str, regexs.script, 'script', customTag, document.body);

        }
    }

    /**
     * [proxyLink a 标签事件代理]
     *
     * @param  {DOM} element mip-custom，只监听当前组件下的 a 标签
     */
    function proxyLink(element) {
        util.event.delegate(element, 'a', 'click', function (event) {
            if (this.hasAttribute('mip-link') || /clk_info/.test(this.href)) {
                return;
            }

            event && event.preventDefault();

            var xpath = '';
            var path = log.getXPath(this, element);
            path && path.forEach(function (val) {
                xpath += xpath ? '_' + val : val;
            });

            this.href += ((this.href[this.href.length - 1] === '&') ? '' : '&')
                      + 'clk_info=' + JSON.stringify({xpath: xpath});
            this.click();
        });
    }

    return {
        render: render,
        proxyLink: proxyLink
    };

});
