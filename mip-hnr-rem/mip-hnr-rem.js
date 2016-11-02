define('mip-hnr-rem', ['require', 'customElement'], function(require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        // this.element 可取到当前实例对应的 dom 元素
        console.log($(element).width())
        var ft = ($(element).width() / 320) * 1.25 + 'rem';
        $("html").css("font-size", ft);
    };
    /* 生命周期 function list，根据组件情况选用 end */
    return customElem;
});
require(['mip-hnr-rem'], function (plugindemo) {
    //注册组件,若有 css 才加第三个参数，否则不要第三个参数
    MIP.registerMipElement('mip-hnr-rem', plugindemo);
});