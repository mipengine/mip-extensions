define(function(require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');

    var customElem = require('customElement').create();

    function setImgOpen(){

        var mipImg = $('mip-diyiyou-sumwidth').find('mip-img');

        var imgLen = mipImg.length;

        $('mip-diyiyou-sumwidth').width(mipImg.eq(0).width() * imgLen);

    }

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、firstInviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        
        setImgOpen();

    };
    return customElem;
});