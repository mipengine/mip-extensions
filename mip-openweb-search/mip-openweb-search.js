/**
 * @file mip-openweb-search 组件
 * @author JennyL(jiaojiaomao220@163.com)
 */

define(function (require) {

    var customElement = require('customElement').create();

    var $ = require('./ghostHunter');
    var timeouts = [];

    function isPc() {
        return !navigator.userAgent.match('Mobile');
    }

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var $btn = $(this.element);
        var rssUrl = $btn.attr('rss');
        var $resultsDom = $($btn.attr('resultsDom'));

        if (!rssUrl) {
            console.error('mip-openweb-search初始化失败，rss参数无效');
            return;
        }
        else if (!$resultsDom.length) {
            console.error('mip-openweb-search初始化失败，resultsDom参数无效');
            return;
        }

        // 按钮触发表单提交+搜索事件
        if (isPc()) {
            $btn.on('click', formSubmit);
        }
        else {
            $btn.on('touchend', function(e) {
                $('.nav-lists-h5').append('touchend-');
                formSubmit(e);
            });
        }

        $btn.closest('form').on('keydown', function (e) {
            if (e.keyCode === 13) {
                // 回车执行查询
                e.preventDefault();
                e.stopPropagation();
                // XXX: 由于不能直接触发弹层open，只能触发绑定on='tap:lightbox.open'的按钮
                $btn.trigger('click');
            }
        });

        function formSubmit(e) {
            $('.nav-lists-h5').append('formSubmit - ');
            $('.form-input').blur();
            $(e.target).closest('form').trigger('submit');

            // 修改overflow为了触发重绘，解决在ios safari浏览器中
            // 键盘弹出状态下展示lightbox,lightbox不能滚动问题。
            $('#search-lightbox').css('overflow', 'hidden');
            var timeout = window.setTimeout(function () {
                $('#search-lightbox').css('overflow', 'auto');
            }, 200);
            timeouts.push(timeout);
        }

        // 配置搜索
        var resultTpl = '<a href=\'<%link%>\'>'
            + '<h2><%title%></h2><span><%pubDate%></span>'
            + '<span><%category%></span></span>'
            + '<p><%description%></p></a>';

        var ghostOpt = {
            results: $resultsDom,
            rss: rssUrl,
            infoTpl: '<p>搜索到<%amount%>篇相关文章</p>',
            resultTpl: resultTpl
        };

        // 两个search-field对应pc导航和H5侧边栏导航输入框
        $('#search-field').ghostHunter(ghostOpt);
        $('#search-field2').ghostHunter(ghostOpt);
    };

    customElement.prototype.detachedCallback = function () {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
    };

    return customElement;
});
