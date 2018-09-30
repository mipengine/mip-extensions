/**
 * @file mip-code-button.js
 * @description mip-form函数
 * @author chen
 */

define(function (require) {
    var templates = require('templates');
    var util = require('util');
    var viewer = require('viewer');
    var evt;
    return {

        /**
         * 处理fetch请求逻辑
         *
         * @param {string} url 请求url
         */
        fetchUrl: function (url) {
            var me = this;
            var data = new FormData();

            for (var index in me.fetchData) {
                if (me.fetchData.hasOwnProperty(index)) {
                    data.append(index, me.fetchData[index]);
                }
            }
            // 获取CSRF-TOKEN
            var tokenDom = document.querySelector('meta[name="csrf-token"]');
            if (tokenDom) {
                var token = tokenDom.getAttribute('content');
            }

            var options = {
                method: 'POST',
                credentials: 'include',
                body: data,
                // 使用Accept，用来判断异步
                headers: new Headers({
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': token ? token : ''
                })
            };
            // 判断域名，是否跨域.测试使用
            var localhost = location.host;
            if (url.indexOf(localhost) === -1) {
                options.mode = 'cors';
                options.credentials = 'omit';
            }

            // 数据请求处理
            fetch(url, options).then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            }).then(function (response) {
                var status = parseInt(response.status, 10);
                if (status === 1) {

                    me.successHandle();
                } else {
                    // 处理错误提示
                    me.showFailInfo(response.info);
                    me.failHandle();
                }

            }).catch(function (err) {

                me.errorHandle();
                // me.fetchReject(err);
            });
        },
        hideFailInfo: function () {
            if (this.failInfoId) {
                var failInfoEl = document.getElementById(this.failInfoId);
                if (failInfoEl) {
                    util.css(failInfoEl, {display: 'none'});
                }
            }
        },
        showFailInfo: function (info) {
            if (this.failInfoId) {
                var failInfoEl = document.getElementById(this.failInfoId);
                if (failInfoEl) {
                    failInfoEl.innerHTML = info;
                    util.css(failInfoEl, {display: 'block'});
                }
            }
        },
        setFetchData: function (key, val) {
            if (!this.fetchData) {
                this.fetchData = {};
            }
            this.fetchData[key] = val;
        },

        /**
         * fetch出错逻辑处理
         *
         * @param {Object} err 错误对象
         */
        fetchReject: function (err) {
            var me = this;
            util.css(me.errorEle, {display: 'block'});
            me.renderTpl(me.errorEle, err);
        },

        /**
         * 处理模板渲染
         *
         * @param {HTMLElement} ele 模板父节点
         * @param {Object} data 模板渲染数据
         */
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
         * @return {HTMLElement} target 新建DOM节点
         */

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
         * createDom 创建 form 节点
         *
         * @param {HTMLElement} element 组件节点
         */
        createDom: function (element) {
            var me = this;
            me.fetchData = {};
            me.url = element.getAttribute('url');

            me.method = (element.getAttribute('method') || 'GET').toUpperCase();

            me.failInfoId = element.getAttribute('fail-info-id');
            me.hideFailInfo();
            var submitBtn = element.querySelector('[fetch-button]');
            // 添加点击事件监听
            submitBtn.addEventListener('click', function (event) {
                evt = event;
                me.onSubmit(element);
            });
        },


        /**
         * 点击提交按钮事件处理函数
         *
         * @param  {HTMLElement} element form节点
         */
        onSubmit: function (element) {
            var me = this;
            me.hideFailInfo();
            // 定时器已存在不允许再次触发点击
            if (me.timer) {
                return;
            }
            var url = element.getAttribute('url') || '';
            if (!url) {
                return;
            }

            var mobile = this.fetchData.mobile;
            var reg = mobile && (/^1[3578]\d{9}$/.test(mobile));
            // 手机验证通过
            if (!reg) {
                me.invalidHandle('mobile');
                return;
            }
            else {
                me.validHandle('mobile');
            }

            // 获取时间限制
            var timeout = element.getAttribute('timeout') || 60;
            // 开始计时
            me.timeEle = element.querySelector('[time-count]');
            me.submitBtn = element.querySelector('[fetch-button]');

            // 设置初始值，然后再show
            me.timeEle.firstElementChild.innerHTML = timeout;
            util.css(me.submitBtn, {display: 'none'});
            util.css(me.timeEle, {display: 'block'});

            me.timer = setInterval(function () {
                me.timeEle.firstElementChild.innerHTML = timeout--;
                if (timeout <= 0) {
                    me.clearTimer();
                }
            }, 1000);

            this.ele = element;

            // 执行数据请求
            this.fetchUrl(url);
        },

        /**
         * 清除定时器
         *
         * @param  {HTMLElement} element form节点
         */
        clearTimer: function () {

            if (this.timer) {
                clearInterval(this.timer);
                util.css(this.submitBtn, {display: 'block'});
                util.css(this.timeEle, {display: 'none'});
                this.timer = null;
            }
        },

        /**
         * 输出表单错误信息
         * @param {HTMLElement} element form节点
         */
        invalidHandle: function () {
            console.log('mobile字段格式不正确');
            viewer.eventAction.execute('invalid', evt.target, evt);
        },

        /**
         * 隐藏表单错误信息
         * @param {HTMLElement} element form节点
         */
        validHandle: function () {
            console.log('mobile字段格式验证通过');
            viewer.eventAction.execute('valid', evt.target, evt);
        },


        /**
         * 提交时的事件
         *
         * @param  {HTMLElement} element form节点
         */
        submitHandle: function () {
            viewer.eventAction.execute('submit', evt.target, evt);
        },

        /**
         * 提交成功调用的在html on里使用的事件
         *
         * @param  {HTMLElement} element form节点
         */
        successHandle: function () {
            if (!evt) {
                return;
            }
            viewer.eventAction.execute('success', evt.target, evt);
        },

        /**
         * 提交成功，但处理结果为失败，调用的在html on里使用的事件
         *
         * @param  {HTMLElement} element form节点
         */
        failHandle: function () {

            if (!evt) {
                return;
            }
            this.clearTimer();
            viewer.eventAction.execute('fail', evt.target, evt);
        },


        /**
         * 提交失败调用的在html on里使用的事件
         *
         * @param  {HTMLElement} element form节点
         */
        errorHandle: function () {
            if (!evt) {
                return;
            }
            viewer.eventAction.execute('error', evt.target, evt);
        }
    };
});
