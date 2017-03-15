define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var global = {
        hideList: function () {
            alert('a')
        },
        init: function (element) {
            this.hideList();
            this.tongJi(element); // 编辑统计
        }
    };
    customElem.prototype.createdCallback = function () {
        var element = this.element;
        global.init(element);
    };
    return customElem;
});