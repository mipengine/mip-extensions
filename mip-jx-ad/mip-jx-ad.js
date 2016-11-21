/**
 * @file 第三方广告
 *
 * @author jxl
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (require) {
        var appendtxt = $('<a style="display:none!important" id="tanx-a-mm_34618856_4222645_14288433"></a>');
        $(document.body).append(appendtxt);
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = 'http://p.tanx.com/ex?i=mm_34618856_4222645_14288433';
        node.async = 'true';
        node.id = 'tanx-s-mm_34618856_4222645_14288433';
        var tanxh = document.getElementsByTagName('head')[0];
        if (tanxh) {
            tanxh.insertBefore(node, tanxh.firstChild);
        }
    });
