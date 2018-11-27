/**
 * @file mip-widget-page 组件
 * @author oott123<git@public.oott123.com>
 */

define(function (require) {
    'use strict';
    var viewport = require('viewport');
    var viewer = require('viewer');

    var customElement = require('customElement').create();

    var CREATE_LOCK = false;
    var $ = require('zepto');
    var $html = $('html');

    customElement.prototype.build = function () {
        if (!viewer.isIframed) {
            return;
        }
        if (CREATE_LOCK) {
            console.error('一个页面只允许使用一个 mip-full-height 组件！');
            return;
        }
        CREATE_LOCK = true;
        var that = this;
        this.isAndroid = $html.hasClass('mip-i-android-scroll');
        this.latestScrollHeight = 0;
        viewport.on('resize', function () {
            that.updateViewportHeight();
        });
        this.updateViewportHeight();
        setTimeout(function () {
            viewport.trigger('resize'); // iOS 下第一次不触发 resize。手动触发下
        }, 166);
        setInterval(function () {
            that.updateViewportHeight();
        }, 166);
    };

    customElement.prototype.updateViewportHeight = function () {
        var scrollHeight = viewport.getScrollHeight();
        if (this.isAndroid) {
            scrollHeight = document.body.scrollHeight;
        }
        // console.log(scrollHeight, bodyHeight);
        // scrollHeight = bodyHeight;
        if (scrollHeight !== this.latestScrollHeight) {
            // console.log('高度变动，from=%d, to=%d', this.latestScrollHeight, scrollHeight);
            this.latestScrollHeight = scrollHeight;
            viewer.sendMessage('full-height-update', {
                scrollHeight: scrollHeight
            });
        }
    };

    return customElement;
});
