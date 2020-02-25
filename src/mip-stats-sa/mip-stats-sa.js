/**
 * @file 神策统计插件
 * @author shengyonggen
 * @email 522370351@qq.com
 * 参考了mip-stats-baidu的实现方式
 */

define(function (require) {
    var util = require('util');
    var Gesture = util.Gesture;
    var fn = require('util').fn;

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {


        var elem = this.element;
        var config = this.getConfig();
        if (config) {
            var para = config;
            var n = para.name;
            var x = null;
// 使用window说明： 为了使用第三方统计神策数据JSSDK(www.sensorsdata.cn)里暴露的全局变量
            window['sensorsDataAnalytic201505'] = n;
            if (!window[n]) {
                window[n] = function (a) {
                    return function () {
                        window[n]._q = window[n]._q || [];
                        window[n]._q.push([a, arguments]);
                    };
                };
            }
            var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'registerSession',
             'registerSessionOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile',
             'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'clearAllRegister'];
            for (var i = 0; i < ifs.length; i++) {
                window[n][ifs[i]] = window[n].call(null, ifs[i]);
            }
            if (!window[n]._t) {
                x = document.createElement('script');
                x.async = 1;
                x.src = para.sdk_url;
                elem.appendChild(x);
                window[n].para = para;
            }
            this.bindEle();
        } else {
            console.warn('sensorsdata config is wrong');
        }

    };

    customElement.prototype.getConfig = function () {
        var config = {};
        var setconfig = this.element.getAttribute('setconfig');
        try {
            config = decodeURIComponent(setconfig);
            config = JSON.parse(config);
        } catch (e) {
            config = null;
        }
        this.saConfig = config;
        return config;
    };

    customElement.prototype.objToArray = function (configObj) {
        var outConfigArray = [];
        if (!configObj) {
            return;
        }
        for (var key in configObj) {
            if (configObj.hasOwnProperty(key) && Array.isArray(configObj[key])) {
                configObj[key].unshift(key);
                outConfigArray.push(configObj[key]);
            }
        }
        return outConfigArray;
    };

    customElement.prototype.saSend = function (data) {
        var slice = Object.prototype.toString;
        if (slice.call(data) !== '[object Array]') {
            return false;
        }
        var type = data[0];
        var arg = data.slice(1);
        var name = this.saConfig.name;
        var sa = window[name];
        sa[type].apply(sa, arg);
    };

    // 绑定事件追踪
    customElement.prototype.bindEle = function () {
        var me = this;
        // 事件触发
        function eventHandler(event) {
            var tempData = this.getAttribute('data-stats-sa-obj');
            if (!tempData) {
                return;
            }
            var statusJson;
            try {
                statusJson = JSON.parse(decodeURIComponent(tempData));
            } catch (e) {
                console.warn('事件追踪data-stats-sa-obj数据不正确');
                return;
            }
            if (!statusJson.data) {
                return;
            }

            var attrData = statusJson.data;
            me.saSend(attrData);
        }

        // 获取所有需要触发的dom
        var tagBox = document.querySelectorAll('*[data-stats-sa-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = tagBox[index].getAttribute('data-stats-sa-obj');

            /**
             * 检测statusData是否存在
             */
            if (!statusData) {
                continue;
            }

            try {
                statusData = JSON.parse(decodeURIComponent(statusData));
            } catch (e) {
                console.warn('事件追踪data-stats-sa-obj数据不正确');
                continue;
            }

            var eventType = statusData.type;

            /**
             * 检测传递数据是否存在
             */
            if (!statusData.data) {
                continue;
            }

            // 格式化数据
            var data = statusData.data;

            if (eventType !== 'click' && eventType !== 'mouseup' && eventType !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                continue;
            }

            if (tagBox[index].classList.contains('mip-stats-eventload')) {
                continue;
            }

            tagBox[index].classList.add('mip-stats-eventload');

            if (eventType === 'load') {
                this.saSend(data);
            }
            // 解决on=tap: 和click冲突短线方案
            // TODO 这个为短线方案
            else if (eventType === 'click'
                && tagBox[index].hasAttribute('on')
                && tagBox[index].getAttribute('on').match('tap:')
                && fn.hasTouch()) {
                var gesture = new Gesture(tagBox[index]);
                gesture.on('tap', eventHandler);
            } else {
                tagBox[index].addEventListener(eventType, eventHandler, false);
            }
        }
    };

    return customElement;
});