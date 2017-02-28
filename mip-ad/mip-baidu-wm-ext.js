/**
 * 广告扩展组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {

    /**
     * [isAncestors 针对判断是否是祖先节点]
     * @param  {[type]}  childNode [description]
     * @param  {[type]}  Ancestors [description]
     * @return {Boolean}           [description]
     */
    function isAncestors (childNode, Ancestors) {
        while(true) {
            if (childNode.parentNode === Ancestors) {
                console.log('true');
                return true;
            }
            childNode = childNode.parentNode;
            console.log(childNode.classList);
            if (childNode.tagName.toUpperCase() === 'BODY' && childNode.classList.toString().indexOf('mip-fixedlayer') <= -1) {
                console.log('fasle');
                return false;
            }
        }
    }
    
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
                if(layer && isAncestors(child, layer)){
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
