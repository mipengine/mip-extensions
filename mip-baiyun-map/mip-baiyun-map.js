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
	customElement.prototype.build = function () {
		this.reqMap();
		var _this = this;
		window.addEventListener('load', function() {
			_this.map();
		})
		// 注册查询方式
		mapElement.dataset['way'] && this.way();
	};

	/*
	 * 插入地图元素至Body末尾
	 */
	customElement.prototype.reqMap = function () {
		var ak = mapElement.dataset['ak'];
		// add map class
		var headElement = document.getElementsByTagName('body')[0];
		var scriptElement = document.createElement('script');
		scriptElement.type = 'text/javascript';
		scriptElement.src = 'http://api.map.baidu.com/getscript?v=2.0&ak='+ak;
		headElement.appendChild(scriptElement);
	};

	/*
	 * map init
	 */
	customElement.prototype.map = function() {
		var id = mapElement.firstChild.id || 'allmap';
		var zoom = mapElement.dataset['zoom'] || 16;
		var x = mapElement.dataset['x'];
		var y = mapElement.dataset['y'];

		// 初始化中心点必须存在
		if(!x || !y) {
			return;
		}
		map = new BMap.Map(id);
		var point = new BMap.Point(x, y);
		map.centerAndZoom(point, zoom);
		// 创建标注
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		marker.setAnimation(BMAP_ANIMATION_BOUNCE);
	}

	/*
	 * what way
	 */
	customElement.prototype.way = function() {
		var _this = this;
		mapElement.addEventListener('click', function(e) {
			var _target = e.target;
			if(_target.parentElement.id == 'tip') {
				way = _target.dataset['id'];
				// 选中
				var butArr = [].slice.call(_target.parentElement.children);
				butArr.forEach(function(e) {
					e.className = '';
				})
				_target.className = 'cur';
			} else if(_target.parentElement.id == 'con') {
				_this.getRoute();
			}
		})
	}

	/*
	 * get route way
	 */
	customElement.prototype.getRoute = function() {
		// need: way / start / end
		var start = startElement.value;
		var end = endElement.value;

		if(start && end) {
			failElement.className = 'fail';
			map.clearOverlays();
			if(way == 1) {
				var options = {
					renderOptions: {map: map, panel: "l-result"}
				};
			} else if(way == 2) {
				resultElement.innerText = '';
				var options = {
					renderOptions: {map: map},
					policy: 0
				};
			}
			var transit = new BMap.TransitRoute(map, options);
			transit.search(start, end);
		} else {
			failElement.className = 'fail show';
			failElement.innerText = '起点或终点不能为空';
		}
	}
	return customElement;
});
