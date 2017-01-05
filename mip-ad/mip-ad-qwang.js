/**
 * @file 全网推荐
 *
 * @author fengchuantao@baidu.com, liangjiaying<jennyliang220@github>
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {

    /**
     * 渲染广告
     *
     * @param  {obj} domEle [description]
     * @param  {obj} mipEle [description]
     */
    function render(domEle, mipEle) {
        var cpropsid = domEle.getAttribute('cpro_psid');
        var cpropswidth = domEle.getAttribute('cpro_pswidth') || 'auto';
        var cpropsheight = domEle.getAttribute('cpro_psheight') || '230';
        var scriptHtml = [
                'var cpro_psid ="' + cpropsid + '";',
                'var cpro_pswidth ="' + cpropswidth + '";',
                'var cpro_psheight="' + cpropsheight + '";'
            ].join('');

        var scriptNode = document.createElement('script');
        scriptNode.innerHTML = scriptHtml;

        var node = document.createElement('div');
        node.appendChild(scriptNode);
        domEle.appendChild(node);
        initJs(node, mipEle);
    }

    /**
     * initJs JS初始化函数
     *
     * @param  {dom} node   盛放script的div
     * @param  {Object} mipEle mip元素
     */
    function initJs(node, mipEle) {
        var adScript;
        adScript = addScriptOnce('MIP_ADQW_EMBED', '//su.bdimg.com/static/dspui/js/um_mip.js');

        if (!adScript) {
            return;
        }

        node.appendChild(adScript);
        adScript.onload = function () {
            mipEle.applyFillContent(node, true);
        };
    }

    /**
     * 仅引入一次脚本
     *
     * @param {string} scriptId  广告脚本标识ID
     * @param {string} scriptSrc 广告脚本地址
     * @return {obj} false/scriptElement
     */
    function addScriptOnce(scriptId, scriptSrc) {
        // 短期方案，修复网盟广告加载顺序问题
        // var jsdom = document.getElementById(scriptId);
        // if (jsdom) {
        //     return false;
        // }

        var script = document.createElement('script');
        script.src = scriptSrc;
        script.id = scriptId;
        return script;
    }

    return {
        render: render
    };

});