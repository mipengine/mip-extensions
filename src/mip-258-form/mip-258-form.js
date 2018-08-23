/**
 * @file mip-258-form 组件
 * @author
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var $ = require('zepto');

    customElement.prototype.build = function () {
        var element = this.element;
        var addClearBtn = element.hasAttribute('clear');
        form.createDom(element);

        //获取验证码
        $(element).find('.btnCode').click(function(){
            let url = $(this).attr('btn-url');
            let mobile = $('#inquiryMobile').val();
            getInquiryMobileCode(mobile,60,url)
        })

        //获取询价手机验证码
        function getInquiryMobileCode(mobile,second,url){
            if(mobile==''||isNaN(mobile)){
                alert('请输入手机号码');
                return false;
            }else if(mobile.length!=11){
                alert('请输入正确的手机号码');
                return false;
            }
            if(second<=1){
                $("#waitInquiry").html(59);
                $("#getInquiryCode").show();
                $("#waitInquiryCode").hide();
                return true;
            }
            if(second >= 60){
                $.ajax({
                    type: "POST",
                    url: url,
                    data: 'mobile='+mobile,
                    async:true,
                    success: function(data) {
                        show(data.info);
                    }
                });
                $("#getInquiryCode").hide();
                $("#waitInquiryCode").show();
            }
            second--;
            $("#waitInquiry").html(second);
            setTimeout(function() {
                getInquiryMobileCode(mobile,second)
            },1000);
        };
    };
    return customElement;
});
