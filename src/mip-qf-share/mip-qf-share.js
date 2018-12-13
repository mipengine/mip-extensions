/**
 * @file mip-qf-share 组件
 * @author W_peach
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var qrCodeURL = component.getAttribute('qrcode-url');
        var qrcodeText = qrCodeURL ? qrCodeURL : window.location.href;

        addShareBox();

        // qq好友分享
        $('.m-share-item-qq').on('click', function () {
            window.top.location.href('https://connect.qq.com/widget/shareqq/index.html?url=' + window.location.href + '&sharesource=qzone&title=' + document.title + '&pics=&summary=' + document.title + '&desc=' + document.title);
        });

        // 微信分享向导
        $('.u-url-box').text(window.location.href + '/');
        // 根据自定义URL或者本地URL在线生成qrcode
        $('.online-qrcode-box').attr('src', 'https://www.kuaizhan.com/common/encode-png?large=true&data=' + qrcodeText);

        // 点击toggle分享图标盒子
        $(component).on('click', function (e) {
            e.preventDefault();
            $('.m-share-list-box').toggle();
        });

        // 打开微信分享盒子
        $('.m-share-item-wechat').on('click', function () {
            $('.m-share-wechat-box').fadeIn('fast');
            $('.m-share-list-box').fadeOut('slow');
        });

        // 关闭分享盒子
        $('.m-share-wechat-box .icon-close').on('click', function () {
            $('.m-share-wechat-box').fadeOut('slow');
        });
    };

    return customElement;
});

/**
 * 将分享提示框append到body中
 */
function addShareBox() {
    var sharelistHTML = document.createElement('div');
    var wechatShareHTML = document.createElement('div');

    sharelistHTML.innerHTML = '<div class="m-share-item m-share-item-qq">'
    + '<i></i><span class="u-text">QQ好友</span></div>'
    + '<div class="m-share-item m-share-item-wechat"><i></i>'
    + '<span class="u-text">微信</span></div>';
    sharelistHTML.classList.add('m-share-list-box');

    wechatShareHTML.innerHTML = '<div class="m-title-box">'
    + '<span class="u-title">微信分享</span><button class="icon icon-close">'
    + '</button></div><div class="u-method">方式1：复制链接发送</div>'
    + '<textarea class="u-url-box">{{url}}</textarea>'
    + '<div class="u-method">方式2：二维码方式</div>'
    + '<div class="u-method-tip">长按二维码保存，在微信分享给好友或朋友圈</div>'
    + '<div id="m-qrcode-box" class="m-qrcode-box">'
    + '<mip-img src="http://www.kuaizhan.com/common/encode-png?large=true&data=www.m.119you.com"'
    + 'width="150" height="150" class="online-qrcode-box"></div>';
    wechatShareHTML.classList.add('m-share-wechat-box');

    $('body').append(wechatShareHTML);
    $('mip-qf-share').parent().after(sharelistHTML);
}