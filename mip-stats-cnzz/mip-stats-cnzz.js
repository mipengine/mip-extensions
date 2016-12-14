/**
* @file CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var $element = $(element);
        var token = element.getAttribute('token');
        var setCustom = element.getAttribute('setconfig');
        if (token) {
            window._czc = window._czc || [];
            _czc.push([
                '_setAccount',
                token
            ]);
            if (setCustom) {
                _czc.push(changeData(setCustom));
            }

            var html = [
                '<script type="text/javascript">',
                'var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id=\'cnzz_stat_icon_' + token + '\'%3E%3C/span%3E%3Cscript src=\'" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D' + token + '\' type=\'text/javascript\'%3E%3C/script%3E"));',
                '</script>'
            ];
            $element.append(html.join(''));
            bindEle();
        }

    };


    // 绑定事件
    function bindEle() {
        var tagBox = document.querySelectorAll('*[data-stats-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = decodeURI(tagBox[index].getAttribute('data-stats-obj'));
            if (!statusData) {
                return;
            }

            var dataJson = changeData(statusData);
            var eventtype = dataJson.type;
            var data = dataJson.data;
            var pattern = dataJson.pattern;

            // 如果不是cnzz
            if (pattern.indexOf('cnzz') < 0) {
                return;
            }

            if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
                // 事件限制到click,mouseup,load(直接触发)
                return;
            }

            if (eventtype === 'load') {
                _czc.push(data);
            }
            else {
                tagBox[index].addEventListener(eventtype, function () {
                    _czc.push(data);
                }, false);
            }
        }
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
