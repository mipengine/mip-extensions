/**
 * 广告组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.1
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

__inline('mip-ad-comm')
__inline('mip-ad-baidu')
__inline('mip-ad-qwang')

define(function (){
    var customElement = require('customElement').create();
    
    /**
     * render
     *
     */
    function render () {
        var me = this;
        var _element = this.element;
        var _this = _element;

        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        var type = _element.getAttribute('type');
        var adFile = 'extensions/ads/1.3/mip-' + type;

        require([adFile], function(mipAd) {
            mipAd.render(_this, me);
        });

    }


    /**
     * 初始化
     *
     */
    customElement.prototype.init = function() {
        this.build = render;
    };
    return customElement;
});

