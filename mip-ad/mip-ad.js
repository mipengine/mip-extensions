// 此处以最终打包逻辑为准 
require.config({
    paths: {
        "extensions/ads/1.2/mip-ad-comm": "https://mipcache.bdstatic.com/static/v1.2/ads/mip-ad-comm",
        "extensions/ads/1.2/mip-ad-baidu": "https://mipcache.bdstatic.com/static/v1.2/ads/mip-ad-baidu",
        "extensions/ads/1.2/mip-ad-qwang": "https://mipcache.bdstatic.com/static/v1.2/ads/mip-ad-qwang"
    }
    
});

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
        var adFile = 'extensions/ads/1.2/mip-' + type;

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
