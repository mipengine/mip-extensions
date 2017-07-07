/**
 * @file mip-taoge-scaydk 组件
 * @author 涛哥
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    // 验证方法
    var util = require('./util');

    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        // var element = this.element;
        // element._index = index ++;
        // 监听百度商桥
        $('.ocmb').click(function (event) {
            merchantBridge();
        });
        // 监听QQ客服
        $('.oqqc').click(function (event) {
            onlineQqConsulting();
        });
        // 监听拨打电话按钮
        $('.telephone_recording').click(function (event) {
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 3000,
                url: 'https://wap.scaydk.com/mip/index/telephone_recording',
                data: {type: 'telephone'},
                success: function (result) {
                },
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        ajaxTimeoutTest.abort();
                        // console.log("请求超时");
                    }
                },
                dataType: 'json'
            });
            location.href = 'tel:' + window.Think.Tel;
        });
        // 性别选择
        $(document).on('click', 'form > p.case_sex > span', function (event) {
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('form').find('input[name="sex"]').val($(this).index());
        });
        // 快速申请贷款
        $(document).on('submit', 'form.apply_for_loan', function (event) {
            formSubmit(this);
            return false;
        });
        // 底部菜单层
        popUpMenu();
    };

    //  表单提交
    function formSubmit(o) {
        if (util.validate(o, 2)) {
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 5000,
                url: 'https://wap.scaydk.com/mip/index/email',
                data: $(o).serialize(),
                success: function (result) {
                    tip(result);
                },
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        ajaxTimeoutTest.abort();
                        // console.log("请求超时");
                    }
                },
                dataType: 'json'
            });
        }
    }

    // 信息提示
    function tip(result) {
        if (result.code === 1) {
            success(result.msg);
        } else {
            error(result.msg);
        }
    }

    // 成功信息
    function success(msg) {
        alert(msg);
    }

    // 错误信息
    function error(msg) {
        alert(msg);
    }

    // 百度商桥
    function merchantBridge(o) {
        // console.log(navigator.userAgent);
        if (navigator.userAgent.indexOf('Baidu') > 0
            || navigator.userAgent.indexOf('Miui') > 0
            || navigator.userAgent.indexOf('MZ-MX') > 0)
        {
            var url = 'http://p.qiao.baidu.com/cps/chat?siteId=10764996&userId=23900454';
            window.open(
                url,
                '_blank',
                'height=510, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
            );
        } else {
            onlineQqConsulting();
        }
    }

    // QQ咨询
    function onlineQqConsulting(o) {
        var url;
        switch (3) {
            case 1:
                url = 'tencent://message/?Menu=yes&uin='
                    + window.Think.QQ
                    + '&Site=%E5%AE%89%E8%AA%89%E5%95%86%E5%8A%A1%E6%9C%8D%E5%8A%A1%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8'
                    + '&Service=300'
                    + '&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45';
                break;
            case 2:
                url = 'http://wpa.b.qq.com/cgi/wpa.php?ln=2&uin=' + window.Think.QQ + '&site=qq&menu=yes';
                break;
            case 3:
                url = 'mqqwpa://im/chat?chat_type=wpa&uin=' + window.Think.QQ + '&version=1&src_type=web&web_src=oicqzone.com';
                break;
        }
        window.open(
            url,
            '_self',
            'height=502, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
        );
    }

    // 底部菜单
    function popUpMenu() {
        $('body > div.Pop-up-Menu').click(function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on('touchstart', function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on('touchmove', function (event) {
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu').on('touchend', function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on('touchstart', function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on('touchmove', function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').on('touchend', function (event) {
            event.stopPropagation();
        });
        $('div.footer > div.right > a').click(function (event) {
            if ($('body > div.Pop-up-Menu').hasClass('show')) {
                $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
            } else {
                $('body > div.Pop-up-Menu').removeClass('hidden').addClass('show');
            }
            event.stopPropagation();
        });
        $('body > div.Pop-up-Menu > div > img').click(function (event) {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
        $(document).on('click', function (event) {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
        $(document).on('touchstart', function (event) {
            $('body > div.Pop-up-Menu').removeClass('show').addClass('hidden');
        });
    }

    return customElem;
});
