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
        var setCustom = elem.getAttribute('setconfig');
        // 是否指定自定义变量
        if (token) {
            window._hmt = window._hmt || [];
            _hmt.push([
                '_setAccount',
                token
            ]);
            if (setCustom) {
                // 如果存在自定义变量
                _hmt.push(changeData(setCustom));
            }

            var hm = document.createElement('script');
            hm.src = '//hm.baidu.com/hm.js?' + token;
            $(elem).append(hm);
            hm.onload = function () {
                bindEvent(elem);
            };
        }

    };

    // 获取数据
    function bindEvent(elem) {
        var tagName = elem.getAttribute('tagname');
        if (!tagName) {
            return;
        }

        var dataJson = changeData(tagName);
        dataJson.map(function (ele, i) {
            bindEle(ele);
        });
    }

    // 绑定事件
    function bindEle(tagName) {
        var tagBox = $('[name=' + tagName + ']');
        tagBox.map(function (i, ele) {
            var statusData = decodeURI(ele.getAttribute('data-stats'));
            if (!statusData) {
                return;
            }

            var dataJson = changeData(statusData);
            var eventtype = dataJson.type;
            var data = dataJson.data;
            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if (eventtype === 'load') {
                _hmt.push(data);
            }
            else {
                ele.addEventListener(eventtype, function () {
                    _hmt.push(data);
                }, false);
            }
        });
    }

    // 数据换转
    function changeData(obj) {
        var dataJson;
        try {
            dataJson = new Function('return ' + obj)();
        }
        catch (e) {
            dataJson = [];
        }
        return dataJson;
    }

    return customElement;
});
