/**
 * @file mip-trilobite-download 组件
 * @author duchenjun@baidu.com
 */

define(function (require) {
	var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {

    	var el = this.element;
        var myScript = document.createElement('script');
        myScript.type = 'text/javascript';
        myScript.src = 'http://s.bdstatic.com/common/openjs/aio.js?v=201602';
        $('.mip-download-btn').after(myScript);

        var appinfo = JSON.parse(el.getAttribute('appinfo'));;
        var downloadurl = el.getAttribute('downloadurl');

        var download = {
	        init: function () {
	            this.bindEvent();
	            this.downloadBtnHide();
	        },
	        bindEvent: function () {
	            var self = this;
	            $('.mip-download-btn').bind('click', '', function () {
	                self.systemToJudge();
	            });
	        },
	        downloadBtnHide: function () {
	            if (Box.isIOS && !appinfo.iosUrl) {
	                $('.mip-download-btn').hide();
	            }
	        },
	        systemToJudge: function () {
	            if(Box.isIOS){
	                if (appinfo.iosUrl) {
	                    window.location = appinfo.iosUrl;
	                } else {
	                    $('.mip-download-btn').hide();
	                }
	            } else {
	                if (Box.isBox) {
	                    var invokeapp = '#Intent;action=com.baidu.appsearch.extinvoker.LITELAUNCH;'
	                    + 'S.tjindirect=ala=wise-app@strong@'
	                    + appinfo.sname + '@buttonR@followup;B.needextratj=true;S.tjlanding=ala=wise-app@strong@'
	                    + appinfo.sname + '@buttonR@landing@738143;S.id=ala.com.baidu.searchbox;S.backop=0;'
	                    + 'S.pkg=' + appinfo.package + ';'
	                    + 'S.quitop=1;S.activefrom=alading;S.func=10;B.download_immediatly=true;i.download_mode=1;end';
	                    var options = {
	                        'package_name': 'com.baidu.appsearch',
	                        'method_name': 'plugin_appsearch_invoker',
	                        'params': JSON.stringify({intent: invokeapp}),
	                        'by_user': 1,
	                        'use_new_window': 2,
	                        'need_baidu_params': 0,
	                        'website_url': downloadurl,
	                        'app_id': '',
	                        'from': 'web:nav',
	                        'log_url': 'http://m.baidu.com/tc',
	                        'log_header': [
	                        ],
	                        'url_frame_code': 1,
	                        'app_is_vip': 0
	                    };
	                    var optionsStr = JSON.stringify(options);
	                    Box.android.invokeApp('Bdbox_android_plugin', 'invokePlugin', optionsStr);
	                   // Box.android.invokeApp('Bdbox_android_send_intent', 'send',[invokeapp, window.callback]);

	                } else {
	                    window.location = downloadurl;
	                }
	            }
	        }
		};

		myScript.onload = function() {
        	download.init();
        }
		
    };

    return customElement;
});
