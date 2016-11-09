/**
* @file 搜索组件
* @author ningsong
* @time 2016.11.09
*/
define(function (require) {
    var $ = require('jquery');
    var customElement = require('customElement').create();

    /**
    * 构造元素，只会运行一次
    */
    customElement.prototype.build = function () {
        var element = this.element;
        if (element.isRender) {
            return;
        }
        element.isRender = true;

        var $element = $(element);
        var action = this.element.getAttribute("action") || "";

        $element.find("#search_sbt").bind("click", function () {
            var $keys = $element.find("#s_keys");
            if ($keys.val().length > 0) {
                var text = $keys.val();
                var regx = new RegExp("[<>'\"*?]+", "ig");
                text = text.replace(regx, "");
                var url = action.replace("{0}", text);

                var a = $("<form method='get'/>").appendTo($("body"));
                var c = url.split("?");
                if (c.length > 1)
                    for (var f = c[1].split("&"), d = 0; d < f.length; d++) {
                        var e = f[d].split("=");
                        $("<input type='hidden' name='" + e[0] + "' value='" + e[1] + "' />").appendTo(a);
                    }
                a.attr("action", c[0]);
                a.get(0).submit();
            }
            else {
                $keys.focus();
                alert("请输入搜索关键词");
            }
        });
    };

    return customElement;

});
