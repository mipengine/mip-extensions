/**
 * @file  mip-haixue-register 组件
 * @author qishunli(qishunli@baidu.com)
 * @time 16-12-08
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        // TODO
        var me = this;
        var element = me.element;
        var MOBILE_REG = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
        var url = 'http://haixue.com/leaveMessage/saveCrmLeaveMessage.do';
        var tpl
            = '<div class="m-pop m-popEnd">'
            + '<h4>你已经提交成功！</h4>'
            + '<p>嗨学网会尽快联系你！</p>'
            + '<div class="m-btnB">'
            + '<span class="m-btn m-btn2 m-popClose">知道了</span>'
            + '</div>'
            + '</div>';
        $('body').append(tpl);

        $('body').on('click', '.m-popClose', function () {
            $('.m-popEnd').hide(200);
        });

        function loadJs(url) {
            var myHead = document.getElementsByTagName('head').item(0);
            var myScript = document.createElement('script');
            myScript.type = 'text/javascript';
            myScript.src = url;
            myHead.appendChild(myScript);
        }
        $(element).on('click', '.form-button', function () {
            var value = $('.form-input').val();
            var formValue = 'mobile=' + value;
            var webFrom = 'YJ_bjh';
            if (MOBILE_REG.test(value)) {
                loadJs(
                    url
                    + '?' + formValue
                    + '&categoryId=' + '9' + '&childCategoryId='
                    + '100051' + '&webFrom=' + webFrom);
                $('.m-popEnd').show(200);
            }
            else {
                alert('手机号格式不正确！');
            }
        });
    };

    return customElement;
});
