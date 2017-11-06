/**
 * @file mip-jt-ams 组件
 * @author jt
 */

define(function (require) {
    var $ = require('jquery');
    function re(js){
        var node = document.createElement('script');
        node.setAttribute('src', js);
        document.body.appendChild(node);
    }
    re('https://res.cngoldres.com/libs/jtams/1.0.0/jtams.js');
});
