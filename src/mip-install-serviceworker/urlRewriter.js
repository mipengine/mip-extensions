/**
 * @file url rewriter class
 * @author mj(zoumiaojiang@gmail.com)
 */

define(function (require) {

    var util = require('./util');
    var mipUtil = require('util');

    /**
     * UrlRewriter 构造函数
     *
     * @param {Object} viewer mip 的文档对象
     * @param {RegExp} urlMatchExpr urlMatch RegExp
     * @param {string} shellUrl shell url
     * @class
     */
    function UrlRewriter(viewer, urlMatchExpr, shellUrl) {
        var me = this;
        this.urlMatchExpr = urlMatchExpr;
        this.shellUrl = shellUrl;
        this.shellLoc = util.parseUrl(shellUrl);

        mipUtil.event.delegate(document, 'a', 'click', function (event) {
            handle.call(me, event);
        });
    }

    /**
     * 绑定事件
     *
     * @param {Event} event event
     * @private
     */
    function handle(event) {

        var target = event.target;

        if (!target || target.tagName !== 'A' || !target.href) {
            return;
        }

        var tgtLoc = util.parseUrl(target.href);

        if (tgtLoc.origin === this.shellLoc.origin
            && tgtLoc.pathname !== this.shellLoc.pathname
            && this.urlMatchExpr.test(tgtLoc.href)
        ) {
            if (target.getAttribute('i-miphtml-orig-href')) {
                return;
            }

            if (util.removeFragment(tgtLoc.href) === util.removeFragment(window.location.href)) {
                return;
            }

            target.setAttribute('i-miphtml-orig-href', target.href);
            target.href = this.shellUrl + '#href=' + encodeURIComponent(tgtLoc.pathname + tgtLoc.search + tgtLoc.hash);
        }
    }

    return UrlRewriter;
});
