/**
* @file 前瞻网评论组件
* @author ningsong
* @time 2016.11.14
*/
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    // 页面交互
    var qzmobile = {
        get: function (url, contentType, success) {
            $.ajax({
                url: url,
                type: 'get',
                dataType: contentType || 'text/html',
                cache: false,
                success: function (json) {
                    success && success(json);
                },
                error: function (e) {
                    alert("获取信息出错，请稍后再试试");
                }
            });
        },
        post: function (url, contentType, data, success) {
            $.ajax({
                url: url,
                type: 'post',
                data: data,
                dataType: contentType || 'text/html',
                success: function (json) {
                    success && success(json);
                },
                error: function (e) {
                    alert("提交数据出错，请稍后再试试");
                }
            });
        }
    };

    qzmobile.commentList = qzmobile.commentList || {
        sourceId: '161114-291b4483',
        sourceType: 'info',
        sourceCateId: '464',
        page: 0,
        limint: 3,
        isFirstLoad: 0,
        eventHost: 'cmt_more',
        btnPublic: 'a_btn_commit',
        load: function () {
            var $host = $('#' + this.eventHost);
            var $btn = $('#' + this.btnPublic);
            $host.unbind('click').bind('click', function () {
                qzmobile.commentList.more(this);
            });
        },
        more: function (obj) {
            var $obj = $(obj);
            var list = qzmobile.commentList;
            if (list.page >= 1) {
                list.limint = 10;
            }
            $obj.text('更多评论加载中...');
            qzmobile.get(
                '/Comment/GetCommentsList?sourceId=' + this.sourceId + '&page=' + list.page + '&limit=' + list.limint,
                'html',
                function (data) {
                    if (!data) {
                        $obj.text('没有更多评论了...');
                        $("#cmt_more").hide();
                        return;
                    }
                    if (list.page == 1) {
                        $(".con_comm_list").remove();
                        $obj.parent().before(data);
                    } else {
                        $obj.parent().before(data);
                    }
                    list.page++;
                });
        },
        add: function (obj, txtObjStr) {
            if ($("#" + txtObjStr).val().trim().length < 4) {
                alert("请至少输入4个字");
                return;
            }
            var content = $('#' + txtObjStr).val().trim();
            content = content.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\//g, "&frasl;");

            var $obj = $(obj);
            var data = {
                srcid: this.sourceId,
                type: this.sourceType,
                content: content,
                parentComment: '',
                commentTitle: document.title.split('-')[0],
                url: document.URL,
                sourecateid: this.sourceCateId
            };
            if (!data.content || data.content.length < 4) {
                alert("请至少输入4个字");
                return;
            }
            qzmobile.post('/Comment/CommentAdd', 'json', data, function (json) {
                if (!json.success) {
                    alert(json.errors.text);
                } else {
                    alert(json.errors.text);
                    $("#txtBottomInput").val("");
                    $("#input_comments").val("");
                    $(".con_comm_list").remove();
                    qzmobile.commentList.page = 0;
                    setTimeout(function () {
                        qzmobile.commentList.more($("#cmt_more"));
                    }, 600);

                    if ($(obj).hasClass("pubcomm_f4_btn")) {
                        $(".pubcomm").removeClass("pubcomm_share_ctrl");
                        $(".pubcomm").removeClass("pubcomm_ctrl");
                    }
                }
            });
        }
    };

    /**
    * 构造元素，只会运行一次
    */
    customElement.prototype.build = function () {
        qzmobile.commentList.load();
        $(".con_comm_list ul li:last").addClass("last");
    };

    /**
    * 向文档中插入节点回调
    */
    customElement.prototype.attachedCallback = function () {
        qzmobile.commentList.more($('#cmt_more'));
    };
    
    return customElement;

});


