define(function (t) {
    function e(t, e) {
        o.ajax({
            url: p + t,
            type: "get",
            dataType: "jsonp",
            async: !1,
            success: function (t) {
                t.length > 1 && (t = n(t)), e(t)
            }
        })
    }

    function n(t) {
        if (t.length > 1) {
            var e = t[0],
                n = t[t.length - 1],
                i = {},
                a = [];
            for (var o in e) "showurl" !== o ? i[o] = n[o] || e[o] : (e[o] && n[o] && a.push(e[o], n[o]), i[o] = a)
        } else i = t[0];
        return i
    }

    function i() {
        var t = o("<style mip-extension='mip-sg-ad'>mip-sg-ad>a{position:relative;display:block}mip-sg-ad .gg_adbox_tips{position:absolute;left:0;bottom:0;display:block;width:3pc;height:18px}mip-sg-ad button{position:absolute;right:0;bottom:0;background:#000;color:#fff;cursor:pointer;font-size:9pt;font-style:inherit;padding:2px 10px;border:none}</style>");
        o("head").prepend(t)
    }

    function a(t) {
        o.ajax({
            url: t,
            type: "get",
            data: {
                t: s
            }
        })
    }
    var o = t("zepto"),
        r = t("customElement").create(),
        p = "http://gg.stargame.com/ad.ashx?pid=",
        s = (new Date).valueOf();
    return r.prototype.build = function () {
        var t = o(this.element),
            n = t.attr("sg-ad-pid");
        e(n, function (e) {
            var n = o("<mip-img></mip-img>"),
                r = o("<mip-img></mip-img>"),
                p = o("<button>关闭</button>"),
                s = o("<a></a>");
            n.attr("class", "gg_adbox").attr("src", e.box), r.attr("class", "gg_adbox_tips").attr("src", "http://gg.stargame.com/images/mark.png"), s.append(n), s.append(r), s.append(p);
            var g = navigator.userAgent;
            if (g.indexOf("Android") > -1 || g.indexOf("Linux") > -1 ? s.attr("href", e.hiturl).appendTo(t) : g.indexOf("iPhone") > -1 && s.appendTo(t), p.click(function () {
                    return t.remove(), !1
                }), s.click(function () {
                    if (!s.attr("href")) return alert("暂不支持此系统的下载！"), !1
                }), 0 === o('[mip-extension="mip-sg-ad"]').length && i(), "object" == typeof e.showurl)
                for (var u in e.showurl) a(e.showurl[u]);
            else a(e.showurl)
        })
    }, r
});