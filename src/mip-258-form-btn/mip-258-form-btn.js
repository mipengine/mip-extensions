/**
 * @file mip-ajax-button 组件
 *
 * @author chen
 * @time 2018.8.21
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var zepto = require('zepto');
    /**
     * [build build函数]
     */
    customElement.prototype.build = function () {
        var element = this.element;
        var url = $(element).attr('url');
        var method = $(element).attr('method');

        var button = $(element).find('button');

        var redirect = $(element).attr('redirect');

        // var m_data = JSON.parse( document.querySelector('script[type="application/json"]').textContent.toString());
        var form = $(element).find('form').get(0);

        var formData = new FormData(form);

        button.click(function(){

            fetch(url, {
                    method: method,
                    mode: "cors",
                    body: formData,
            }).then(function(res) {
                res.json().then(function(data){
                        console.log(data)
                    if(data.status == 1)
                    {
                        $(element).find('span.success').text(data.msg).show();
                        // if(redirect){
                        //     window.location.;
                        // }
                        window.location.reload();
                    }else{
                        $(element).find('span.error').text(data.msg).show();
                    }
                });
                    
            }).catch(function(e) {
                    //500;
            });

        });
    };
    return customElement;

});
