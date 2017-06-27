/**
 * @file 预约提醒插件
 * @author 233 程序部
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        var flag = true;
        var lastTime = 60;
        var timer = null;
        var domain = $(element).attr('data-domain');
        // 点获取验证码后，过60秒才能再次提交
        function change() {
            flag = false;
            if (--lastTime <= 0) {
                lastTime = 60;
                clearInterval(timer);
                flag = true;
                $('.m-nerror').html('');
                $('#getyanzheng').removeClass('grey').html('重新发送');
            } else {
                $('#getyanzheng').addClass('grey').html('重新发(' + lastTime + ')');
            }
        }
        $('.orange-btn').click(function () {
            $(element).find('.body_mask').removeClass('hide').show();
        });
        $('.close-btn').click(function () {
            $(element).find('.body_mask').hide();
        });
        $('#getyanzheng').click(function () {
            var phone = $.trim($('#chr_masswarp').val());
            if (!flag) {
                $('.m-nerror').html('<span class="error-icon"></span>*请稍后再试');
                return;
            }
            if (!/^1[34578]\d{9}$/.test(phone)) {
                $('.m-nerror').html('<span class="error-icon"></span>*请填写正确的手机');
                return false;
            }
            $.ajax({
                type: 'post',
                scriptCharset: 'utf-8',
                url: 'http://www.233.com/search/nine-20150423/json/bespeak.asp?Act=code',
                data: {
                    phone: phone
                },
                dataType: 'jsonp',
                success: function (result) {
                    if (result.S === 1) {
                        $('.m-nerror').removeClass('cRed').html(result.msg);
                        timer = setInterval(change, 1000);
                    } else {
                        $('.m-nerror').addClass('cRed').html('<span class="error-icon"></span>' + result.msg);
                    }
                }
            });
        });
        $('#queding').click(function () {
            var fullname = $.trim($('#fullname').val());
            var did = $.trim($('.Area').val());
            var phone = $.trim($('#chr_masswarp').val());
            var classid = $.trim($('#kemu').val());
            var code = $.trim($('#smsCode').val());

            if (!/^[\u4e00-\u9fa5]+$/.test(fullname) || fullname === '填写真实姓名') {
                $('.m-nerror').html('<span class="error-icon"></span>*姓名错误');
                return;
            }
            if (!/^\d+$/.test(did) || did === 0) {
                $('.m-nerror').html('<span class="error-icon"></span>*请选择地区');
                return;
            }
            if (!/^1[34578]\d{9}$/.test(phone)) {
                $('.m-nerror').html('<span class="error-icon"></span>*请填写正确的手机号码');
                return;
            }
            if (!/^\d+$/.test(classid) || classid === 0) {
                $('.m-nerror').html('<span class="error-icon"></span>*请选择科目');
                return;
            }
            if (!/^\d{6}$/.test(code)) {
                $('.m-nerror').html('<span class="error-icon"></span>*验证码错误');
                return;
            }
            $.ajax({
                type: 'post',
                scriptCharset: 'utf-8',
                url: 'http://www.233.com/search/nine-20150423/json/bespeak.asp?Act=bespeak',
                data: {
                    domain: domain,
                    fullname: escape(fullname),
                    did: did,
                    phone: phone,
                    classid: classid,
                    code: code,
                    type: 1,
                    fromurl: escape(window.location.href)
                },
                dataType: 'jsonp',
                beforeSend: function () {
                    $('.m-nerror').html('正在申请');
                },
                success: function (result) {
                    if (result.S === 1) {
                        $('.m-nerror').html('预约成功');
                        setTimeout(function () {
                            $(element).find('.body_mask').hide();
                        }, 2000);
                    } else {
                        $('.m-nerror').html('预约失败');
                    }
                },
                error: function () { },
                async: true,
                cache: false
            });
        });
    };
    return customElem;
});
