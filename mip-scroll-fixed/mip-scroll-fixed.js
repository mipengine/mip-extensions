/**
 * mip-scroll-fixed
 * 
 * @Author   jiangxu03
 * @DateTime 2017-01-06T20:39:22+0800
 */

define(function(require) {
    var customElem = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;

        // direction 填写除bottom以外的值或不填写认定为默认值top
        var direction = element.getAttribute('direction');
        direction = direction || top;
        direction = direction == "bottom" ? direction : "top";

        // interval 默认值为0，需填写纯数字
        var interval = element.getAttribute('interval');
        interval = interval || 0;
        
        var oldHeight = element.offsetTop;
        if (direction == "bottom") {
            util.css(element, {
                position: 'fixed',
                bottom: interval + 'px'
            });  
            var fixHeight = element.offsetTop;
        }
        
        viewport.on('scroll', function () {
            var scrollTop = viewport.getScrollTop();
            if (direction == 'top') {
                if ((element.offsetTop - interval <= scrollTop) && (scrollTop >= oldHeight - interval)) {
                    util.css(element, {
                        position: 'fixed',
                        top: interval + 'px'
                    });   
                }
                else {
                    util.css(element, {
                        position: 'static',
                        top: ''
                    });
                }
            }
            else {
                if ((fixHeight + scrollTop - interval <= oldHeight)) {
                    util.css(element, {
                        position: 'fixed',
                        bottom: interval + 'px'
                    }); 
                }
                else {
                    util.css(element, {
                        position: 'static',
                        bottom: ''
                    });
                }
            }
        });
    };

    return customElem;
});