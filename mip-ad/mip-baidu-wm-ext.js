/**
 * 广告扩展组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    
    var render = function(_this, me) {

        var self = _this;
        var domain = self.getAttribute('domain');
        var token = self.getAttribute('token');

        if(domain && token) {

            var script = document.createElement('script');
            script.src = document.location.protocol + '//' + domain + '/' + token + '.js';
            document.body.appendChild(script);

            var fixedElement = require('fixed-element');
            var layer = fixedElement._fixedLayer;
            var child = document.getElementById(token);
            
            child.addEventListener("DOMSubtreeModified", function(e) {
                var elem = window.getComputedStyle(child, null);
                var pos = elem && elem.getPropertyValue('position') ? 
                          elem.getPropertyValue('position') : '';
                if(layer && layer.querySelector('#'+token)){
                  return;
                }
                if(pos == 'fixed' && layer) {
                    var idx = document.querySelectorAll('mip-fixed').length;
                    var data = {
                        element: child.parentElement,
                        id: 'Fixed'+ idx
                    };
                    fixedElement.moveToFixedLayer(data, parseInt(idx));
                }
            },false);

        } else {
            console.error('请输入正确的 domain 或者 token');
        }
    };

    return {
        render: render
    }
});
