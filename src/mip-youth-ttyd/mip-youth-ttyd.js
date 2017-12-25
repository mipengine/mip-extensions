/**
 * @file 移动适配页面的相关推荐
 * @date 2016.11.23
 * @author jxl
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function (require) {
    var node = document.createElement('script');
    node.setAttribute('src', 'http://3g.youth.cn/images/youth.min.js');
    node.setAttribute('ignoreapd', '1');
    document.body.appendChild(node);
    (window.readsByToutiao = window.readsByToutiao || []).push({id: 'toutiao_container', num: 6});
});
