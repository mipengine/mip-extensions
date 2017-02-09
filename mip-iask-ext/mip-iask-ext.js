/**
* @file 脚本支持
* @author  hejieye
* @time  20170106
* @version 1.3.2
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
                }
                catch (e) {}
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
                }
                catch (e) {}
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
                    }
                    else {
                        txt.text('[展开]');
                        txt.prev().hide();
                    }
                }
                catch (e) {}
            });
        },
        // 选择举报项
        reportChange: function () {
            $('.reportList li').on('click',
            function () {
                var fake = $(this).find('span').attr('class');
                if (fake === 'fakeChecked') {
                    $(this).find('span').removeClass();
                    $(this).find('span').addClass('fakeCheck');
                }
                else {
                    $(this).find('span').removeClass();
                    $(this).find('span').addClass('fakeChecked');
                }
            });
        },
        clearReport: function () {
            $('.report-body').hide();
            $('.report_id').text('');
            $('.report_type').text('');
            $('.report_typeId').text('');
            $('.reportList li').each(function () {
                $(this).find('span').removeClass();
                $(this).find('span').addClass('fakeCheck');
            });
        },
        // 取消举报
        cannelReport: function () {
            $('.cannelReport').on('click',
            function () {
                effects.clearReport();
            });
        },
        // 举报
        okReport: function () {
            $('.okReport').click(function () {
                var reportList = '';
                $('.reportList li').each(function () {
                    var fake = $(this).find('span').attr('class');
                    if (fake === 'fakeChecked') {
                        reportList += $(this).text().trim() + '-';
                    }
                });
                if (reportList === '') {
                    alert('请选择举报原因！');
                }
                else {
                    var checkLoginUrl = 'https://mipp.iask.cn/checkLogin?mip=' + Math.random();
                    $.get(checkLoginUrl,
                    function (e) {
                        if (e == null || e === 'null') {
                            // 跳转到登录页面
                            var thisHref = window.location.href;
                            window.location.href = 'https://mipp.iask.cn/login?source=' + thisHref;
                        }
                        else {
                            var questionId = $('.report_id').text();
                            var type = $('.report_type').text();
                            var typeId = $('.report_typeId').text();
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
            }
            catch (e) {}
        },
        // 验证登录信息
        checkLogin: function () {
            var btnUser = $('.btn-user');
            var thisHref = window.location.href;
            var checkLoginUrl = 'https://mipp.iask.cn/checkLogin?mip=' + Math.random();
            $.get(checkLoginUrl,
            function (e) {
                if (e === null || e === 'null') {
                    $('.icon-ency-login').attr('href', 'https://mipp.iask.cn/login?source=' + thisHref);
                    btnUser.click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('.login-out').show();
                    });
                }
                else {
                    btnUser.click(function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        $('.login-in').show();
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
        sendPost: function (url, positionId, advertId, status, contentId, connId) {
            url = url + '?positionId=' + positionId + '&advertId='
            + advertId + '&contentId=' + contentId + '&connId=' + connId;
            if (status !== null) {
                url += '&status=1';
            }
            $('body').append('<mip-img src=\'' + url + '\' class=\'mask\' >');
        },
        // 数据上报
        checkData: function () {
            $('mip-ad,mip-embed').each(function () {
                effects.sendPost('http://dd.iask.cn/ddd/adAudit', '144', '241', null, '195', 'm_q_detail_attention_1');
            });
            setInterval(function () {
                // 判断是否加载出来
                $('mip-ad,mip-embed').each(function () {
                    var loadFlag = $(this).attr('loadFlag');
                    if ($(this).html().indexOf('iframe') > 0 && loadFlag === undefined) {
                        $(this).attr('loadFlag', true);
                        effects.sendPost('http://dd.iask.cn/ddd/adStatus', '144', '241', 1, '195', 'm_q_detail_attention_1');
                    }
                });
            }, 100);
        },
        accordion: function () {
            $('.iask-show-more').click(function () {
                $(this).parent().siblings('.iask-accordion').each(function () {
                    $(this).show();
                });
                $(this).hide();
                $(this).siblings('.iask-show-less').show();
            });
            $('.iask-show-less').click(function () {
                $(this).parent().siblings('.iask-accordion').each(function () {
                    $(this).hide();
                });
                $(this).hide();
                $(this).siblings('.iask-show-more').show();
            });
        },
        // 好万家导流
        guideData: function () {
            var urlf = 'https://mipp.iask.cn/t/mipdf?t=fous';
            var urlr = 'https://mipp.iask.cn/t/mipdf?t=recom';
            try {
                $.ajax({
                    type: 'GET',
                    url: urlf,
                    dataType: 'html',
                    success: function (data) {
                        if (!!data) {
                            $('.load_today_focus').empty();
                            $('.load_today_focus').append(data);
                        }
                    }
                });
                $.ajax({
                    type: 'GET',
                    url: urlr,
                    dataType: 'html',
                    success: function (data) {
                        if (!!data) {
                            $('.load_recom_red').empty();
                            $('.load_recom_red').append(data);
                        }
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
        },
        init: function () {
            this.switchBlock();
            this.changeMore();
            this.openOrStop();
            this.reportChange();
            this.cannelReport();
            this.okReport();
            this.btnSearch();
            this.btnSend();
            this.checkLogin();
            this.userInfoHide();
            this.checkData();
            this.accordion();
            this.guideData();
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        effects.init();
    };

    return customElem;
});
