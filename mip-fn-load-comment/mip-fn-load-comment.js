/**
 * @file mip-fn-load-comment 组件
 * @author fn
 */
define(function (require) { 
    var $ = require('zepto');
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element; 
        var pageCount = element.getAttribute('page_count') || " ";
        var documentid = element.getAttribute('articleid') || " ";
        var dataSrc = element.getAttribute('dataSrc') || " "; 

        var showAllLink = '<ul id="commentOtherContent" class="comment-list"></ul>'+  
                          '<span class="more-link" id="more-link">加载更多</span>'; 
        $(element).html(showAllLink);    

        console.log(pageCount)

        var page = 2;
        //var pageCount = $('#page_count').val();
        var loadNextPage = 0;//加载flg
        //var documentid = $('#articleid').val();
        $(function () {
            if (pageCount >= 2) {
                loadNextPage = 1;
                $('#more-link').show();
            } else {
                $('#more-link').hide();
            }
        });
        window.addEventListener('scroll', loadMoreData);
        //描 述：判断是滚动到页面底部
        function uiIsPageBottom() {
            if (loadNextPage === 1) { 
                var scrollTop = 0;
                var clientHeight = 0;
                var scrollHeight = 0;
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                if (document.body.clientHeight && document.documentElement.clientHeight) {
                    clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                } else {
                    clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
                }
                //知识点：Math.max 比较大小，取最大值返回
                scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                //if ((scrollTop + clientHeight) >= (scrollHeight-800)) {
                if ((scrollTop + clientHeight) >= (scrollHeight)) {
                    loadNextPage = 0;
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        function loadMoreData() {
            if (page <= pageCount) {
                if (uiIsPageBottom()) {
                    $.ajax({ 
                        url: dataSrc +'?a=' + Math.random(),
                        type: 'post',
                        data: {action: 'getcomments', "documentid": documentid, "page": page},
                        dataType: "html",
                        success: function (data) {
                            $('#commentOtherContent').append(data);
                            page++;
                            if (page <= pageCount) {
                                loadNextPage = 1;
                                $('#more-link').show();
                            }
                        },
                        error: function () {
                            alert("网络通讯异常，请稍后再试。");
                            return false;
                        }
                    });
                }
            } else {
                loadNextPage = 0;
                $('#more-link').hide();
            }
        }
    };
    return customElem; 
})