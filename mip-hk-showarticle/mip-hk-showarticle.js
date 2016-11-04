/**
 * 百度好看显示文章详情
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    function build() {
        var element = this.element;

        var page = $(element).attr('page');

        $(element).find('#J_show_art').click(function () {
            $(this).parent().parent().find('.hide').show();
            $(this).remove();
            $('#J_tag').show();

            new Image().src = '/tj.gif?page=' + page + '&pos=open&t=' + new Date().getTime();
        });
    };

    customElem.prototype.build = build;

    return customElem;
});
