/**
 * @file mip-baiyun-map 组件
 * @author unofficial
 * @time 2017-01-17
 */

define(function (require) {
    var customElement = require('customElement').create();
    var mapElement = document.getElementsByTagName('mip-baiyun-map')[0];
    var startElement = document.getElementById('l-start');
    var endElement = document.getElementById('l-end');
    var failElement = document.getElementById('l-fail');
    var resultElement = document.getElementById('l-result');
    var map;
    var way = 1; // 默认为第一种 公交;

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
        this.reqMap();
        var self = this;
        window.addEventListener('load', function () {
            self.map();
        });
        // 注册查询方式
        mapElement.dataset.way && this.way();
    };

    /**
     * 插入地图元素至Body末尾
     */
    customElement.prototype.reqMap = function () {
        var ak = mapElement.dataset.ak;
        // add map class
        var headElement = document.getElementsByTagName('body')[0];
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = 'http://api.map.baidu.com/getscript?v=2.0&ak=' + ak;
        headElement.appendChild(scriptElement);
    };

    /**
     * map init
     */
    customElement.prototype.map = function () {
        var id = mapElement.firstChild.id || 'allmap';
        var zoom = mapElement.dataset.zoom || 16;
        var x = mapElement.dataset.x;
        var y = mapElement.dataset.y;

        // 初始化中心点必须存在
        if (!x || !y) {
            return;
        }
        map = new BMap.Map(id);
        var point = new BMap.Point(x, y);
        map.centerAndZoom(point, zoom);
        // 创建标注
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    };

    /**
     * what way
     */
    customElement.prototype.way = function () {
        var self = this;
        mapElement.addEventListener('click', function (e) {
            var targetEle = e.target;
            if (targetEle.parentElement.id === 'tip') {
                way = targetEle.dataset.id;
                // 选中
                var butArr = [].slice.call(targetEle.parentElement.children);
                butArr.forEach(function (e) {
                    e.className = '';
                });
                targetEle.className = 'cur';
            }
            else if (targetEle.parentElement.id === 'con') {
                self.getRoute();
            }
        });
    };

    /**
     * get route way
     */
    customElement.prototype.getRoute = function () {
        // need: way / start / end
        var start = startElement.value;
        var end = endElement.value;

        if (start && end) {
            failElement.className = 'fail';
            map.clearOverlays();
            var options;
            if (way === 1) {
                options = {
                    renderOptions: {map: map, panel: 'l-result'}
                };
            }
            else if (way === 2) {
                resultElement.innerText = '';
                options = {
                    renderOptions: {map: map},
                    policy: 0
                };
            }
            var transit = new BMap.TransitRoute(map, options);
            transit.search(start, end);
        }
        else {
            failElement.className = 'fail show';
            failElement.innerText = '起点或终点不能为空';
        }
    };
    return customElement;
});
