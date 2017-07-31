/**
 * @file mip-taoge-scaydk 组件
 * @author 涛哥
 */

define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    // 扩展方法
    // var util = require('./util');

    var customElem = require('customElement').create();

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {

        // 监听百度商桥
        $('.ocmb').click(function (event) {
            merchantBridge();
        });

        // 监听QQ客服
        $('.oqqc').click(function (event) {
            onlineQqConsulting();
        });

        // 监听拨打电话按钮
        $('.tel').click(function (event) {
            var ajaxTimeoutTest = $.ajax({
                type: 'POST',
                timeout: 3000,
                url: 'http://mip.scaydk.com/mip/index/telephone_recording',
                data: {type: 'telephone'},
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        ajaxTimeoutTest.abort();
                        // console.log("请求超时");
                    }
                },
                dataType: 'json'
            });
        });

        // 快速申请贷款
        $(document).on('submit', 'form', function (event) {
            formSubmit(this);
            return false;
        });
    };

    // 创建元素回调
    customElem.prototype.createdCallback = function () {
        // console.log('created');
    };
    // 向文档中插入节点回调
    customElem.prototype.attachedCallback = function () {
        // console.log('attached');
    };
    // 从文档中移出节点回调
    customElem.prototype.detachedCallback = function () {
        // console.log('detached');
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        // console.log('first in viewport');
    };
    // 进入或离开可视区回调，每次状态变化都会执行
    customElem.prototype.viewportCallback = function (isInView) {
        // true 进入可视区;false 离开可视区
        // console.log(isInView);
    };
    // 控制viewportCallback、firstInviewCallback是否提前执行
    // 轮播图片等可使用此方法提前渲染
    customElem.prototype.prerenderAllowed = function () {
        // 判断条件，可自定义。返回值为true时,viewportCallback、firstInviewCallback会在元素build后执行
        return !!this.isCarouselImg;
    };

    //  表单提交
    function formSubmit(o) {
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

    // 信息提示
    function tip(result) {
        if (result.code === 1) {
            success(result.msg);
        }
        else {
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
        if (navigator.userAgent.indexOf('Baidu') > 0
            || navigator.userAgent.indexOf('Miui') > 0
            || navigator.userAgent.indexOf('MZ-MX') > 0) {
            var url = 'http://p.qiao.baidu.com/cps/chat?siteId=10764996&userId=23900454';
            window.open(
                url,
                '_blank',
                'height=510, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
            );
        }
        else {
            onlineQqConsulting();
        }
    }

    // QQ咨询
    function onlineQqConsulting(o) {
        var url;
        switch (3) {
            case 1:
                url = 'tencent://message/?Menu=yes&uin='
                    + Think.QQ
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
            '_BANK',
            'height=502, width=644,toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
        );
    }

    return customElem;
});
