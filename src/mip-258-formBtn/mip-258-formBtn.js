
/**
 * @file mip-ajax-button 组件
 *
 * @author chen
 * @time 2018.8.21
 */
define(function (require) {
    var customElement = require('customElement').create();
    var $ = require('zepto');
    customElement.prototype.firstInviewCallback = function () {
        var element = this.element;
        var url = $(element).attr('url');
        var method = $(element).attr('method');
        var button = $(element).find('button');
        var reload = $(element).attr('reload');
        var redirect = $(element).attr('redirect');
        var form = $(element).find('form').get(0);
        var formData = new FormData(form);
        button.click(function () {
            ajaxBox();
        });
        // tijiao
        function ajaxBox() {
            fetch(url, {method: method, mode: 'cors', body: formData}).then(function (res) {
                res.json().then(function (data) {
                    if (data.status === 1) {
                        $(element).find('span.success').text(data.msg).show();
                        if (redirect) {
                            window.top.location.href = redirect;
                        }
                        if (reload === 'true') {
                            window.top.location.reload();
                        }
                    } else {
                        $(element).find('span.error').text(data.msg).show();
                    }
                });
            }).catch(function (e) {
            });
        }
    };
    return customElement;
});
