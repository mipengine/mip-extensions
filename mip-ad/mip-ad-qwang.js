/**
 * @file 全网推荐
 *
 * @author fengchuantao@baidu.com, liangjiaying<jennyliang220@github>
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
require.config({
    paths:{
        'mip-psdsp-um': "//su.bdimg.com/static/dspui/js/um_mip"
    }
});

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
        mipEle.applyFillContent(node, true);
        
        require(['mip-psdsp-um'],function(um){

            um.init();
        })
    }

    return {
        render: render
    };

});