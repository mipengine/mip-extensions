
/**
 * @file mip-huayi-kst 组件
 * @author VinLexn
 */
define(function (require) {
    var $ = require('jquery');
    var customElem = require('customElement').create();

/**
 * firstInviewCallback.
 */
    customElem.prototype.firstInviewCallback = function () {
        var element = this.element;
        var siteid = element.getAttribute('data-siteid');
        $(function () {
            // 加载幻灯片配置脚本
            initJs('https://ad.11dn.net/index.php?m=Api&c=Js&a=sd&site=' + siteid);
            // 加载快商通|商务通邀请框配置脚本
            initJs('https://ad.11dn.net/index.php?m=Api&c=Js&a=js&site=' + siteid);
        });
    };

/**
 * [initJs JS初始化函数]
 *
 * @param {string} src js url
 *
 * @param {callback} func function callback
 *
 * @return {string} Append Script
 */
    function initJs(src, func) {
        var script = document.createElement('script');
        script.src = src;
        script.charset = 'utf-8';
        script.onreadystatechange = function () {
            if (this.readyState === 'complete') {
                if (typeof func === 'function') {
                    func();
                }
            }
        };
        script.onload = function () {
            if (typeof func === 'function') {
                func();
            }
        };
        document.body.appendChild(script);
        return script;
    }
    return customElem;
});
