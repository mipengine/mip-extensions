/**
 * @file 下拉加载
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var viewport = require('viewport');
    var util = require('util');
    var platform = util.platform;
    var customElem = require('customElement').create();
    var ajaxs = {
        Page1: 1,
        Page2: 1,
        allPage1: 0,
        allPage2: 0,
        nowPage: 1,
        totalPage: 0,
        isPlat: '',
        ajaxUrl: '',
        nowEq: 0
    };
    function dropload(element, options) {
        ++ajaxs.nowPage;
        if (options.isPlat) {
            ajaxs.ajaxUrl = options.url + '&page=' + ajaxs.nowPage + '&platform=' + ajaxs.isPlat;
        }
        else {
            ajaxs.ajaxUrl = options.url + '&page=' + ajaxs.nowPage;
        }
        $.ajax({
            type: 'GET',
            url: ajaxs.ajaxUrl,
            dataType: 'json',
            success: function (data) {
                var html = '';
                ajaxs.totalPage = data.totalPage; // 总记页数
                ajaxs.nowPage = data.page;
                if (ajaxs.isPlat === 'android') {
                    ajaxs.Page1 = ajaxs.nowPage;
                    ajaxs.allPage1 = ajaxs.totalPage;
                }

                if (ajaxs.isPlat === 'iphone') {
                    ajaxs.Page2 = ajaxs.nowPage;
                    ajaxs.allPage2 = ajaxs.totalPage;
                }

                if (ajaxs.nowPage >= data.totalPage) {
                    $(element).find('.button-footer').remove();
                }

                if (parseInt(ajaxs.totalPage, 10) === 0) {
                    return;
                }

                for (var i in data.list) {
                    html += '<li><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="img" target="_blank"><mip-img src="' + (data.list)[i].thumb + '" width="60" height="60"></mip-img></a><p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" target="_blank">' + (data.list)[i].ResName + '</a><em class="lstar' + (data.list)[i].ResRank + '"></em><span>' + (data.list)[i].CatalogName + '<u>' + (data.list)[i].ResSize + '</u>' + (data.list)[i].ResVer + '</span></p><a href="http://m.pc6.com/s/' + (data.list)[i].ID + '" class="btn" target="_blank"><em class="bg"></em>\u4e0b\u8f7d</a></li>';
                }

                $(element).find('ul').eq(ajaxs.nowEq).append(html);
            }
        });
    }
    customElem.prototype.build = function () {
        var element = this.element;
        var params = JSON.parse($(element).attr('mip-dropload-params').replace(/'/g, '"'));
        if (platform.isIos() && params.isPlat) {
            ajaxs.isPlat = 'iphone';
            ajaxs.nowEq = 1;
        }

        if (platform.isAndroid() && params.isPlat) {
            ajaxs.isPlat = 'android';
            ajaxs.nowEq = 0;
        }

        // 切换请求
        function addToggle() {
            $(element).find('.vd-tabs-hd').eq(ajaxs.nowEq).addClass('mip-vd-tabs-nav-selected')
                .siblings().removeClass('mip-vd-tabs-nav-selected');
            $(element).find('.vd-tabs-bd').eq(ajaxs.nowEq).show().siblings('.vd-tabs-bd').hide();
        }
        addToggle();
        $(element).find('.vd-tabs-hd').click(function () {
            ajaxs.nowEq = $(this).index();
            ajaxs.isPlat = $(this).attr('data-sysName');
            if (ajaxs.nowEq === 0) {
                ajaxs.nowPage = ajaxs.Page1;
                ajaxs.totalPage = ajaxs.allPage1;
            }
            else {
                ajaxs.nowPage = ajaxs.Page2;
                ajaxs.totalPage = ajaxs.allPage2;
            }
            addToggle();
        });

        $(element).find('.getMore').on('click', function () {
            dropload(element, params);
        });
        if (params.isclick) {
            viewport.on('scroll', function (e) {
                if (viewport.getScrollTop() + viewport.getHeight() >= viewport.getScrollHeight()) {
                    if (ajaxs.nowPage === ajaxs.totalPage) {
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
