/**
 * @file mip-analytics 组件
 * @author 306880673@qq.com
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var performance = require('performance');
    var mipSpeedInfo = {};

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
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
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
         *
         * @param {Object} obj 必须是对象
         * @param {string} vars 配置变量,用于替换1级参数的插值
         * @return {string}
         */
        serialize: function (obj, vars) {
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

                        str += k + '=' + encodeURIComponent(this.valReplace(item, vars)) + '&';
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
         * @param {string} url src链接
         * @return {undefined}
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
         *
         * @param {string}  str 被替换的字符串
         * @param {string}  vars 替换变量
         * @return {string}
         */
        valReplace: function (str, vars) {
            vars = vars || {};
            util.fn.extend(vars, mipSpeedInfo);

            return str.replace(/(\${.*})/g, function (match, $1) {
                var key = $1.substring(2, $1.length - 1).trim();
                if (typeof vars[key] === 'object') {
                    return '';
                }

                return vars[key] || $1;
            });

        },

        send: function (cfg, params) {
            if (params) {
                cfg.queryString.ext = params;
            }
            else {
                try {
                    delete cfg.queryString.ext;
                }
                catch (e) {
                    cfg.queryString.ext = undefined;
                }
                
            }
            var queryString = this.serialize(cfg.queryString, cfg.vars) + '&t=' + new Date().getTime();
            var url = this.valReplace(cfg.host, cfg.vars) + queryString;
            this.imgSendLog(url);
        }
    };


    // 点击事件handle
    var clickHandle = function (triggers, eventName) {
        triggers.forEach(function (el, index) {
            var ancestors = el.tag ? document.querySelectorAll(el.selector) : [document];
            var eventTag = el.tag || el.selector;

            ancestors.forEach(function (dom) {
                util.event.delegate(dom, eventTag, eventName, function (event) {
                    var params = this.getAttribute('data-click') || '';
                    var paramsObj = (new Function('return ' + params))();

                    log.send(el, paramsObj);
                }, false);
            });
        });
    };

    // 定时器存储
    var timer = [];

    // 关键事件点
    var eventPoint = [
        'MIPStart',
        'MIPPageShow',
        'MIPDomContentLoaded',
        'MIPFirstScreen'
    ];
    var defaultDispKey = 'domready';
    var isSendDisp = {};
    isSendDisp[defaultDispKey] = 0;

    // 关键信息都有时，判定为domready
    var isDomReady = function (data) {
        return data ? eventPoint.every(function (el, index) {
            return data[el];
        }) : false;
    };

    // event bind
    var triggers = {

        click: function (triggers) {
            clickHandle(triggers, 'click');
        },

        touchend: function (triggers) {
            clickHandle(triggers, 'touchend');
        },

        disp: function (triggers) {
            performance.on('update', function (data) {
                if (!isSendDisp[defaultDispKey] && isDomReady(data)) {
                    mipSpeedInfo = data;
                    isSendDisp[defaultDispKey] === 1;
                    triggers.forEach(function (el, index) {
                        log.send(el);
                    });
                }

            });
        },

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
