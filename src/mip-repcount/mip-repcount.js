/**
 * @file mip-repcount 组件
 * @author svenlee
 * @email 329729652@qq.com 
 */

define(function(require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var cookie = require('./mip-repcount-cookie');
    var common = require('./mip-repcount-commonparams');
    var md5 = require('./mip-repcount-md5');
    var sdk_ver = "v1.0.0";
    /**
     * build 方法，元素插入到文档时执行，仅会执行一次
     */
    customElement.prototype.build = function() {
        var me = this;
        var element = this.element; //console.log(util);

        //获取配置信息
        var script = this.element.querySelector('script[type="application/json"]');
        if (script) {
            var config = JSON.parse(script.textContent); //console
        }
        //获取上报数据
        var commonData = common.init(config['common'] || { title: null }); //公共配置数据 {属性：别名}
        var customData = config['custom'] || false;
        var cookieData = cookie.init(config['cookie']);

        var others = {};
        if (cookie.getMid) {
            others.mid = cookie.getMid(cookie.get('to8tosessionid'));
            others.sdk_ver = sdk_ver;
        }

        var postData = util.fn.extend(true, commonData, customData, cookieData, others);
        me.fetchData({ url: config.reportUrl, data: postData }); //console.log(postData);

        //执行上报

        if (config.isSupportTrack) { //是否开启自定义上报
            MIP.setData = function(action) {
                var obj = {};
                var rule, args = action.arg.split('-');
                var key = args.shift();

                if (config['rules'][key]) {
                    obj['event'] = args[0];
                    obj[key] = args[1];
                    if (cookie.getMid) {
                        obj['mid'] = cookie.getMid(cookie.get('to8tosessionid'));
                    }
                }

                postData = util.fn.extend(true, postData, obj);

                me.fetchData({ url: config.reportUrl, data: postData }); //console.log(postData);
            };

        }
    };

    customElement.prototype.fetchData = function(opts) {
        var data = {};
        var fd = opts.data;
        if (fd.app && fd.app == 'to8to_h5_mip') { // personal
            data.ev = [];
            data.app = fd.app;
            data.apv = fd.apv;
            data.did = fd.cok;
            data.cok = fd.cok;
            data.ov = fd.ov;
            data.rs = fd.rs;
            data.st = fd.st;
            data.sv = fd.sdk_ver;
            data.ust = fd.ust;

            data.sid = fd.sid;

            var eObj = {
                lan: fd.lan,
                mid: fd.mid,
                ct: fd.ct,
                evt: fd.event || "pv",
                ref: fd.ref,
                url: fd.url
            };
            if (eObj.evt != 'pv') {
                eObj.pg = fd.pg || '';
            }
            data.ev.push(eObj);
        } else {
            data = opts.data;
        }
        fetch(opts.url, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(res) {
            return res.text();
        }).then(function(body) {});

    };
    return customElement;
});