/**
 * @author: cuikangyi
 * @date: 2016-12-12
 * @file: mip-a5-loadmore.js
 */

define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();
    var defaults = {
        url: '/',
        page: 2,
        btn: '.loadBtn',
        moreList: '.moreList',
        status: {
            init: '<i></i>加载更多',
            loading: '<i></i>加载中',
            ending: '<i></i>没有了',
            error: '<i></i>网络错误'
        },
        scrollPage: -1,
        pageParam: '?page'
    };
    var options = {};
    var loadBtn = '';
    var page = 2;
    var isLoading = false;

    function getMore(element) {
        isLoading = true;
        loadBtn.html(options.status.loading);
        var morelist = $(element).find(options.moreList);
        $.ajax({
            "url": options.url+options.pageParam+'='+page,
            "method": "GET",
            "success": function (data) {
                var newData = $(data).find(options.moreList).children();
                if (newData.length > 0){
                    morelist.append(newData);
                    loadBtn.html(options.status.init);
                    page = page + 1;
                    isLoading = false;
                } else {
                    loadBtn.html(options.status.ending);
                    isLoading = false;
                }
            },
            "error": function (error) {
                loadBtn.html(options.status.error);
                isLoading = false;
            }
        });
    }
    
    customElem.prototype.build = function () {
        var element = this.element;
        var _options = $.parseJSON($(element).attr('options').replace(/'/g, '"'));
        options = $.extend(defaults, _options);
        page = options.page;
        loadBtn = $(options.btn);
        loadBtn.html(options.status.init);
        loadBtn.click(function () {
            if(isLoading){
                return false;
            }
            getMore(element);
        });

        var scrollPage = parseInt(options.scrollPage);
        if(scrollPage >=0){
            var winHeight = $(window).height();
            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop();
                var diff = $(document).height() - winHeight - scrollTop - 50;
                if(diff<0 && isLoading == false && (scrollPage == 0 || page < (options.page+scrollPage))){
                    getMore(element);
                }
            });
        }
    };
    return customElem;
});