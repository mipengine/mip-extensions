/**
* 乐樽 mip改造 联盟广告插件
* @file 插入联盟广告
* @author 125664674@qq.com
* @version 1.0.0
*/
define(function (require) {
    var customElement = require('customElement').create();
    customElement.prototype.createdCallback = function () {
        var el = this.element;
        var adtype = el.getAttribute('type');
        var gid = el.getAttribute('gid');
        var idomain = el.getAttribute('idomain');
        var scriptTag1 = document.createElement('script');
        	scriptTag1.src = type+'://'+idomain+'/img/'+gid,
        	scriptTag1.setAttribute('async', 'true');
        	ele.appendChild(scriptTag1);
    };
    return customElement;
});
