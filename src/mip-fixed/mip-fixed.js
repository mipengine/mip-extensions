/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewportScroll = require('./viewport-scroll');
    
    /**
     * build
     *
     */
    function build() {

        var _this = this;

        _this.addEventAction('close', function(event) {
            event.preventDefault();
            util.css(_this.element, 'display', 'none');
        });

        // 如果有需要悬浮过渡动画
        var position = _this.element.getAttribute('type');
        if (_this.element.hasAttribute('data-slide') && (position === 'top' || position === 'bottom')) {
            viewportScroll.init({
                element: _this.element,
                position: position,
                slide: _this.element.getAttribute('data-slide')
            });
        }
    }

    customElement.prototype.build = build;
   
    return customElement;
});

