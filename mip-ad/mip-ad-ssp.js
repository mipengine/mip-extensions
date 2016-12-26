/**
 * @file ssp 内容联盟广告
 *
 * @author liangjiaying(jennyliang@github)
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function (require) {

    /**
     * 渲染ssp 配置dom
     *
     * @param  {dom} dom     custumElement的dom,此处为<mip-ad>
     * @param  {element} me    mip-element
     */
    function render(dom, me) {
        var siteId = dom.dataset.siteId;
        var blockId = dom.dataset.blockId;

        var sspDiv = document.createElement('div');
        sspDiv.classList.add('cpu-feeds-block');
        sspDiv.dataset.siteId = siteId;
        sspDiv.dataset.blockId = blockId;
        dom.appendChild(sspDiv);

        var sspScript = document.createElement('script');
        sspScript.innerText = '(function(){var c="//cpu.baidu.com";'
            + 'var a=function(){var e=document.createElement("script");e.id="cpu-block-entry";'
            + 'e.src=c+"/js/cb.js";document.head.appendChild(e)};'
            + 'var b=function(g){var h={msg:g.toString()||"no err msg",line:g.lineno||-1};'
            + 'var f=document.createElement("img");f.src=c+"/msg?m=block&e="+'
            + 'encodeURIComponent(JSON.stringify(h))};'
            + 'try{window.feedsbycpu=window.feedsbycpu||[];'
            + 'window.feedsbycpu.push({siteId:"' + siteId
            + '",blockId:"' + blockId + '",display:"auto"});'
            + 'document.getElementById("cpu-block-entry")||a()}catch(d){b(d)}})();';
        dom.appendChild(sspScript);
    }
    return {
        render: render
    };
});
