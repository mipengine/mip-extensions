/**
 * @author xxx
 * @file mip-39alimama
 */

define(function (e) {
        var o = e('customElement').create();
        return o.prototype.build = function () {
            var o = this.element;
            var n = o.getAttribute('asid');
            var d = e('zepto');
            function ack(element) {
                var t = element;
                var e = t.getAttribute('asid');
                var id = t.getAttribute('id');
                var i = d(t);
                var s = ['<script type="text/javascript" id="ads_' + n + '">', '</script>'];
                i.append(s.join(''));
                __loadJs__('https://afpmm.alicdn.com/g/mm/afp-cdn/JS/w.js', function () {
                    var mms = window._mmW;
                    mms.q({aid: e, destid: id, async: 1, serverbaseurl: 'afpeng.alimama.com/'});
                }, t);
            }
            function __loadJs__(url, callback, dom) {
                var head = dom || document.getElementsByTagName('head')[0] || document.documentElement;
                var script = document.createElement('script');
                var done = false;
                script.onerror = script.onload = script.onreadystatechange = function () {
                    if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                        done = true;
                        if (callback) {
                            callback();
                        }

                        script.onerror = script.onload = script.onreadystatechange = null;
                    }

                };
                script.src = url;
                head.insertBefore(script, head.firstChild);
            }
            ack(this.element);

        }, o;
    });

