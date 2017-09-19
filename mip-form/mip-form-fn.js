/**
 * @file mip-form-fn.js
 * @description mip-form函数
 * */

define(function () {
    var templates = require('templates');
    var util = require('util');
    var viewer = require('viewer');
    var windowInIframe = viewer.isIframed;

    var REGS = {
        EMAIL: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        PHONE: /^1\d{10}$/,
        IDCAR: /^\d{15}|\d{18}$/
    };

    return {
        /**
         * 处理fetch请求逻辑
         *
         * @param {string} url 请求url
         * @return {undefined} undefined
         * */
        fetchUrl: function (url) {
            var me = this;
            if (!this.ele) {
                throw new Error('mip-form fetch must be init first.');
            }
            util.css([me.successEle, me.errorEle], {display: 'none'});
            fetch(url, {
                method: me.method,
                credentials: 'include'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                // 返回状态为成功2xx的情况
                util.css(me.successEle, {display: 'block'});
                me.renderTpl(me.successEle, data);
                // 经测试非成功（非2xx）的情况会走reject，catch。文档错误？
            }).catch(function (errData) {
                // 处理中的其他错误
                util.css(me.errorEle, {display: 'block'});
                me.renderTpl(me.errorEle, errData);
            });
        },
        /**
         * 处理模板渲染
         *
         * @param {HTMLElement} ele 模板父节点
         * @param {Object} data 模板渲染数据
         * @return {undefined} undefined
         * */
        renderTpl: function (ele, data) {
            var me = this;
            templates.render(ele, data).then(function (html) {
                var tempTarget = me.tempHTML(ele);
                tempTarget.innerHTML = html;
            });
        },
        /**
         * 处理模板渲染
         *
         * @param {HTMLElement} ele 渲染后模板父节点
         * @return {undefined} undefined
         * */
        tempHTML: function (ele) {
            ele = ele || document;
            var target = ele.querySelector('[mip-mustache-rendered]');
            if (!target) {
                target = util.dom.create('<div mip-mustache-rendered></div>');
                ele.appendChild(target);
            }
            return target;
        },

        /**
         * 处理化fetch请求
         *
         * @param {HTMLElement} element 组件节点
         * @return {undefined} undefined
         * */
        fetchInit: function (element) {
            if (!(element instanceof HTMLElement)) {
                throw new TypeError('Element must be a HTMLElement');
            }
            this.ele = element;
            this.successEle = element.querySelector('[submit-success]');
            this.errorEle = element.querySelector('[submit-error]');
            this.method = element.getAttribute('method') || 'get';
        },

        /**
         * createDom
         * @description  创建 form 节点
         */
        createDom: function (element) {
            var me = this;
            var url = element.getAttribute('url');
            var method = element.getAttribute('method');
            var target = element.getAttribute('target');
            var form = document.createElement('form');
            form.action = url;
            form.method = method;
            target = target ? target : '_blank';
            form.target = viewer.isIframed && target !== '_blank' ? '_top' : target;
            element.appendChild(form);
            util.dom.insert(form, element.children);

            // 按钮提交
            var curEles = element.querySelectorAll('form');
            Array.prototype.forEach.call(curEles, function (item) {
                item.addEventListener('submit', function (event) {
                    event.preventDefault();
                    me.onSubmit(element);
                });
            });

            // XXX 部分浏览器回车不触发submit,
            element.addEventListener('keydown', function (event) {
                if (event.keyCode === 13) {
                    // XXX 为了使余下浏览器不多次触发submit, 使用prevent
                    event.preventDefault();
                    me.onSubmit(this);
                }
            }, false);
        },

        /**
         * 事件通信
         *
         * @description 在 input focus 或 blur 时向iframe外层文档发送数据，iframe外层文档返回设置预览头部为 absolute
         * @param  {Object} event 事件对象
         */
        sendFormMessage: function(event) {
            if (windowInIframe) {
                // mip_video_jump 为写在外层的承接方法
                viewer.sendMessage('input-' + event, {});
            }
        },

        /**
         * 事件发送处理
         *
         * @description 给 input 绑定事件，向 SF 发送数据，为了解决 ios 的 UC 浏览器在iframe外层文档悬浮头部 fixed 位置混乱问题
         * @param  {HTMLElement} element [mip 组件标签]
         */
        initMessageEvents: function (element) {
            var me = this;
            var inputAll = element.querySelectorAll('input');
            Array.prototype.forEach.call(inputAll, function (item, index) {
                item.addEventListener('focus', function () {
                    me.sendFormMessage('focus');
                }, false);

                item.addEventListener('blur', function () {
                    me.sendFormMessage('blur');
                }, false);
            });
        },

        /**
         * [preProcess description]
         *
         * @param  {Object} element [mip 组件标签]
         * @return {boolean}
         */
        preProcess: function (element) {
            var flag = element.querySelector('input[type="password"],input[type="file"]');

            if (flag) {
                console.error('禁止使用password与file输入框');
                return false;
            }
            return true;
        },

        /**
         * [verification 文案格式验证]
         *
         * @param  {string} type [验证类型]
         * @param  {string} value [需要验证的文案]
         * @return {boolean}
         */
        verification: function (type, value) {
            return (type === 'must') ? !(value === '') : REGS[type.toUpperCase()].test(value);
        },

        /**
         * [onSubmit 点击提交按钮事件处理函数]
         */
        onSubmit: function (element) {
            var me = this;
            var preventSubmit = false;
            var inputs = element.querySelectorAll('input, textarea, select');
            var method = element.getAttribute('method') || '';
            var isGet = method.toLowerCase() === 'get';
            var url = element.getAttribute('url') || '';
            var getUrl = url.toLowerCase();
            var isHttp = getUrl.match('http://');
            var valueJson = '';
            var hasFetch = element.getAttribute('fetch-url') || '';

            // 校验输入内容是否合法
            Array.prototype.forEach.call(inputs, function (item) {
                var type = item.getAttribute('validatetype');
                var target = item.getAttribute('validatetarget');
                var regval = item.getAttribute('validatereg');
                var value = item.value;
                var reg;

                if (item.type === 'submit') {
                    return;
                }
                else if (item.type === 'checkbox' || item.type === 'radio') {
                    value = item.checked ? item.value : '';
                }

                valueJson += '&' + item.name + '=' + value;
                if (type) {
                    if (regval) {
                        reg = value === '' ? false : (new RegExp(regval)).test(value);
                    }
                    else {
                        reg = me.verification(type, value);
                    }
                    util.css(element.querySelectorAll('div[target="' + target + '"]'), {display: (!reg ? 'block' : 'none')});
                    preventSubmit = !reg ? true : preventSubmit;
                }
            });

            if (preventSubmit) {
                return;
            }

            // 在iframe下使用mibm-jumplink，跳转显示手百框。 http-GET请求交给外层跳转
            if (window.parent !== window && isHttp && isGet) {
                var messageUrl = '';
                if (getUrl.match('\\?')) {
                    // eg. getUrl == 'http://www.mipengine.org?we=123'
                    messageUrl = getUrl + valueJson;
                }
                else {
                    // eg. getUrl == 'http://www.mipengine.org'
                    valueJson = valueJson.substring(1);
                    messageUrl = getUrl + '?' + valueJson;
                }
                var message = {
                    event: 'mibm-jumplink',
                    data: {
                        url: messageUrl
                    }
                };
                window.parent.postMessage(message, '*');
            }
            else if (hasFetch.trim()) {
                me.fetchUrl(hasFetch);
            }
            else {
                // https请求 或 post请求 或 非iframe下不做处理
                element.getElementsByTagName('form')[0].submit();
            }
        }
    };
});