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
        var setCustom = buildArry(decodeURIComponent(element.getAttribute('setconfig')));

        if (token) {
            window._czc = window._czc || [];
            _czc.push([
                '_setAccount',
                token
            ]);
            if (setCustom) {
                _czc.push(setCustom);
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
        var tagBox = document.querySelectorAll('*[data-stats-cnzz-obj]');

        for (var index = 0; index < tagBox.length; index++) {
            var statusData = JSON.parse(decodeURIComponent(tagBox[index].getAttribute('data-stats-cnzz-obj')));
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
