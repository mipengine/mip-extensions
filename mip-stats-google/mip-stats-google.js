/**
 * @file 谷歌统计插件
 *
 * @author houjinlong
 * From: mip-stats-google
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var elem = this.element;
        var token = elem.getAttribute('token');
        var setConfig = elem.getAttribute('setconfig');
        if (token) {
            window._gaq = window._gaq || [];
            window._gaq.push(['_setAccount', token]);
            if (setConfig) {
                var setCustom = buildArry(decodeURIComponent(setConfig));
                setCustom.forEach(function  (val) {
                    window._gaq.push(val);
                });
            }
            window._gaq.push(['_trackPageview']);
            var ga = document.createElement('script');
            ga.type = 'text/javascript';
            ga.async = true;
            ga.src = 'https://ssl.google-analytics.com/ga.js';
            $(elem).append(ga);
            ga.onload = function () {
                bindEle();
            };
        }
    };
    function bindEle() {
        var tagBox = document.querySelectorAll('*[data-stats-google-obj]');
        for (var index = 0; index < tagBox.length; index++) {
            var statusData = tagBox[index].getAttribute('data-stats-google-obj');

            /**
             * 检测statusData是否存在
             */
            if (!statusData) {
                return;
            }

            try {
                statusData = JSON.parse(decodeURIComponent(statusData));
            }
            catch (e) {
//          	'事件追踪data-stats-google-obj数据不正确';
                return;
            }

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
                window._gaq.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function (event) {
                    var tempData = this.getAttribute('data-stats-google-obj');
                    if (!tempData) {
                        return;
                    }
                    var statusJson;
                    try {
                        statusJson = JSON.parse(decodeURIComponent(tempData));
                    }
                    catch (e) {
//                      '事件追踪data-stats-google-obj数据不正确';
                        return;
                    }
                    if (!statusJson.data) {
                        return;
                    }
                    var attrData = buildArry(statusJson.data);
                    attrData.forEach(function  (val) {
                        window._gaq.push(val);
                    });
                }, false);
            }
        }
    }

    // 数据换转
    function buildArry(arrayStr) {
        if (!arrayStr) {
            return;
        }
        var strArr = arrayStr.slice(1, arrayStr.length - 1).replace(/\s/g, '').split('],[');
        var newArr = [];
        strArr.forEach(function  (val, index) {
            var arr = val.split(',');
            newArr.push(arr);
        });
        return newArr;
    }
    return customElement;
});
