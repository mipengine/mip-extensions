/**
 * @file mip-custom/log
 * @author pearl
 */
define(function (require) {

    /**
     * [getXPath 获取 xpath 数组]
     *
     * @param  {DOM}   node [点击节点]
     * @param  {DOM}   wrap [容器]
     * @param  {Array} path [结果数组]
     * @return {Array}      [结果数组]
     */
    function getXPath(node, wrap, path) {
        path = path || [];
        wrap = wrap || document;
        if (node === wrap || !node || !wrap) {
            return path;
        }
        if (node.parentNode !== wrap) {
            path = getXPath(node.parentNode, wrap, path);
        }
        var count = 1;
        var sibling = node.previousSibling;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling.nodeName === node.nodeName) {
                count++;
            }
            sibling = sibling.previousSibling;
        }
        if (node.nodeType === 1) {
            path.push(node.nodeName.toLowerCase() + (count > 1 ? count : ''));
        }
        return path;
    }
    return {
        getXPath: getXPath
    };

});
