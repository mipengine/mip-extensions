/**
 * 帝国cms整合
 * @author: supai
 * @date: 2016-11-16
 * @file: mip-ecms.js
 */
define(function(require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    // 页面交互效果
    var effects = {
        bdshijian: function() {
            $(".favorite").on('click', function(event) {
                event.preventDefault();
                this.zan();
            });
        },
        // 文章点赞
        zan: function() {
            if ($(this).hasClass('done')) {
                return false;
            } else {
                $(this).addClass('done');
                var id = $(this).data("id"),
                    classid = $(this).data('classid'),
                    action = $(this).data('action'),
                    rateHolder = $(this).children('.count');
                var ajax_data = {
                    classid: classid,
                    id: id,
                    dotop: 1,
                    doajax: 1,
                    ajaxarea: 'diggnum'
                };
                $.get("/e/public/digg/index.php", ajax_data,
                    function(data) {
                        var dingnumr = data.substring(0, data.indexOf("|"));
                        if (dingnumr != "") {
                            $(rateHolder).html(dingnumr);
                        } else {
                            alert("你已经提交过了");
                        }

                    });
                return false;
            }
        },
        // 加载绑定
        init: function() {
            this.bdshijian();
        }
    };

    customElement.prototype.build = function() {
        effects.init();
    };

    return customElement;

});
