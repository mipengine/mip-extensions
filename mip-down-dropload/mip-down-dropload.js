/**
 * @file 下拉加载
 * @author Zhou
*/
define('mip-plugindemo/mip-pc6-dropload', ['require', 'customElement', 'zepto'], function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        $('#moreList #getMore').click(function () {
            dropload(element);
            return false;
        });
    };
    var currentPage = 1;
    var allPage = '';
    function dropload(element) {
        $.ajax({
            type: 'GET',
            url: '/ajax.asp?action=29',
            dataType: 'json',
            data: {
                siteid: 1,
                type: $('#getMore').data('type'),
                page: ++currentPage,
                row: 20,
                id: $('#getMore').data('id'),
                cid: $('#getMore').data('cid')
            },
            success: function (data) {
                var html = '';
                for (i in data.list) {
                    html += '<li><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="img" target="_blank"><mip-img src="' + (data.list)[i].thumb + '" width="60" height="60"></mip-img></a><p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" target="_blank">' + (data.list)[i].ResName + '</a><em class="lstar' + (data.list)[i].ResRank + '"></em><span>' + (data.list)[i].CatalogName + '<u>' + (data.list)[i].ResSize + '</u>' + (data.list)[i].ResVer + '</span></p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="btn" target="_blank"><em class="bg"></em>\u4e0b\u8f7d</a></li>';
                }
                $('#moreList ul').append(html);
                allPage = data.totalPage;
                if (data.page == data.totalPage) {
                    $('#moreList .button-footer').remove();
                }
            }
        });
    }
    $(window).scroll(function (e) {
        if ($(this).scrollTop() + $(this).height() >= $(document).height()) {
            if (currentPage == allPage) {
                return;
            }
            else {
                dropload();
            }
        }
    });
    return customElem;
});
require(['mip-plugindemo/mip-pc6-dropload'], function (plugindemo) {
    MIP.registerMipElement('mip-pc6-dropload', plugindemo);
});