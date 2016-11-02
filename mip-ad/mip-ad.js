/**
 * 广告组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.1
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var customElement = require('customElement').create();

    // Sync
    require('./mip-ad-comm');
    require('./mip-ad-baidu');
    require('./mip-ad-qwang');
    require('./mip-baidu-wm-ext');
    
    /**
     * render
     *
     */
    function render() {
        var me = this;
        var _element = this.element;

        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        var type = _element.getAttribute('type');
        var mipAd = require('./mip-' + type);
        mipAd.render(_element, me);

    }

    customElement.prototype.build = render;

    return customElement;
});

