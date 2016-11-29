/**
 * @file 回顶gototop
 *
 * @author wangpei07
 * @date 2016-11-29
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    var util = require('util');
    const YOFFSET = 200;

    /**
     * [showGoTop 是否显示回顶按钮]
     *
     * @param  {[type]} element   [回顶按钮对象]
     * @param  {[type]} scrollTop [滚动条位置]
     * @param  {[type]} threshold [按钮显示时，页面滚出可视区的阈值]
     */
    function showGoTop(element, scrollTop, threshold) {
        if (scrollTop > threshold) {
            util.css(element, {opacity: 1});
        }
        else {
            util.css(element, {opacity: 0});
        }
    }

    /**
     * build 组件build
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var threshold = element.getAttribute('threshold') || YOFFSET;

        // iframe 下的 gototop 策略
        if (window.parent !== window) {

            var firstChild = document.getElementsByTagName('body')[0].firstElementChild;
            element.addEventListener('touchend', function () {
                firstChild.scrollIntoView();
            }, false);

            // ios 监听不到window滚动，安卓监听不到body的滚动，OMG!!!
            if (util.platform.isIos()) {
                $(document.body).scroll(function (event) {
                    showGoTop(element, -1 * firstChild.getBoundingClientRect().top, threshold);
                });
            }
            else {
                $(window).scroll(function () {
                    showGoTop(element, -1 * firstChild.getBoundingClientRect().top, threshold);
                });
            }
        }

        // 非 iframe 下的策略
        else {

            // 页面刷新的情况
            showGoTop(element, window.pageYOffset, threshold);

            // 监听window滚动
            $(window).scroll(function (event) {
                showGoTop(element, window.pageYOffset, threshold);
            });

            // gototop 点击事件
            element.addEventListener('click', function () {
                window.scrollTo(0, 0);
            }, false);
        }

    };

    return customElement;

});
