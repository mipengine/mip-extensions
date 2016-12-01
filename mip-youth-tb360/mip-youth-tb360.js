/**
 * @file 移动适配页面头部360广告
 * @date 2016.11.23
 * @author jxl
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
    var s = '_' + Math.random().toString(36).slice(2);
    document.write('<div id="' + s + '"></div>');
    (window.slotbydup = window.slotbydup || []).push({
        id: '2893098',
        container: s,
        size: '20,6',
        display: 'inlay-fix'
    });
    var node = document.createElement('script');
    node.setAttribute('type', 'javascript');
    node.setAttribute('src', 'http://dup.baidustatic.com/js/om.js');
    node.setAttribute('ignoreapd', '1');
    document.body.appendChild(node);
});


