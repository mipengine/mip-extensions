/**
 * @file mip-close-dom 组件
 * @author
 */

define(function (require) {
    
        var customElement = require('customElement').create();
    
        /**
         * 构造元素，只会运行一次
         */
        customElement.prototype.firstInviewCallback = function () {
            
            var ele = this.element;
            
            ele.addEventListener('click', function(){
                var target = ele.parentElement;
                target.parentElement.removeChild(target);   
            }, false);
    
            ele.addEventListener('mousedown', function(){
                ele.className += ' touchdown';
            })
    
            ele.addEventListener('mouseup', function(){
                ele.className = ele.className.replace(' touchdown', '');
            })
            
            // TODO
        };
    
        return customElement;
    });
    