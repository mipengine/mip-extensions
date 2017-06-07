/**
 * @file 春雨医患对话 audio
 * @author 17leba@gmail.com
 * @time 2017.6.7
 */

define(function(require) {
	var $ = require('zepto');
	var customElement = require('customElement').create();

	function Audio(options) {
		this.url = options.url;
		this.layout = options.layout;
		this.domClass = options.domClass;
	}

	Audio.prototype = {
		init: function() {
			var $layout = $(this.layout)
			var audiodom = this.createDom();

			$(this.layout).append(audiodom);
			this.audio = $layout.find('audio')[0];

			this.getTimelen();
			this.playAudio();
			this.endAudio();
		},
		createDom: function() {
			var html =
				"<div class='mip-cy-audio " + this.domClass + "'>" +
				"<div class='mip-cy-audio-icon'>" +
				"<div class='small'></div>" +
				"<div class='middle stopanimate'></div>" +
				"<div class='large stopanimate'></div>" +
				"</div>" +
				"<audio src=" + this.url + ">" +
				"</div>" +
				"<span class='mip-cy-audio-seconds'><span>3</span>''</span>";
			return html;
		},
		getTimelen: function() {
			var that = this;
			var $layout = $(this.layout);
			$(this.audio).on("canplay", function() {
				that.duration = parseInt(that.audio.duration);
				that.renderEleLen($layout, that.duration);
				$layout.find(".mip-cy-audio-seconds span").html(that.duration);
			});

			$(this.audio).on("timeupdate", function() {
				that.duration = parseInt(that.audio.duration);
				that.renderEleLen($layout, that.duration);
				$layout.find(".mip-cy-audio-seconds span").html(that.duration);
			});

		},
		renderEleLen: function($target, seconds){
			var $dom = $target.find(".mip-cy-audio");
			if(seconds > 10){
				// 大于60s，直接固定宽度 2.14rem
				$dom.css({
					"width": "2.14rem"
				})
			}else{
				$dom.css({
					"width": Math.ceil(seconds*2.14/60)+"rem"
				})
			}
		},
		playAudio: function() {
			var $layout = $(this.layout);
			var that = this;
			$layout.on("click", ".mip-cy-audio", function() {
				if (that.audio.paused) {
					that.audio.play();
					$layout.find(".mip-cy-audio-icon").addClass("animate");
				} else {
					that.audio.pause();
					$layout.find(".mip-cy-audio-icon").removeClass("animate");
				}
			})
		},
		endAudio: function() {
			var $layout = $(this.layout);
			$(this.audio).on("ended", function() {
				$layout.find(".mip-cy-audio-icon").removeClass("animate");
			})
		}
	}

	customElement.prototype.build = function() {
		var element = this.element;
		var url = element.getAttribute("src") || "";
		var domClass = element.getAttribute("class") || "left";
		if (url == '') {
			return;
		}
		var newauido = new Audio({
			"url": url,
			"layout": element,
			"domClass": domClass
		})
		newauido.init();
	}
	return customElement;
});