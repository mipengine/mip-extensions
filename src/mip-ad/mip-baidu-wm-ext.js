/**
 * @file 广告扩展组件
 * @author lilangbo@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var render = function (that, me) {

        var self = that;
        var domain = self.getAttribute('domain');
        var token = self.getAttribute('token');
        var MIP = window.MIP || {};

        if (domain && token) {
            // 判断 preload 逻辑
            var scripts = document.querySelector('script[mip-preload="mip-script-wm"]');
            if (scripts) {
                var apiStr = '__container_api_';
                (window[apiStr] = window[apiStr] || []).push({
                    containerId: token,
                    token: token
                });
            }
            else {
                var script = document.createElement('script');
                script.src = document.location.protocol + '//' + domain + '/' + token + '.js';
                document.body.appendChild(script);

                var fixedElement = require('fixed-element');
                var layer = fixedElement._fixedLayer;
                var child = document.getElementById(token);
                child.addEventListener('DOMSubtreeModified', function (e) {
                    var elem = window.getComputedStyle(child, null);
                    var pos = elem && elem.getPropertyValue('position')
                        ? elem.getPropertyValue('position') : '';
                    if (layer && layer.querySelector('#' + token)) {
                        return;
                    }
                    if (pos === 'fixed' && layer) {
                        var idx = document.querySelectorAll('mip-fixed').length;
                        var data = {
                            element: child.parentElement,
                            id: 'Fixed' + idx
                        };
                        fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
                    }
                }, false);
            }

        } else {
            console.error('请输入正确的 domain 或者 token');
        }
    };

    return {
        render: render
    };
});
