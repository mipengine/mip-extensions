/**
 * @file mip-map 组件
 * @author Jackson
 * @mail smartfutureplayer@gmail.com
 */

define(function (require) {
    var customElement = require('customElement').create();
    var MAPURL = 'https://api.map.baidu.com/api?';
    var TYPE = 'script[type="application/json"]';

    /**
     * 地图类
     *
     * @class
     * @param {HTMLElement} element 地图组件元素
     * @param {Object} config 地图参数
     */
    function BaiduMap(element, config) {
        this.config = config;
        this.ele = element;
    }

    /**
     * 展现地图逻辑入口
     *
     */
    BaiduMap.prototype.show = function () {
        this.init();
        this.append();
    };

    /**
     * 初始化地图请求 URL
     *
     */
    BaiduMap.prototype.init = function () {
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
     * @return {string} 回调名称
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
        this.map = new BMap.Map(this.ele);
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
        // 创建地址解析器实例
        var cfg = this.config;
        var loc = cfg.location;
        var address = this.traverseAndConcat(loc);
        if (address && loc.city) {
            this.handlePoint();
        }
    };

    /**
     * 处理定位的函数
     *
     */
    BaiduMap.prototype.handlePoint = function () {
        var self = this;
        var map = self.map;
        var cfg = self.config;
        var loc = cfg.location;
        var myGeo = new BMap.Geocoder();
        var address = self.traverseAndConcat(cfg.location);
        if (!address) {
            return;
        }
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        var options = {
            onSearchComplete: function(results){
                if (local.getStatus() !== BMAP_STATUS_SUCCESS) {
                    return;
                }
                var firstResult = results.getPoi(0);
                var point = firstResult.point;
                if (!firstResult || !point) {
                    return;
                }
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
                map.centerAndZoom(point, 16);
                self.handleSyncOption({
                    cfg: cfg,
                    map: map,
                    point: point,
                    marker: marker
                });
            }
         };
        var local = new BMap.LocalSearch(map, options);
        local.search(address);

    };

    /**
     * 处理地图里同步的方法
     *
     * @param {Object} opt 配置地图的参数
     */
    BaiduMap.prototype.handleSyncOption = function (opt) {
        this.handleInfoWindow(opt);
        this.handleControls(opt);
    };

    /**
     * 处理地图中控件
     *
     * @param {Object} opt 配置地图的参数
     */
    BaiduMap.prototype.handleControls = function (opt) {
        var cts = this.config.controls;
        for (var key in cts) {
            if (cts.hasOwnProperty(key)) {
                var params = cts[key] || {};
                var Fn = BMap[key];
                Fn && opt.map.addControl(new Fn(params));
            }
        }
    };

    /**
     * 处理地图上 marker 点击弹层
     *
     * @param {Object} opt 配置地图的参数
     */
    BaiduMap.prototype.handleInfoWindow = function (opt) {
        var info = opt.cfg.info;
        if (!info) {
            return;
        }
        var infoWindow = new BMap.InfoWindow(info.content, info);
        opt.marker.addEventListener('click', function () {
            opt.map.openInfoWindow(infoWindow, opt.point);
        });
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
    BaiduMap.prototype.append = function () {
        if (!this.config.ak) {
            console.error('请配置服务密钥（ak）');
            return;
        }
        var ele = document.createElement('script');
        ele.src = this.mapUrl;
        document.body.appendChild(ele);
    };

    /**
     * JSON 解析，如果出错则在浏览器中进行提示
     *
     * @param {Object} json 地图参数回调还名称
     * @return {Object|boolean}  解析成功返回 JSON 数据，否则返回 false
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
        var ele = this.element.querySelector(TYPE);
        var cfg = this.jsonParse(ele.textContent);
        cfg && new BaiduMap(this.element, cfg).show();
    };

    return customElement;
});
