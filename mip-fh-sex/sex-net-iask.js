/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 18:16
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var $ = require('zepto');
    var moudule = {};

    moudule.config = {
        url: 'http://api.fh21.com.cn/index.php?callback=?',
        data: {
            m: 'iask',
            c: 'index',
            a: 'GetWapiaskList',
            jid: '1400'
        }
    };

    moudule.get = function () {
        var config = this.config;
        var url = config.url;
        var data = config.data;
        var jid = data.jid;

        $.getJSON(url, data, function (res) {
            $('#iask_js_list_' + jid).html(res);
        });
    };

    return moudule;
});
