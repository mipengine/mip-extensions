/**
 * 帝国cms整合
 * @author: supai
 * @date: 2016-11-16
 * @file: mip-ecms.js
 */
define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    var effects = {
        // 绑定事件
        bindEvents: function () {
            // 文章点赞
            $('.favorite').on('click', function (event) {
                event.preventDefault();
                this.zan();
            });
            // 评论验证码刷新
            $('#KeyImg').on('click', function (event) {
                $('#KeyImg').attr('src', '/e/ShowKey/?v=pl&' + Math.random());
            });
        },
        // 文章点赞
        zan: function () {
            if ($(this).hasClass('done')) {
                return false;
            }
            $(this).addClass('done');
            var id = $(this).data('id');
            var classid = $(this).data('classid');
            var rateHolder = $(this).children('.count');
            var ajaxData = {
                classid: classid,
                id: id,
                dotop: 1,
                doajax: 1,
                ajaxarea: 'diggnum'
            };
            $.get('/e/public/digg/index.php', ajaxData,
                function (data) {
                    var dingnumr = data.substring(0, data.indexOf('|'));
                    if (!dingnumr) {
                        $(rateHolder).html(dingnumr);
                    }
                    else {
                        alert('你已经提交过了');
                    }

                });
            return false;
        },
        // 回滚页面顶部
        gotoTop: function () {
            $(window).scroll(function () {
                var scrollValue = $(window).scrollTop();
                scrollValue > 500 ? $('div[class=scroll]').fadeIn() : $('div[class=scroll]').fadeOut();
            });
            $('#scroll').click(function () {
                $('html,body').animate({
                    scrollTop: 0
                }, 200);
            });
        },
        // 百度站内搜索
        bdZnsv: function () {
            var sid = $('#bdcsMain').data('sid');
            var bdcs = document.createElement('script');
            bdcs.type = 'text/javascript';
            bdcs.async = true;
            bdcs.src = 'http://znsv.baidu.com/customer_search/api/js?sid=' + sid
                + '&plate_url=' + encodeURIComponent(window.location.href)
                + '&t=' + Math.ceil(new Date() / 3600000);
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(bdcs, s);
        },
        rightNews: function () {
            var elm = $('.sitebar_list');
            var startPos = $(elm).offset().top;
            $.event.add(window, 'scroll', function () {
                var p = $(window).scrollTop();
                $(elm).css('position', ((p) > startPos) ? 'fixed' : 'static');
                $(elm).css('top', ((p) > startPos) ? '20px' : '');
            });
        },
        // 加载绑定
        init: function () {
            this.bindEvents();
            this.gotoTop();
            this.bdZnsv();
            this.rightNews();
        }
    };

    customElement.prototype.build = function () {
        effects.init();
    };
    return customElement;
});
