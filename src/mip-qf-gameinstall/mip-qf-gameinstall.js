/**
 * @file mip-qf-gameinstall 组件
 * @author
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var isBp = component.querySelector('mip-qf-dlbtn').getAttribute('data-isbp');
        var companyGame = component.getAttribute('company-game');

        companyGame === 'Y' ? tip() : '';
        console.log(isBp);
        if (util.platform.isIos()) {
            // 官方包UC浏览器提示进入AppStore
            if (util.platform.isUc()) {
                var html = document.createElement('div');
                html.innerHTML = '<img src="https://m.119you.com/images/v2/ic-jump-appstore.png" class="u-imgjump-appstore" alt="跳转官方应用商店提示"></img>';
                $('body').append(html);
            }
            // 越狱包
            if (isBp === 'Y') {
                $('.m-other-tip-box').css('display', 'block');
                $('.m-guide-link').css('display', 'block');
                $('.m-version-list').children().length < 1 ? $('.u-other-version-tip').css('display', 'none') : true;
            }
        } else {
            $('.u-icon-5yuan').css('display', 'block');
            $('.m-icon-apple').css('display', 'none');
        }
    };

    return customElement;
});

/**
 * 企业签提示函数
 */
function tip() {
    $('.m-enterprise-tag').css('display', 'block');
    $('.m-enterprise-tag').click(function () {
        if ($('.m-bg-qyq').css('display') !== 'none') {
            return false;
        }
        $('.m-bg-qyq').fadeIn(1500);
        var timeout = setTimeout(function () {
            $('.m-bg-qyq').fadeOut(1500);
        }, 4000);
    });
}