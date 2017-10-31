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

    /**
     * [getXPath 获取 xpath 数组]
     *
     * @param  {string}   API_URL [日志接收host]
     * @param  {Object}   logdata [参数对象]
     */
    function sendLog(API_URL, logdata) {
        if (!API_URL) {
            return;
        }
        var data = logdata || {};

        var url = API_URL;

        var parasArr = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                parasArr.push(key + '=' + data[key]);
            }
        }
        if (url.indexOf('?') === -1) {
            url += '?';
        }
        else {
            url += '&';
        }

        url += parasArr.join('&');
        data.t = +new Date();
        var k = 'MIP_CUSTOM_LOG_' + data.t;
        var img = window[k] = new Image();
        img.onload = img.onerror = img.onabort = function () {
            img.onload = img.onerror = img.onabort = null;
            img = null;
            window[k] = null;
        };
        img.src = url;
    }

    return {
        getXPath: getXPath,
        sendLog: sendLog
    };

});
