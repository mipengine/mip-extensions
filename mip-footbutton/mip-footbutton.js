/**
 * @file mip-footbutton 组件
 * @author 王其征
 */

define(function (require) {

    var customElement = require('customElement').create();
    var $ = require('zepto');

    var log = console.log.bind('log');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var self = this;
        var element = self.element;
        var btn = element.querySelectorAll('.btn');
        var prev;

        for (var i = 0; i < btn.length; i++) {
            (function (arg) {
                btn[i].onclick = function () {
                    var me = this;
                    var hotList = me.querySelector('.hot-list');
                    if (hotList) {
                        if (me.getAttribute('class').indexOf('activeBtn') > -1) {
                            me.className = me.className.replace(' activeBtn', '');
                        } else {
                            if (prev) {
                                prev.className = prev.className.replace(' activeBtn', '');
                            }
                            me.className += ' activeBtn';
                            prev = me;
                        }
                    }
                };
            })(i);
        }
    };

    return customElement;
});
