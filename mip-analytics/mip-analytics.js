/**
 * @file mip-analytics 组件
 * @author 306880673@qq.com
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // 获取config
        try {
            var script = this.element.querySelector('script[type="application/json"]');
            var cfg = this.cfg = JSON.parse(script.textContent.toString());
        }
        catch (e) {
            console.warn('json is illegal');
            console.warn(e);
            return;
        }

	if (!cfg.setting || !cfg.hosts) {
	    return;
	}

        // 全局代理事件
        for (var prop in cfg.setting) {
            if (cfg.setting.hasOwnProperty(prop)) {
                // 替换host变量
                var events = cfg.setting[prop];
                events.forEach(function (el, index) {
                    el.host = cfg.hosts[el.host];
                });
                triggers[prop] && triggers[prop].call(this, events);
            }

        }
    };

    var log = {

        isObject: function (obj) {
            return typeof obj === 'object';
        },

        /**
         * 数据序列化处理
         * @param {Object} obj 必须是对象
         * @return {String}
         */
        serialize: function (obj) {
            if (!obj) {
                return '';
            }

            var str = '';
            var item = '';
            if (this.isObject(obj)) {
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        item = obj[k];
                        if (typeof item === 'undefined') {
                            continue;
                        }

                        if (this.isObject(item)) {
                            item = JSON.stringify(item);
                        }

                        str += k + '=' + encodeURIComponent(item) + '&';
                    }

                }
                str = str.substring(0, str.length - 1); // 去掉末尾的&
            }
            else if (this.isString(obj)) {
                str = obj;
            }

            return str;
        },

        /**
         * 使用img的方式发送日志
         *
         * @param {String} url src链接
         * @returns {undefined}
         */
        imgSendLog: function (url) {
            var key = 'IMAGE' + (new Date()).getTime();
            var img = window[key] = new Image();
            img.onload = function () {
                // 防止多次触发onload;
                img.onload = img.onerror = img.onabort = null;
                // 清空引用,避免内存泄漏
                window[key] = null;
                img = null;
            };
            img.src = url;
        },

        /**
         * 替换插值 ${var}
         * @param {Object} cfg
         * @returns {string}
         */
        hostReplace: function (cfg) {
            cfg.vars = cfg.vars || {};
            cfg.host = cfg.host.replace(/(\${.*})/g, function (match, $1) {
                return cfg.vars[$1.substring(2, $1.length - 1).trim()] || $1;
            });

            return cfg.host;
        },

        send: function (cfg) {
            var queryString = this.serialize(cfg.queryString) + '&t=' + new Date().getTime();
            var url = this.hostReplace(cfg) + queryString;
	    console.log(url);
            this.imgSendLog(url);
        }
    };


    // 点击事件handle
    var clickHandle = function (triggers, eventName) {
        triggers.forEach(function (el, index) {
            util.event.delegate(document, el.selector, eventName, function (event) {
                log.send(el);
            }, false);
        });
    };

    // 定时器存储
    var timer = [];

    // event bind
    var triggers = {
        click: function (triggers) {
            clickHandle(triggers, 'click');
        },
        touchend: function (triggers) {
            clickHandle(triggers, 'touchend');
        },
        disp: function (triggers) {},
        scroll: function () {},
        timer: function (triggers) {
            triggers.forEach(function (el, index) {
                timer.push(setInterval(function () {
                    log.send(el);
                }, el.option.interval || 4000));
            });
        }
    };

    // 销毁工作
    customElement.prototype.detachedCallback = function () {
        timer.forEach(function (el, index) {
            clearInterval(el);
        });
    };

    return customElement;
});
