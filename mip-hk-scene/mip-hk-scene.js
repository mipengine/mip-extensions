/**
 * 百度好看详情页下载app安装打开对应详情页接口
 */
define('mip-hk-keep', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var element = this.element;

        var type = $(element).attr('type');
        var urlKey = encodeURIComponent($(element).attr('urlKey'));

        $.ajax({
            url: '//haokan.baidu.com/h5/scene/keep/',
            data: {
                action: encodeURIComponent('baiduhaokan://' + type +'?url=' + urlKey)
            },
            dataType: 'json',
            type: 'GET',
            success: function () {},
            error: function () {}
        });
    };

    return customElem;
});
require(['mip-hk-keep'], function (plugindemo) {
    MIP.registerMipElement('mip-hk-keep', plugindemo);
});
