/**
 * 百度好看信息流
 */
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();

    var ajaxUrl = '//haokan.baidu.com/index/more?tag=';
    var tag = 'rec';
    var page = 1;
    var winHeight = $(window).height();
    var loading = false;
    var isEnd = false;
    var loadingHtml = [
        '<div class="news-list" id="J_list"></div>',
        '<div class="loading" id="J_loading">',
        '<span class="loading-icon"></span>精选推荐中',
        '</div>'
    ].join('');

    function build() {
        var element = this.element;

        $(element).append(loadingHtml);
        var type = $(element).attr('type');
        if (type === 'video') {
            tag = 'video';
        }

        $(window).bind('scroll', function () {
            var loadingTop = $(element).find('#J_loading').offset().top;
            var scrollTop = $(window).scrollTop();

            if (!isEnd && loadingTop - scrollTop - winHeight < 200) {
                loadData(element);
            }
        });

        loadData(element);
    };

    function loadData(element) {
        if (loading) {
            return false;
        }
        loading = true;

        var tmpUrl = ajaxUrl + tag
                     + '&timestamp=' + new Date().getTime()
                     + '&pn=' + page;
        ajax = $.ajax({
            url: tmpUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                loading = false;
                if (data.feed && data.feed.datalist) {
                    // 图片HTTPS地址转换
                    for (var i = 0; i < data.feed.datalist.length; i++) {
                        if (data.feed.datalist[i].data.img.length > 0) {
                            data.feed.datalist[i].data.img[0] = httpsTrans(data.feed.datalist[i].data.img[0]);
                        }
                    }

                    var html = tmpl('J_list_tpl', data.feed.datalist);
                    $(element).find('#J_list').append(html);

                    page++;
                } else {
                    loading = false;

                    $(element).find('#J_loading').hide();
                }
            },
            error: function () {
                loading = false;
                isEnd = true;
            }
        });
    }

    var tplCache = {};
    function tmpl(str, data) {
        var fn = !/\W/.test(str) ?
            tplCache[str] = tplCache[str] ||
                tmpl(document.getElementById(str).innerHTML) :
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +
                    "with(obj){p.push('" +
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<#").join("\t")
                        .replace(/((^|#>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)#>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("#>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

        return data ? fn( data ) : fn;
    };

    // https链接转换
    function httpsTrans(href) {
        var map = {};

        var strHttpsMap = $('#J_https_map').html();
        if (!!strHttpsMap) {
            try {
                var map = eval('(' + strHttpsMap + ')');
            } catch (e) {}
        }

        if (/^http/.test(href)) {
            var inMap = 0;

            for(var key in map) {
                if (map.hasOwnProperty(key)) {
                    var tmpReg = new RegExp(key, "i");

                    if (tmpReg.test(href)) {
                        href = href.replace(tmpReg, map[key]);

                        inMap = 1;

                        break;
                    }
                }
            }

            if (inMap === 0) {
                href = "https://" + href;
            }
        }

        return href;
    }

    customElem.prototype.build = build;

    return customElem;
});
