/**
* @file 自用获取随机评论组件
* @author mip-support@hzxem.com
* @version 1.0.2
* @copyright 2016 hzxem.com, Inc. All Rights Reserved
*/

define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var elem = this.element;
        var yid = elem.getAttribute('yid');
        var formhash = elem.getAttribute('formhash');
        var url = elem.getAttribute('url');
        var $elem = $(elem);
        var $btn = $('.nextreview');
        function getreview() {
            $btn.button('loading');
            $.post(url, {
                yid: yid,
                listofreadcid: elem.getAttribute('listofreadcid'),
                formhash: formhash,
                reviewsubmit: true
            },
            function (data, status) {
                if (data) {
                    $elem.html(function () {
                        var thiscid = ',' + data.tid;
                        var readcid = elem.getAttribute('listofreadcid');
                        $elem.data('listofreadcid', readcid + thiscid);
                        $btn.button('reset');
                        return data.message;
                    });
                }
            },
            'json');
        }
        $(document).ready(function () {
            getreview();
        });
        $btn.on('click', function () {
            getreview();
        });
    };
    return customElement;
});
