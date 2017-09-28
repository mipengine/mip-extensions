/**
 * @file 页面逻辑公共脚本
 * @description 实时新增优化
 * @author Zhou
*/
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var global = {
        hideList: function (obj, option, nub) {
            $(obj).each(function () {
                if ($(this).find(option).length < nub) {
                    $(this).remove();
                }

            });
        },
        tongJi: function () {
            var webDatetime = $('#down-href').attr('dateTime');
            var webUsername = $('#down-href').attr('username');
            try{//从模板页获取编辑统计token的json数据
                var bjjson = document.querySelector('script[type="application/json"]');
                var bjdata = JSON.parse(bjjson.textContent.toString().replace(/[\s\b\t]/g, ''));
            }
            catch(e){
                console.log(e);
            }
            if (typeof webDatetime !== 'undefined' && webUsername !== '' && bjdata) {
                var hmToken = '';
                if(bjdata[0][webUsername]){
                    if(bjdata[0][webUsername].xtime){
                        var date1 = new Date(bjdata[0][webUsername].xtime);
                        var date2 = new Date(webDatetime);
                        if (date1.getTime() < date2.getTime()) {
                            hmToken = bjdata[0][webUsername].hmToken;
                        }
                    }else{
                        hmToken = bjdata[0][webUsername].hmToken;
                    }
                }    
                if (hmToken !== '') {
                    $('body').append('<mip-stats-baidu token="' + hmToken + '">');
                }
            }

        },
        init: function () {
            this.hideList('.hidelist', 'li', 1); // 优化隐藏
            this.tongJi(); // 编辑统计
        }
    };
    customElem.prototype.build = function () {
        global.init();
    };
    return customElem;
});
