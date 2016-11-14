
define("mip-changyan", ["require", "zepto", "customElement"], function(t) {
	function n() {
		var e = this.element;
		if(!e.isRender) {
			e.isRender = !0;
			var appid = e.getAttribute("appid"),
			conf = e.getAttribute("conf"),
			a = i(e),
			h = ['<script type="text/javascript">',
			'var _hmt = _hmt || []; (function() {var hm = document.createElement("script"); hm.src = "//changyan.sohu.com/upload/changyan.js?appid='
			+ appid + '&conf=' + conf + '";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();',
			"</script>"];	
			a.append(h.join(""))
		}
	}
	var i = t("zepto"),
	s = t("customElement").create();
	return s.prototype.init = function() {
		this.createdCallback = n
	},s 
});
require(["mip-changyan"], function(t) {
    MIP.registerMipElement("mip-changyan", t);   
});
