/**
 * @file mip-fn-show-allarticles 组件
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
        var dataSrc = element.getAttribute('dataSrc') || " ";
        var articleid = element.getAttribute('articleid') || " ";
        var guanlian = element.getAttribute('guanlian') || " ";

        if(dataSrc == '' && articleid == '' && guanlian == '' ) {
            return;
        } 

        var showAllLink = '<article id="articleOtherContent" class="article-content"></article>'+  
                          '<span class="show-all-link" id="more-detail">继续阅读全文</span>'+
                          '<div id="load" style="display: none;"><mip-img layout="container" width="40" height="40" src="http://m.fengniao.com/icon/images/loading.gif" class="mip-element mip-layout-container mip-img-loaded"></mip-img>正在加载...</div>'; 
        $(element).html(showAllLink);   

        var moreDetail = $(element).find('#more-detail') 
        var load = $(element).find('#load')
        var article = $(element).find('article')
 
        /*加载*/
        var load_more = true; 
        guanlian = eval("(" + guanlian + ")"); 
        var pagesize = 0;
        var loadMoreFlg = 0;//加载第一页的flg
        var loadNextPage = 0;//加载下一页的flg
        $(function () {
            if (guanlian.length == 0) {
                moreDetail.hide();
            }
        });
       moreDetail.click(function () {
            load.show();
            $(this).hide();
            loadMoreFlg = 1;
            loadMoreData();
        });
        window.addEventListener('scroll', nextPage);
        //判断当前是否要加载下一页的内容
        function nextPage() {
            if (loadNextPage === 1) {
                //内容的高度
                var contentHeight = document.getElementById("article-content").offsetHeight; 

                var scrollTop = 0; //滚动条到顶部的距离
                if (document.documentElement && document.documentElement.scrollTop) {
                    scrollTop = document.documentElement.scrollTop;
                } else if (document.body) {
                    scrollTop = document.body.scrollTop;
                }
                if (scrollTop >= contentHeight - 400) {
                    loadNextPage = 0;//正在加载下一页，关闭滚动加载
                    loadMoreData();
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        //ajax 加载更多文章
        function loadMoreData() {
            if (loadMoreFlg === 1) {
                if (guanlian.length > 0) {
                    if (pagesize <= guanlian.length - 1) {
                        load.show();
                        $.ajax({
                            //url: "/ajax/wapajax.php?a=" + Math.random(),
                            url: dataSrc +'?a=' + Math.random(),
                            type: 'POST',
                            data: {"documentid": guanlian[pagesize], "scroll": "5"},
                            dataType: "html",
                            success: function (data) {
                                if (data) {
                                    article.append(data);
                                }
                                pagesize++;
                                loadNextPage = 1;//本页已经加载完毕，开启滚动加载flg
                                load.hide(); 
                            },
                            error: function () {
                                alert("接收数据失败");
                            }
                        });
                    } else {
                        //页面已经加载完 将滚动加载flg设成0
                        loadNextPage = 0;
                        load.hide();
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
    };
    return customElem;

})