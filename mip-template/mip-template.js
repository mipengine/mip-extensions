/**
 * @file 模板组件
 * @author fengzihao
 * @time 2016.12.14
 */

define(function (require) {
    var $ = require('zepto');
    var SodaRender = require('./SodaRender');
    var RecommendElement = require('customElement').create();
    var recommend;

    RecommendElement.prototype.createdCallback = renderElement;

    function addStylesheet(link) {
        var ele = document.createElement('link');
        ele.rel = 'stylesheet';
        ele.type = 'text/css';
        ele.href = link;
        document.head.appendChild(ele);
    }

    function renderElement() {
        var $ele = $(this.element);
        var $container = $ele.find('.recommend_container');
        var $template = $ele.find('.recommend_template');
        var url = $ele.attr('src') || '';
        var cssHref = $ele.attr('css-href') || '';
        var jsonp = $ele.attr('jsonp') || '';

        if (cssHref) {
            addStylesheet(cssHref);
        }
        recommend.init({
            $container: $container,
            url: url,
            tpl: $template.html(),
            jsonp: jsonp
        });
        $template.remove();
    }

    recommend = {
        url: null,
        ajaxData: null,
        tpl: null,

        init: function (props) {
            this.$container = props.$container;
            this.url = props.url;
            this.dataType = props.jsonp ? 'jsonp' : 'json';
            this.ajaxData = {};
            this.tpl = props.tpl.replace(/template-mip-/g, 'mip-');
            this.request();
        },

        request: function () {
            var self = this;

            $.ajax({
                url: this.url,
                dataType: this.dataType,
                success: function (res) {
                    if (res.status.code !== 0) {
                        self.error(res);
                    } else {
                        self.display(res);
                    }
                }
            });
        },

        display: function (data) {
            var item = SodaRender.sodaRender(this.tpl, data);
            this.$container.append(item);
        },

        error: function () {

        }
    };

    return RecommendElement;
});
