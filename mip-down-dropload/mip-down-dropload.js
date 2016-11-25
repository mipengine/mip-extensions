/**
 * @file 下拉加载
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var currentPage = 1;
    var allPage = 0;

    function dropload(element, options) {
        ++currentPage;
        $.ajax({
            type: 'GET',
            url: options.url + '&page=' + currentPage,
            dataType: 'json',
            success: function (data) {
                var html = '';
                allPage = data.totalPage;
                if (currentPage >= data.totalPage) {
                    $(element).find('.button-footer').remove();
                }
                for (var i in data.list) {
                    html += '<li><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="img" target="_blank"><mip-img src="' + (data.list)[i].thumb + '" width="60" height="60"></mip-img></a><p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" target="_blank">' + (data.list)[i].ResName + '</a><em class="lstar' + (data.list)[i].ResRank + '"></em><span>' + (data.list)[i].CatalogName + '<u>' + (data.list)[i].ResSize + '</u>' + (data.list)[i].ResVer + '</span></p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="btn" target="_blank"><em class="bg"></em>\u4e0b\u8f7d</a></li>';
                }
                $(element).find('ul').append(html);
            }
        });
    }
    customElem.prototype.build = function () {
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-dropload-params').replace(/'/g, '"'));
        $(element).find('.getMore').on('click', function () {
            dropload(element, params);
        });
        if (params.isclick) {
            $(window).scroll(function (e) {
                if ($(this).scrollTop() + $(this).height() >= $(document).height()) {
                    if (parseInt(currentPage, 10) === parseInt(allPage, 10)) {
                        return;
                    }
                    else {
                        dropload(element, params);
                    }
                }
            });
        }
    };
    return customElem;
});
