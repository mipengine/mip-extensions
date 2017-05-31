/**
 * @file mip-cloud-tie 组件
 * @author
 */
define(function(e) {
	var i = e("customElement").create();
	return i.prototype.createdCallback = function() {
	var i = this.element,
			s = i.getAttribute("sourceId"),
			p = i.getAttribute("productKey"),
			t = i.getAttribute("target")||"cloud-tie-wrapper",
			a = document.createElement("script");
	a.src = "https://img1.cache.netease.com/f2e/tie/yun/sdk/loader.js";
	r = ['var cloudTieConfig ={url:"' + document.location.href + '",', 'sourceId:"' + s + '",', 'productKey:"' + p + '",','target:"'+t+'"};'].join(""),
	d = document.createElement("script");
	d.innerHTML = r;
	i.appendChild(d),i.appendChild(a)
	}
});
