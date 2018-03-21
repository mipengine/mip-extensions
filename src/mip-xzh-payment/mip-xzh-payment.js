/**
 * @file mip-xzh-payment 组件
 * @author lillian
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var fetchJsonp = require('fetch-jsonp');
    var customElement = require('customElement').create();

    var CLS = {
        LOADING: 'mip-xzh-pay-loading',
        NORMAL: 'mip-xzh-pay-btn',
        DISABLED: 'mip-xzh-pay-disabled',
        TOAST: 'mip-xzh-pay-toast-wrapper'
    };

    var config;

    function getPayData() {
        // 获取所有有设置和提交支付数据有关的数据
        var els = document.querySelectorAll('*[data-xzh-pay-param]');
        var data = {};

        for (var index = 0; index < els.length; index++) {
            var payData = els[index].getAttribute('data-xzh-pay-param');

            /**
             * 检测statusData是否存在
             */
            if (!payData) {
                continue;
            }

            try {
                payData = JSON.parse(decodeURIComponent(payData));
            }
            catch (e) {
                /* eslint-disable no-console */
                console.warn('支付数据data-xzh-pay-param数据不正确');
                /* eslint-enable no-console */
                continue;
            }
            util.fn.extend(data, payData);
        }

        return data;
    }

    function urlEncode(param, key) {
        if (param === null) {
            return '';
        }
        var paramStr = '';
        var type = typeof param;

        if (type === 'string' || type === 'number' || type === 'boolean') {
            paramStr += '&' +  encodeURIComponent(key) + '=' + encodeURIComponent(param);
        }
        else {
            var hasNoKey = key === undefined;

            for (var i in param) {
                if (param.hasOwnProperty(i)) {
                    var k = hasNoKey ? i : (key + '[' + i + ']');
                    paramStr += '&' + urlEncode(param[i], k);
                }
            }
        }
        return paramStr.substr(1);
    }

    function jumpUrl(url) {

        var navigator = window.navigator.userAgent;
        // 在手百
        if (navigator.indexOf('baiduboxapp') > -1) {
            // 不在轻框架
            if (navigator.indexOf('light') < 0) {
                location.href = 'baiduboxapp://v1/easybrowse/open?url='
                    + encodeURIComponent(url)
                    + '&style=%7b%22showtoolbar%22%3a%221%22%7d&newbrowser=1';
            }
            else {
                location.href = url;
            }
        }
        else {
            location.href = url;
        }
    }

    /**
     * 获取server配置
     *
     * @return {Object} 配置
     */
    customElement.prototype.getConfig = function () {
        var config = {};

        try {
            var script = this.element.querySelector('script[type="application/json"]');
            if (script) {
                var textContent = JSON.parse(script.textContent);
                if (JSON.stringify(textContent) !== '{}') {
                    config.serverUrl = textContent.url;
                    util.fn.del(textContent, 'url');
                    config.conf = textContent;
                }
                return config;
            }
        }
        catch (e) {
            /* eslint-disable no-console */
            console.warn('json is illegal');
            console.warn(e);
            /* eslint-enable no-console */
        }
        return {
            serverUrl: '',
            config: null
        };
    };

    customElement.prototype._toast = function (text) {

        var ele = document.createElement('div');
        ele.className = CLS.TOAST;
        ele.innerHTML = '<div class="mip-xzh-pay-toast-content">' + text + '</div>';
        ele.style.display = 'block';
        ele.style.opacity = 1;
        document.body.appendChild(ele);

        setTimeout(function () {
            ele.style.display = 'none';
            document.body.removeChild(ele);
            ele = null;
        }, 2000);
    };

    customElement.prototype._bindEvents = function (btn) {
        var that = this;

        btn.addEventListener('click', function () {

            // 如果当前处于loading状态 return
            if (!config.serverUrl) {
                /* eslint-disable no-console */
                console.warn('缺少请求地址');
                /* eslint-enable no-console */
                return;
            }
            // 防止二次点击
            if (btn.classList.contains(CLS.DISABLED)) {
                return;
            }
            // 锁住按钮
            btn.classList.add(CLS.DISABLED);
            // 获取和支付有关的数据
            var payData = getPayData();
            var url = that._makeUrl(config.serverUrl, payData);
            // 按钮loading
            btn.classList.add(CLS.LOADING);

            // 发起 server请求
            fetchJsonp(
                url,
                {
                    jsonpCallback: 'callback'
                }
            ).then(function (res) {
                return res.json();
            }).then(function (data) {

                btn.classList.remove(CLS.LOADING);
                btn.classList.remove(CLS.DISABLED);

                // 请求成功
                if (data && data.code === 0) {
                    // 跳转到收银台页面
                    /* eslint-disable fecs-camelcase */
                    jumpUrl(data.data.cashier_url);
                    /* eslint-enable fecs-camelcase */
                }
                else {
                    that._toast(data.msg || '请稍后重试');
                }

            }).catch(function (e) {
                // 请求失败后的容灾
                btn.classList.remove(CLS.LOADING);
                btn.classList.remove(CLS.DISABLED);
                // 出toast提示 稍后重试
                that._toast('请稍后重试');
            });

        }, false);
    };

    // 生成 fetch 的 url
    customElement.prototype._makeUrl = function (server, urlParams) {
        if (!urlParams) {
            return server;
        }
        if (server.indexOf('?') < 0) {
            server += '?';
        }

        server += urlEncode(urlParams);
        return server;
    };


    customElement.prototype.createdCallback = function () {
        config = this.getConfig();
        var element = this.element;
        element.innerHTML = '<div class=' + CLS.NORMAL + '>' + element.getAttribute('btn-text') + '</div>';
    };

    customElement.prototype.detachedCallback = function () {
        config = null;
    };


    customElement.prototype.build = function () {
        var btn = this.element.querySelector('.mip-xzh-pay-btn');

        this._bindEvents(btn);

    };


    return customElement;
});
