/**
 * @file 百度好看显示文章详情
 * @author  liujunqiu
 * @time 2016.12.15
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

        // 凤巢文章显示支持
        var type = $(element).attr('type');
        if (type === 'fengchao') {
            var winHeight = $(window).height();
            $('.J_article_wrap').css({
                height: (winHeight - $('.J_detail_title').height() - 88 + 100) * 0.62
            });
        }
    }

    customElem.prototype.build = build;

    return customElem;
});
