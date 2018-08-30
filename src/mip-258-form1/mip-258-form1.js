/**
 * @file mip-258-form 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var form = require('./mip-258-form1-fn');
    var $ = require('zepto');

    customElement.prototype.build = function () {
        var element = this.element;
        var url = $(element).attr('fetch-url');


        // 获取验证码事件

        $(element).find('.btnCode').click(function () {
            var url = $(this).attr('btn-url');
            var mobile = $(element).find('.inquiryMobile').val();
            getInquiryMobileCode(mobile, 60, url);
        });

        function getInquiryMobileCode(mobile, second, url) {
            if (mobile === '' || isNaN(mobile)) {
                alert('请输入手机号码');
                return false;
            }
            else if (mobile.length !== 11) {
                alert('请输入正确的手机号码');
                return false;
            }
            $(element).find('.btnCode').hide();
            if (second <= 1) {
                $(element).find('.waitInquiry').html(59);
                $(element).find('.getInquiryCode').show();
                $(element).find('.waitInquiryCode').addClass('hide');
                $(element).find('.btnCode').show();
                return true;
            }
            if (second >= 60) {
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: 'mobile=' + mobile,
                    async: true,
                    success: function (data) {
                        alert(data.info);
                    }
                });
                $(element).find('.getInquiryCode').hide();
                $(element).find('.waitInquiryCode').removeClass('hide');
            }
            second--;
            $(element).find('.waitInquiry').html(second);
            setTimeout(function () {
                getInquiryMobileCode(mobile, second);
            }, 1000);
        }
        form.createDom(element);
        form.initMessageEvents(element);
    };
    customElement.prototype.firstInviewCallback = function () {
        this.addEventAction('reload', function (event, str) {
            // 页面刷新操作
            str = str ? 500 : parseInt(str, 10);
            setTimeout(function () {
                window.top.location.reload();
            }, str);
        });

        this.addEventAction('reset', function (event, str) {
            // 页面刷新操作
            event.target.reset();
        });
    };
    return customElement;
});
