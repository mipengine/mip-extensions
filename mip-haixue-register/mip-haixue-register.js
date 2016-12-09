/**
 * @file mip-register 组件
 * @author qishunli(qishunli@baidu.com)
 * @time 16-12-08
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var Cookie = {
        getExpiresDate: function (days, hours, minutes) {
            var ExpiresDate = new Date();
            if (typeof days === 'number' && typeof hours === 'number' &&
                typeof hours === 'number') {
                ExpiresDate.setDate(ExpiresDate.getDate() + parseInt(days));
                ExpiresDate.setHours(ExpiresDate.getHours() + parseInt(hours));
                ExpiresDate.setMinutes(ExpiresDate.getMinutes() + parseInt(minutes));
                return ExpiresDate.toGMTString();
            }
        },
        getValue: function (offset) {
            var endstr = document.cookie.indexOf(';', offset);
            if (endstr === -1) {
                endstr = document.cookie.length;
            }
            return unescape(document.cookie.substring(offset, endstr));
        },
        get: function (name) {
            var arg = name + '=';
            var alen = arg.length;
            var clen = document.cookie.length;
            var i = 0;
            while (i < clen) {
                var j = i + alen;
                if (document.cookie.substring(i, j) === arg) {
                    return this.getValue(j);
                }
                i = document.cookie.indexOf(' ', i) + 1;
                if (i === 0) {
                    break;
                }
            }
            return '';
        },
        set: function (name, value, expires, path, domain, secure) {
            document.cookie = name + '=' + escape(value) +
                ((expires) ? '; expires=' + expires : '') +
                ((path) ? '; path=' + path : '') +
                ((domain) ? '; domain=' + domain : '') +
                ((secure) ? '; secure' : '');
        },
        remove: function (name, path, domain) {
            if (this.get(name)) {
                document.cookie = name + '=' +
                    ((path) ? '; path=' + path : '') +
                    ((domain) ? '; domain=' + domain : '') +
                    '; expires=Thu, 01-Jan-70 00:00:01 GMT';
            }
        },
        clear: function () {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookieName = cookies[i].split('=')[0];
            }
            if (cookieName === 'ProductListIds') {
                this.remove(cookieName);
            }
        }
    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        // TODO
        var me = this;
        var _element = me.element;
        var MOBILE_REG = /^((13[0-9])|(17[0-9])|(14[0-9])|(15[0-9])|(18[0-9]))\d{8}$/;
        var _url = 'http://haixue.com/leaveMessage/saveCrmLeaveMessage.do';
        var tpl =
            '<div class="m-pop m-popEnd">' +
                '<h4>你已经提交成功！</h4>' +
                '<p>嗨学网会尽快联系你！</p>' +
                '<div class="m-btnB">' +
                    '<span class="m-btn m-btn2 m-popClose">知道了</span>' +
                '</div>' +
            '</div>';
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
        $(_element).on('click', '.form-button', function () {
            var value = $('.form-input').val();
            var formValue = 'mobile=' + value;
            var webFrom = Cookie.get('webFrom');
            if (MOBILE_REG.test(value)) {
                loadJs(
                    _url +
                    '?' +
                    formValue +
                    '&categoryId=' +
                    '9' +
                    '&childCategoryId=' +
                    '100051' +
                    '&webFrom=' +
                    webFrom
                );
                setTimeout(
                    function () {
                        $('.m-pop ').show(200);
                    }, 800);

            }
            else {
                alert('手机号格式不正确！');
            }
        });
    };

    return customElement;
});
