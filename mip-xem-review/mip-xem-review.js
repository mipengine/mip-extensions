/**
* @file 自用获取随机评论组件
* @author mip-support@hzxem.com
* @version 1.0.0
* @copyright 2016 hzxem.com, Inc. All Rights Reserved
*/

define(function (require) {
    var jq = require('jquery');
    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        function getreview() {
            var elem = this.element;
            var yid = elem.getAttribute('yid');
            var listofreadcid = elem.getAttribute('listofreadcid');
            var formhash = elem.getAttribute('formhash');
            var url = elem.getAttribute('url');
            var jqelem = jq(elem);
            jq.post(url, {
                yid: yid,
                listofreadcid: listofreadcid,
                formhash: formhash,
                reviewsubmit: true
            },
            function (data, status) {
                if (data) {
                    jqelem.html(function () {
                        var thiscid = ',' + data.tid;
                        var readcid = listofreadcid;
                        jqelem.data('listofreadcid', readcid + thiscid);
                        return data.message;
                    });
                }
            },
            'json');
        }
        jq(document).ready(function () {
            getreview();
        });
        jq('#nextreview').on('click', function () {
            getreview();
        });
    };
    return customElement;
});
