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
        var setCustom = buildArry(decodeURIComponent(elem.getAttribute('setconfig')));

        // 是否指定自定义变量
        if (token) {
            window._hmt = window._hmt || [];
            _hmt.push([
                '_setAccount',
                token
            ]);
            if (setCustom) {
                // 如果存在自定义变量
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


    // 绑定事件
    function bindEle() {
        // 获取所有需要触发的dom
        var tagBox = document.querySelectorAll('*[data-stats-baidu-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = JSON.parse(decodeURIComponent(tagBox[index].getAttribute('data-stats-baidu-obj')));

            if (!statusData) {
                return;
            }

            var eventtype = statusData.type;
            var data = buildArry(statusData.data);

            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if (eventtype === 'load') {
                _hmt.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function () {
                    _hmt.push(data);
                }, false);
            }
        }
    }

    // 数据换转
    function buildArry(arrayStr) {
        var strArr = arrayStr.slice(1, arrayStr.length - 1).split(',');
        var newArray = [];

        for (var index = 0; index < strArr.length; index++) {
            var item = strArr[index].replace(/(^\s*)|(\s*$)/g, '');
            if (item === 'false' || item === 'true') {
                item = Boolean(item);
            }

            newArray.push(item);
        }
        return newArray;
    }

    return customElement;
});
