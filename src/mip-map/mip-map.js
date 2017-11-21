/**
 * @file mip-map 组件
 * @author Jackson
 * @mail smartfutureplayer@gmail.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var MAPURL = 'http://api.map.baidu.com/api?';

    /**
     * 地图类
     *
     * @class
     * @param {Object} config 地图参数
     */
    function BaiduMap(config) {
        this.config = config;
    }

    /**
     * 展现地图逻辑入口
     *
     */
    BaiduMap.prototype.show = function () {
        this.initUrl();
        this.appendMapEle();
    };

    /**
     * 初始化地图请求 URL
     *
     */
    BaiduMap.prototype.initUrl = function () {
        var cf = this.config;
        var pArray = [];
        var pObj = {
            v: cf.version || '2.0',
            ak: cf.ak || '',
            t: new Date().getTime(),
            callback: this.getCb()
        };
        for (var key in pObj) {
            if (pObj.hasOwnProperty(key)) {
                pArray.push(key.concat('=', pObj[key]));
            }
        }
        this.mapUrl = MAPURL + pArray.join('&');
    };

    /**
     * 绑定全局 callback 函数，并返回回调名称
     *
     */
    BaiduMap.prototype.getCb = function () {
        window.mapCallback = this.handleResult.bind(this);
        return 'mapCallback';
    };

    /**
     * 处理请求返回后的结果，之后扩展逻辑均在该方法中实现
     *
     */
    BaiduMap.prototype.handleResult = function () {
        /* global BMap */
        var map = new BMap.Map('container');
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        var loc = this.config.location;
        var address = this.traverseAndConcat(this.config.location);
        if (address && loc.city) {
            // 将地址解析结果显示在地图上，并调整地图视野
            myGeo.getPoint(loc, function (point) {
                if (point) {
                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                }
            }, this.config.location.city);
        }
    };

    /**
     * 遍历对象，并将内容了解起来
     *
     * @class
     * @param {Object} obj 需要处理的对象
     */
    BaiduMap.prototype.traverseAndConcat = function (obj) {
        var output = '';
        for (var key in obj) {
            if (!obj.hasOwnProperty(key) || !obj[key]) {
                continue;
            }
            output += obj[key];
        }
        return output;
    };

    /**
     * 将地图脚本插入到页面中
     *
     */
    BaiduMap.prototype.appendMapEle = function () {
        var ele = document.createElement('script');
        ele.src = this.mapUrl;
        document.body.appendChild(ele);
    };

    /**
     * JSON 解析，如果出错则在浏览器中进行提示
     *
     * @class
     * @param {Object} config 地图参数
     */
    customElement.prototype.jsonParse = function (json) {
        try {
            return JSON.parse(json);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };

    /**
     * 首次进入页面之后加载地图组件
     *
     */
    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element.querySelector('script[type="application/json"]');
        var config = this.jsonParse(ele.textContent);
        if (!config) {
            return;
        }
        new BaiduMap(config).show();
    };

    return customElement;
});
