/**
 * @file 页面逻辑公共脚本
 * @description 实时新增优化
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var global = {
        hideList: function (obj, option, nub) {
            $(a).each(function () {
                if ($(this).find(b).length < c) {
                    $(this).remove();
                }
            });
        },
        init: function () {
            this.hideList('.hidelist', 'li', 1);// 优化隐藏
        }
    };
    customElem.prototype.build = function () {
        global.init();
    };
    return customElem;
});
