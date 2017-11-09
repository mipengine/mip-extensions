/**
 * @file mip-baiyun-map 组件
 * @author unofficial
 * @time 2017-01-17
 */

define(function (require) {
    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
        var ele = this.element;
        initMap(ele);
        window.addEventListener('load', function () {
            var baiyunMap = new BaiyunMap(ele);
            baiyunMap.map();
            // 注册查询方式
            ele.dataset.way && baiyunMap.way();
        });
    };

    /**
     * 插入地图元素至Body末尾
     *
     * @param {html} ele 当前mip-baiyun-map元素
     */
    function initMap(ele) {
        var ak = ele.dataset.ak;
        // add map class
        var headElement = document.getElementsByTagName('body')[0];
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = '//api.map.baidu.com/getscript?v=2.0&ak=' + ak;
        headElement.appendChild(scriptElement);
    }

    /**
     * 地图操作类
     *
     * @param {html} ele 当前mip-baiyun-map元素
     * @class       BaiyunMap
     */
    function BaiyunMap(ele) {
        this.mapElement = ele;
        this.imap;
        this.wayId = 1;
        // 获取需要的要素
        var conElement = this.mapElement.children[1].children[1];
        this.startElement = conElement.children[1].firstElementChild;
        this.endElement = conElement.children[2].firstElementChild;
        this.failElement = conElement.children[0];
        this.resultElement = conElement.children[3];
    }

    /**
     * map init
     */
    BaiyunMap.prototype.map = function () {
        var id = this.mapElement.firstElementChild.id || 'allmap';
        var zoom = this.mapElement.dataset.zoom || 16;
        var x = this.mapElement.dataset.x;
        var y = this.mapElement.dataset.y;

        // 初始化中心点必须存在
        if (!x || !y) {
            return;
        }
        this.imap = new BMap.Map(id);
        var point = new BMap.Point(x, y);
        this.imap.centerAndZoom(point, zoom);
        // 创建标注
        var marker = new BMap.Marker(point);
        this.imap.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    };

    /**
     * what way
     */
    BaiyunMap.prototype.way = function () {
        var self = this;
        this.mapElement.addEventListener('click', function (e) {
            var targetEle = e.target;
            if (targetEle.parentElement.id === 'tip') {
                self.wayId = Number(targetEle.dataset.id);
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
    BaiyunMap.prototype.getRoute = function () {
        // need: way / start / end
        var start = this.startElement.value;
        var end = this.endElement.value;
        if (start && end) {
            this.failElement.className = 'fail';
            this.imap.clearOverlays();
            var options;
            if (this.wayId === 1) {
                options = {
                    renderOptions: {map: this.imap, panel: this.resultElement.id || 'l-result'}
                };
            }
            else if (this.wayId === 2) {
                this.resultElement.innerText = '';
                options = {
                    renderOptions: {map: this.imap},
                    policy: 0
                };
            }
            var transit = new BMap.TransitRoute(this.imap, options);
            transit.search(start, end);
        }
        else {
            this.failElement.className = 'fail show';
            this.failElement.innerText = '起点或终点不能为空';
        }
    };
    return customElement;
});
