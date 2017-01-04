/**
 * @file mip-analytics 组件
 * @author lijialong01@baidu.com
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

        // 全局代理事件
        for (var prop in cfg.setting) {
	    if (cfg.setting.hasOwnProperty(prop)) {
		// 替换host变量
		var events = cfg.setting[prop];
		events.forEach(function (el, index) {
		    el.host = cfg.hosts[el.host];
		});
		triggers[prop].call(this, events);
	    }
        }
    };

    var log = {

        isObject: function (obj) {
            return typeof obj === 'object';
        },

        /**
         * 数据序列化处理
         * @param {object} obj
         * @returns {string}
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
         * @param url src链接
         * @returns {undefined}
         */
        imgSendLog: function (url) {
            var key = 'BD_MIP' + (new Date()).getTime();
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

        send: function (cfg) {
            var queryString = this.serialize(cfg.data) + '&t=' + new Date().getTime();
            var url = cfg.host + queryString;
            this.imgSendLog(url);
        }
    };


    // 点击事件handle
    var clickHandle = function (triggers, eventName) {
        document.body.addEventListener(eventName, function (event) {
            triggers.forEach(function (el, index) {
                if (util.dom.matches(event.target, el.selector)) {
                    log.send(el);
                }

            });
        }, false);
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
