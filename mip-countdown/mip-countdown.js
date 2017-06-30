/**
 * @file mip-countdown 组件
 * @author lilangbo@baidu.com
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
    	console.log(1);
    	var element = this.element;
    	var endTime = element.getAttribute('endTime')*1000;
    	var startTime = element.getAttribute('startTime')*1000;
    	var duration = element.getAttribute('duration')*1000;
    	var currentDate  = new Date().getTime();
    	// 参数错误
    	if (!endTime && !duration) {
    		 element.parentNode.removeChild(element);
    	}
    	// 倒计时已结束
    	else if (endTime < currentDate && endTime > 0) {
    		var end = element.querySelector('.mip-countdown-end')[0];
    		if (end) {
    			util.css(end, 'display', '');
    		}
    	}
    	// 倒计时还未开始
    	else if (!duration && startTime > currentDate) {
    		var notStart = element.querySelector('.mip-countdown-not-start');
    		if (notStart) {
    			util.css(notStart, 'display', '');
    		}
    	}
    	// duration 优先级高，重写endTime的值，并且将 startTime 置为null。
    	else {
    		if (duration > 0) {
    			endTime = currentDate + duration;
    			startTime = null;
    		}
    		var running = element.querySelector('.mip-countdown-running');
    		if (running) {
    			util.css(running, 'display', 'block');
    			running.classList.add('mip-countdown-running-active');
    		}
    		var days; // 天数
	        var hours; // 小时数
	        var minutes; // 分钟数
	        var seconds; // 秒数
	        var countdown = document.getElementById("mip-countdown-tiles"); // get tag element

			getCountdown();

			var setInt = setInterval(function () { getCountdown(); }, 1000);

			function getCountdown(){
				var now = new Date().getTime();

				// find the amount of "seconds" between now and target
				var seconds_left = (endTime - now) / 1000;
				if (seconds_left < 0) {
					clearInterval(setInt);
					return;
				}

				days = pad( parseInt(seconds_left / 86400) );
				seconds_left = seconds_left % 86400;
				 
				hours = pad( parseInt(seconds_left / 3600) );
				seconds_left = seconds_left % 3600;
				  
				minutes = pad( parseInt(seconds_left / 60) );
				seconds = pad( parseInt( seconds_left % 60 ) );

				// format countdown string + set tag value
				countdown.innerHTML = "<span>" + days + "</span><span>" + hours + "</span><span>" + minutes + "</span><span>" + seconds + "</span>"; 
			}

			function pad(n) {
				return (n < 10 ? '0' : '') + n;
			}
    	}
    };
    return customElement;
});
