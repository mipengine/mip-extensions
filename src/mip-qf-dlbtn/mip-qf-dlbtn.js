/**
 * @file mip-qf-dlbtn 组件
 * @author W_peach
 */

define(function (require) {
    'use strict';
    var getLink = require('./getLink');
    var util = require('util');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */

    customElement.prototype.firstInviewCallback = function () {
        var component = this.element; // 组件元素
        var prefix = component.getAttribute('prefix') ? component.getAttribute('prefix') : ''; // 获取下载地址前缀

        if (util.platform.isWechatApp()) { // 微信浏览器
            return component.addEventListener('click', function (e) {
                e.preventDefault();
                wechatMask();
            }, false);
        }

        var link = getLink(getParams(component));

        component.addEventListener('click', function (e) { // 点击跳转
            e.preventDefault();
            window.location.href = link === '' ? 'javascript:void(0)' : (prefix + link);
        }, false);

        if (link === '') { // 无包或时添加无包样式
            component.classList.add('btn-disabled');
        }
    };

    return customElement;
});

/**
 * 微信遮罩 wechatMask
 */
var wechatMaskBox = document.createElement('div');
wechatMaskBox.classList.add('m-wechat-down-box');
wechatMaskBox.innerHTML = '<div class="u-img"></div>'; // 遮罩模版
function wechatMask() {
    document.querySelector('body').appendChild(wechatMaskBox);
    $('.m-wechat-down-box').fadeIn().unbind().click(function (e) {
        e.stopPropagation();
        $(this).fadeOut();
    });
}

/**
 * 生成初始化下载链接所需的参数对象
 * @param {Object} el 组件元素
 * @return {Object} 参数对象
 */
function getParams(el) {
    return {
        ipaHref: el.getAttribute('ipa-href') ? el.getAttribute('ipa-href') : '',
        apkHref: el.getAttribute('apk-href') ? el.getAttribute('apk-href') : '',
        isBp: el.getAttribute('data-isbp') ? el.getAttribute('data-isbp') : '',
        ipaPrefixMb: el.getAttribute('ipa-prefix-mb') ? el.getAttribute('ipa-prefix-mb') : '',
        ipaPrefixNomb: el.getAttribute('ipa-prefix-nomb') ? el.getAttribute('ipa-prefix-nomb') : '',
        gameHref: el.getAttribute('game-href') ? el.getAttribute('game-href') : '',
        asoTest: el.getAttribute('data-asoTest') ? el.getAttribute('data-asoTest') : ''
    };
}
