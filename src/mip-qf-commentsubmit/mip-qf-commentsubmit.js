/**
 * @file mip-qf-commentsubmit 组件
 * @author W_peach
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var prefix = component.getAttribute('prefix'); // 请求接口地址前缀
        var postfix = component.getAttribute('data-url')
        ? component.getAttribute('data-url') : '/api/member/logindata'; //  请求接口地址后缀
        var columns = component.getAttribute('columns'); // 请求参数
        var input = component.querySelector('.btn-submit'); // 发表按钮
        var textarea = component.querySelector('.textarea'); // 评论文本框
        var login = component.querySelector('.link'); // 登陆跳转按钮
        var img = component.querySelector('.img'); // 头像
        var url = prefix + postfix;

        var params = columns.replace(/,/g, '%2C');

        url = prefix + postfix + '?columns=' + params;

        fetch(url)
        .then(function (res) {
            if (res.status !== 200) {
                textarea.disabled = true;
                login.style.display = 'block';
                input.style.display = 'none';
                img.setAttribute('src', 'https://m.119you.com/images/v2/ic-user-default.png');
            }
            return res.json();
        }).then(function (data) {
            if (data._Status === 1) {
                textarea.disabled = false;
                login.style.display = 'none';
                input.style.display = 'block';
                img.setAttribute('src', data.data.logofile);
            } else {
                textarea.disabled = true;
                login.style.display = 'block';
                input.style.display = 'none';
                img.setAttribute('src', 'https://m.119you.com/images/v2/ic-user-default.png');
            }
        }).catch(function (error) {
            alert('服务器错误，请联系管理员！');
        });

    };

    return customElement;
});
