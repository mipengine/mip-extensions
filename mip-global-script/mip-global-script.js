/**
 * @file 页面逻辑公共脚本
 * @description 实时新增优化
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var global = {
        hideList: function (a, b, c) {
            $(a).each(function () {
                if ($(this).find(b).length < c) {
                    $(this).remove();
                }
            });
        },
        init: function () {
            this.hideList('.hidelist', 'li', 1);// 优化隐藏
        }
    }; // 生命周期 function list，根据组件情况选用 end
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        // var element = this.element;
        global.init();
    };
    return customElem;
});