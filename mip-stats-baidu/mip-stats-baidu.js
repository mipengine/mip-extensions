/**
 * @file 百度统计插件
 *
 * @author menglingjun
 * From: mip-stats-baidu
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    customElement.prototype.createdCallback = function () {
        var elem = this.element;
        var token = elem.getAttribute('token');
        var setConfig = elem.getAttribute('setconfig');

        /**
         * 检测token是否存在
         */
        if (token) {
            window._hmt = window._hmt || [];
            _hmt.push([
                '_setAccount',
                token
            ]);

            /**
             * 检测setconfig是否存在
             */
            if (setConfig) {
                var setCustom = buildArry(decodeURIComponent(setConfig));
                _hmt.push(setCustom);
            }

            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?' + token;
            $(elem).append(hm);
            hm.onload = function () {
                bindEle();
            };
        }

    };


    // 绑定事件追踪
    function bindEle() {

        // 获取所有需要触发的dom
        var tagBox = document.querySelectorAll('*[data-stats-baidu-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = tagBox[index].getAttribute('data-stats-baidu-obj');

            /**
             * 检测statusData是否存在
             */
            if (!statusData) {
                return;
            }

            statusData = JSON.parse(decodeURIComponent(statusData));

            var eventtype = statusData.type;

            /**
             * 检测传递数据是否存在
             */
            if (!statusData.data) {
                return;
            }

            var data = buildArry(statusData.data);

            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if ($(tagBox[index]).hasClass('mip-stats-eventload')) {
                return;
            }

            $(tagBox[index]).addClass('mip-stats-eventload');

            if (eventtype === 'load') {
                _hmt.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function (event) {
                    var tempData = event.target.getAttribute('data-stats-baidu-obj');
                    if (!tempData) {
                        return;
                    }
                    var statusJson = JSON.parse(decodeURIComponent(tempData));
                    if (!statusJson.data) {
                        return;
                    }
                    var attrData = buildArry(statusJson.data);
                    _hmt.push(attrData);
                }, false);
            }
        }
    }

    // 数据换转
    function buildArry(arrayStr) {
        if (!arrayStr) {
            return;
        }

        var strArr = arrayStr.slice(1, arrayStr.length - 1).split(',');
        var newArray = [];

        for (var index = 0; index < strArr.length; index++) {
            var item = strArr[index].replace(/(^\s*)|(\s*$)/g, '').replace(/\'/g, '');
            if (item === 'false' || item === 'true') {
                item = Boolean(item);
            }

            newArray.push(item);
        }
        return newArray;
    }

    return customElement;
});
