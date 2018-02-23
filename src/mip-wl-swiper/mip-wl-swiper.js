define(function(require) {
    var mipSwiperFunc = function(dom) {
        dom._direction = (parseInt(dom.getAttribute("direction")) || 350) / 1000;
        dom.dealy = (parseInt(dom.getAttribute("dealy")) || 3000);
        dom._startPoint = 0;
        dom._startEle = 0;
        dom._now = 0;
        dom._timer = 0;
        dom._box = dom.querySelector(".swiper-wrapper");
        dom._box.innerHTML += dom._box.innerHTML;
        dom._slideItem = dom.querySelectorAll(".swiper-slide");
        dom._timer;

        if (!dom._box || dom._slideItem === []) {
            return;
        }
        var aHeight = dom._slideItem[0].offsetHeight;
        var aWidth = parseInt(dom._slideItem[0].offsetWidth);
        var aMarginLeft = Math.ceil(window.getComputedStyle(dom._slideItem[0]).marginLeft.split("px")[0]);
        var aMarginRight = Math.ceil(window.getComputedStyle(dom._slideItem[0]).marginRight.split("px")[0]);
        var aMargin = aMarginLeft + aMarginRight;
        var mipSwiperWidth = dom.offsetWidth;
        dom._box.style.width = dom._slideItem.length * (aWidth + aMargin) + "px";

        for (var i = 0; i < dom._slideItem.length; i++) {
            dom._slideItem[i].style.width = aWidth + "px";
            dom._slideItem[i].style.float = "left";
        }
        cssTransform(dom._box, "translateX", 0);
        auto();

        function auto() {
            clearInterval(dom._timer);
            dom._timer = setInterval(function() {
                if (dom._now == dom._slideItem.length / 2 - 1) {
                    dom._now = 0;
                }
                dom._box.style.transition = "none";
                cssTransform(dom._box, "translateX", -dom._now * (aWidth + aMargin));
                setTimeout(function() {
                    dom._now++;
                    tab();
                }, 30);
            }, dom.dealy);
        };

        function tab() {
            dom._box.style.transition = dom._direction + "s";
            cssTransform(dom._box, "translateX", -dom._now * (aWidth + aMargin));
        }
    }

    function cssTransform(ele, attr, val) {
        if (!ele.transform) {
            ele.transform = {};
        };
        if (arguments.length > 2) {
            ele.transform[attr] = val;
            var sval = "";
            for (var s in ele.transform) {
                if (s == "translateX") {
                    sval += s + "(" + ele.transform[s] + "px)";
                }
                ele.style.WebkitTransform = ele.style.transform = sval;
            }
        } else {
            val = ele.transform[attr];
            if (typeof val == "undefined" && attr == "translateX") {
                val = 0;
            };
            return val;
        }
    }

    function mipWLSwiper() {
        var mipSwiper = document.querySelectorAll('mip-swiper');
        var mipSwiperDomName = [];

        for (var i = 0, l = mipSwiper.length; i < l; i++) {
            var mipSwiperItem = mipSwiper[i].getAttribute("id"); //获取所有的Dom名称
            var mipSwiperDom = document.getElementById(mipSwiperItem); //获取所有的dom
            mipSwiperFunc(mipSwiper[i])
        }
    }
    //mipWLSwiper()
    return mipWLSwiper
})