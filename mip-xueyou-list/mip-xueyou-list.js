/**
* 学优网mip改造 javascript功能插件
* @file ajax异步加载更多列表内容
* @author myoa@163.com
* @version 1.0.1
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        $('.openself').attr('target', '_self');
        var searbar = [
            '<section id="sbar" class="searchbar">',
            '<form method="get" action="http://mip.gkstk.com/wenku/">',
            '<input type="text" placeholder="请输入" id="search" name="keyword" value="">',
            '<i class="icon_search">&nbsp;</i><a class="icon_close openself" href="#top">&nbsp;</a>',
            '</form>',
            '</section>'
			].join('');
        $('header').after(searbar);
        var more = $('#more');
        var loading = $('.spinner');
        var listbox = $('#listbox');
        var cid = listbox.data('cid');
        var url = listbox.data('url');
        more.on('click', function () {
            var id = $('#listbox li').last().data('id');
            more.hide();
            loading.show();
            $.get(url, {
                id: id,
                cid: cid
            }, function (mlst) {
                listbox.append(mlst);
                more.show();
                loading.hide();
            });
        });
    };
    return customElem;
});
