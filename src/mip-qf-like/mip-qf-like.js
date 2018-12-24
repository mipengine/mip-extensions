/**
 * @file mip-qf-like 组件
 * @author W_peach
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var $ = require('zepto');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        var component = this.element;
        var commentId = component.getAttribute('data-commentid');
        var likeUrl = component.getAttribute('like-url')
        ? component.getAttribute('like-url') : 'https://m.119you.com/api/simplecomment/support';
        var removelikeUrl = component.getAttribute('removelike-url')
        ? component.getAttribute('removelike-url') : 'https://m.119you.com/api/simplecomment/cancelsupport';
        var count = component.querySelector('.text');

        var options = {
            method: 'POST',
            body: 'commentid: ' + commentId
        };

        // 点赞函数
        function like() {
            fetch(likeUrl, options)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    if (data._Status === 1) {
                        component.classList.add('div-praise-active');
                        count.innerText++;
                        return false;
                    }
                    tip('请求接口错误，请联系管理员！', 'error');
                })
                .catch(function (error) {
                    tip(error);
                });
        }

        // 取消赞函数
        function removeLike() {
            fetch(removelikeUrl, options)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    if (data._Status === 1) {
                        component.classList.remove('div-praise-active');
                        count.innerText--;
                        return false;
                    }
                    tip('请求接口错误，请联系管理员！', 'error');
                })
                .catch(function (error) {
                    tip(error);
                });
        }

        component.addEventListener('click', function () {
            this.classList.contains('div-praise-active') ? removeLike() : like();
        });

    };

    return customElement;
});

/**
 * 错误消息提示框
 * @param {string} message 提示框文案
 * @param {string} state   提示框类型
 */
function tip(message, state) {
    var html = '<div class="message-tip"></div>';
    var self;

    $('body').append(html);
    self = $('.message-tip');
    self.text(message);

    state === 'error' ? self.css('background-color', '#F96565C9') : self.css('background-color', '#333');

    $('.message-tip').fadeIn('fast');
    setTimeout(function () {
        $('.message-tip').fadeOut('slow');
    }, 1500);
}