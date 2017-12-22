/**
 * @file mip-zhaopin-tracker 组件
 * @author shawn
 */
define(function(require) {

	var customElement = require('customElement').create();
	customElement.prototype.build = function () {
		(function (a, e, f, g, b, c, d) {
            a.ZhaoPinBigdataAnalyticsObject = b;
            a[b] = a[b] || function () {
                    (a[b].q = a[b].q || []).push(arguments)
                };
            a[b].l = 1 * new Date;
            a._ATAD_GIB_NIPOAHZ_ || (c = e.createElement(f), d = e.getElementsByTagName(f)[0],
                c.async = 1, c.src = g, d.parentNode.insertBefore(c, d), a._ATAD_GIB_NIPOAHZ_ = !0)
        })(window, document, "script", document.location.protocol+
        "//statistic.zhaopin.cn/sdk/zhaopin_tracker.js", "za");
        za("creat", "MIP");
        var basic = {
        	uid: '',
        	pagecode: 'tracker_test',
        	wdgtid: '',
        	evtid: 'bought',
        	chnlname: ''
    	};
    	var props = {
        	itemid:'ddd',
        	sum:'88',
        	paymode:'dd',
        	cntsrn: {
        	c001: "1_31",
        	c003: "3_34",
        	},
        	exppageid: 2,
        	rcm: {
            	"cntsrn": {
            	c001: "1_31",
            	c003: "3_34",
        	},
        	"rcmid": "rcm_007"
        	}
    	};
    	za('track', basic, props,function(){
            	console.log('hello')
        	});
	}
	return customElement;
});
