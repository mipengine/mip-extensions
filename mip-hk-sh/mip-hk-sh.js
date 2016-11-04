/**
 * 百度好看显示文章详情
 */
define('mip-hk-showarticle', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    customElem.prototype.build = function () {
        var element = this.element;

        var page = $(element).attr('page');

        $(element).find('#J_show_art').click(function () {
            $(this).parent().parent().find('.hide').show();
            $(this).remove();
            $('#J_tag').show();

            new Image().src = '/tj.gif?page=' + page + '&pos=open&t=' + new Date().getTime();
        });
    };

    return customElem;
});
require(['mip-hk-showarticle'], function (plugindemo) {
    MIP.registerMipElement('mip-hk-showarticle', plugindemo);
});
