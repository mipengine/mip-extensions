/**
* @file 脚本支持
* @author  hejieye
* @time  20161207
* @version 1.0.2
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            $('.similar-nav').on('click', 'li',
            function () {
                event.preventDefault();
                try {
                    $(this).siblings().removeClass('current');
                    $(this).addClass('current');

                    var index = $(this).index();
                    var nodes = $(this).parent().siblings();
                    $(nodes).hide();

                    $(nodes).slice(index, index + 1).show();
                } catch (e) {}
            });
        },
        // 换一换
        changeMore: function () {
            $('.link-change').on('click', function (event) {
                event.preventDefault();
                try {
                    var pagesize = 5;
                    var childNodes = $(this).parent().next().children();
                    var pagecount = $(this).attr('pagecount');
                    if (!pagecount) {
                        pagecount = pagesize;
                    }
                    if (pagecount >= childNodes.length) {
                        pagecount = 0;
                    }
                    var endcount = Number(pagecount) + pagesize;

                    $(childNodes).hide();
                    $(childNodes).slice(pagecount, endcount).show();
                    $(this).attr('pagecount', endcount);
                } catch (e) {}
            });
        },
        // 展开 or 收起
        openOrStop: function () {
            $('.os-click').on('click',
            function (event) {
                event.preventDefault();
                try {
                    var txt = $(this);
                    if (txt.text() === '[展开]') {
                        txt.text('[收起]');
                        txt.prev().show();
                    } else {
                        txt.text('[展开]');
                        txt.prev().hide();
                    }
                } catch (e) {}
            });
        },
        // 选择举报项
        reportChange: function () {
            $('#reportList li').on('click',
            function () {
                var fake = $(this).find('span').attr('class');
                if (fake === 'fakeChecked') {
                    $(this).find('span').removeClass();
                    $(this).find('span').addClass('fakeCheck');
                } else {
                    $(this).find('span').removeClass();
                    $(this).find('span').addClass('fakeChecked');
                }
            });
        },
        clearReport: function () {
            $('#report-div').hide();
            $('#report_id').text('');
            $('#report_type').text('');
            $('#report_typeId').text('');
            $('#reportList li').each(function () {
                $(this).find('span').removeClass();
                $(this).find('span').addClass('fakeCheck');
            });
        },
        // 取消举报
        cannelReport: function () {
            $('#cannelReport').on('click',
            function () {
                effects.clearReport();
            });
        },
        // 举报
        okReport: function () {
            $('#okReport').click(function () {
                var reportList = '';
                $('#reportList li').each(function () {
                    var fake = $(this).find('span').attr('class');
                    if (fake === 'fakeChecked') {
                        reportList += $(this).text().trim() + '-';
                    }
                });
                if (reportList === '') {
                    alert('请选择举报原因！');
                } else {
                    var checkLoginUrl = 'http://m.iask.sina.com.cn/checkLogin?m=' + Math.random();
                    $.get(checkLoginUrl,
                    function (e) {
                        if (e == null || e === 'null') {
                            // 跳转到登录页面
                            var thisHref = window.location.href;
                            window.location.href = 'http://m.iask.sina.com.cn/login?source=' + thisHref;
                            return;
                        } else {
                            var questionId = $('#report_id').text();
                            var type = $('#report_type').text();
                            var typeId = $('#report_typeId').text();
                            $.post('http://m.iask.sina.com.cn/question/reportnew', {
                                'reportList': reportList,
                                'questionId': questionId,
                                'type': type,
                                'typeId': typeId
                            },
                            function (data) {
                                var res = $.parseJSON(data);
                                alert(res.desc);
                            });
                            effects.clearReport();
                        }
                    });
                }
            });
        },
        // 关闭底部广告
        closeBottomAd: function () {
            $('.foot-plan-close').click(function () {
                $('#mip_as_footer_div').remove();
            });
        },
        // 问题搜索
        btnSearch: function () {
            $('.btn-search').click(function () {
                var content = $('.search-input').val();
                if (content.trim().length < 2) {
                    alert('关键字必须大于等于2个字!');
                    return;
                }
                window.location.href = 'http://m.iask.sina.com.cn/search/1.html?content=' + content;
            });
        },
        // 提问
        btnSend: function () {
            try {
                $('.btn-send').click(function () {
                    event.preventDefault();
                    var content = $('.search-input').val();
                    console.log(content);
                    window.location.href = 'http://m.iask.sina.com.cn/ask?content=' + content;
                });
            } catch (e) {}
        },
        // 设置cookie
        setCookie: function (name, value) {
            var Days = 30; // 此 cookie 将被保存 30 天
            var exp = new Date(); // new Date("December 31, 9998");
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
        },
        // 获取cookie
        getCookie: function (cookiename) {
            var result = null;
            var mycookie = document.cookie;
            var start2 = mycookie.indexOf(cookiename + '=');
            if (start2 > -1) {
                var start = mycookie.indexOf('=', start2) + 1;
                var end = mycookie.indexOf(';', start);
                if (end === -1) {
                    end = mycookie.length;
                }
                result = unescape(mycookie.substring(start, end));
            }
            return result;
        },
        addLoginCookie: function () {
            var key = 'iask_cookie';
            var now = new Date();
            var st = this.getCookie(key);
            if (st != null) {
                return;
            }
            this.setCookie(key, now.getTime() + '' + Math.random());
            return;
        },
        // 验证登录信息
        checkLogin: function () {
            try {
                this.addLoginCookie();
            } catch (e) {
                console.log(e);
            }
            var indexLogin = $('#index_login');
            var thisHref = window.location.href;
            var nickName = null;
            var checkLoginUrl = 'http://m.iask.sina.com.cn/checkLogin?m=' + Math.random();
            $.get(checkLoginUrl,
            function (e) {
                if (e === null || e === 'null') {
                    indexLogin.attr('href', 'http://m.iask.sina.com.cn/login?source=' + thisHref);
                } else {
                    var user = $.parseJSON(e);
                    nickName = user.nickname;
                    if (nickName.length > 4) {
                        nickName = nickName.substring(0, 3) + '....';
                    }
                    indexLogin.removeClass('btn-header btn-user');
                    indexLogin.addClass('user-nick');
                    indexLogin.html(nickName);

                    indexLogin.click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('.user-more').show();
                    });
                }
            });
        },
        userInfoHide: function () {
            $(document).click(function (event) {
                $('.user-more').hide();
            });
            $('.user-more').click(function (event) {
                event.stopPropagation();
            });
        },
        init: function () {
            this.switchBlock();
            this.changeMore();
            this.openOrStop();
            this.reportChange();
            this.cannelReport();
            this.okReport();
            this.closeBottomAd();
            this.btnSearch();
            this.btnSend();
            this.checkLogin();
            this.userInfoHide();
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        effects.init();
    };
    return customElem;
});
