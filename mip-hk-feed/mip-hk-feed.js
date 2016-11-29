/**
 * @file 百度好看信息流
 * @author  liujunqiu
 * @time 2016.11.29
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
    }

    function loadData(element) {
        if (loading) {
            return false;
        }
        loading = true;

        var tmpUrl = ajaxUrl + tag
                     + '&timestamp=' + new Date().getTime()
                     + '&pn=' + page;
        $.ajax({
            url: tmpUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                loading = false;
                if (data.feed && data.feed.datalist) {
                    // 图片HTTPS地址转换
                    for (var i = 0; i < data.feed.datalist.length; i++) {
                        if (data.feed.datalist[i].data.img.length > 0) {
                            var tmpImg = data.feed.datalist[i].data.img[0];
                            if (typeof tmpImg === 'object') {
                                data.feed.datalist[i].data.img[0].small = httpsTrans(tmpImg.small);
                            }
                            else {
                                data.feed.datalist[i].data.img[0] = httpsTrans(tmpImg);
                            }
                        }
                    }

                    var html = tmpl('J_list_tpl', data.feed.datalist);
                    $(element).find('#J_list').append(html);

                    page++;
                }
                else {
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
        var fn = !/\W/.test(str)
            ? tplCache[str] = tplCache[str]
            || tmpl(document.getElementById(str).innerHTML)
            : new Function('obj',
                    'var p=[],print=function(){p.push.apply(p,arguments);};'
            + 'with(obj){p.push(\''
            + str
                .replace(/[\r\t\n]/g, ' ')
                .split('<#').join('\t')
                .replace(/((^|#>)[^\t]*)'/g, '$1\r')
                .replace(/\t=(.*?)#>/g, '\',$1,\'')
                .split('\t').join('\');')
                .split('#>').join('p.push(\'')
                .split('\r').join('\\\'')
            + '\');}return p.join(\'\');');

        return data ? fn(data) : fn;
    }

    // https链接转换
    function httpsTrans(href) {
        var map = {
            'http:\/\/www.baidu.com': 'https:\/\/www.baidu.com',
            'http:\/\/hm.baidu.com\/': 'https:\/\/hm.baidu.com\/',
            'http:\/\/m.hao123.com': 'https:\/\/m.hao123.com',
            'http:\/\/wap.hao123.com': 'https:\/\/wap.hao123.com',
            'http:\/\/www.hao123.com': 'https:\/\/www.hao123.com',
            'http:\/\/nsclick.baidu.com': 'https:\/\/gsp1.baidu.com\/8qUJcD3n0sgCo2Kml5_Y_D3',
            'http:\/\/static.tieba.baidu.com': 'https:\/\/gsp0.baidu.com\/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK',
            'http:\/\/nssug.baidu.com': 'https:\/\/gsp1.baidu.com\/8qUZeT8a2gU2pMbgoY3K',
            'http:\/\/suggestion.baidu.com': 'https:\/\/gsp0.baidu.com\/5a1Fazu8AA54nxGko9WTAnF6hhy',
            'http:\/\/hdj.baidu.com': 'https:\/\/gsp1.baidu.com\/7LAAsjip0QIZ8tyhnq',
            'http:\/\/suez.baidu.com': '\/\/suez.baidu.com',
            'http:\/\/wapsite.baidu.com': 'https:\/\/gsp0.baidu.com\/6bMWfz351MgCo2Kml5_Y_D3',
            'http:\/\/ms.bdimg.com': 'https:\/\/gss2.bdstatic.com\/8_V1bjqh_Q23odCf',
            'http:\/\/img.baidu.com': 'https:\/\/gss3.bdstatic.com\/70cFsjip0QIZ8tyhnq',
            'http:\/\/s0.m.hao123img.com': 'https:\/\/gss0.bdstatic.com\/5eR1cXSg2QdV5wybn9fN2DJv',
            'http:\/\/s1.m.hao123img.com': 'https:\/\/gss0.bdstatic.com\/5eN1cXSg2QdV5wybn9fN2DJv',
            'http:\/\/s2.m.hao123img.com': 'https:\/\/gss0.bdstatic.com\/5eZ1cXSg2QdV5wybn9fN2DJv',
            'http:\/\/s3.m.hao123img.com': 'https:\/\/gss0.bdstatic.com\/5eV1cXSg2QdV5wybn9fN2DJv',
            'http:\/\/s0.hao123img.com': 'https:\/\/gss0.bdstatic.com\/5eR1dDebRNRTm2_p8IuM_a',
            'http:\/\/s1.hao123img.com': 'https:\/\/gss1.bdstatic.com\/5eN1dDebRNRTm2_p8IuM_a',
            'http:\/\/s2.hao123img.com': 'https:\/\/gss2.bdstatic.com\/5eZ1dDebRNRTm2_p8IuM_a',
            'http:\/\/t10.baidu.com': 'https:\/\/gss0.baidu.com\/6ONWsjip0QIZ8tyhnq',
            'http:\/\/t11.baidu.com': 'https:\/\/gss1.baidu.com\/6ONXsjip0QIZ8tyhnq',
            'http:\/\/t12.baidu.com': 'https:\/\/gss2.baidu.com\/6ONYsjip0QIZ8tyhnq',
            'http:\/\/datax.baidu.com': 'https:\/\/gsp0.baidu.com\/-LMSbS0a2gU2pMbgoY3K',
            'http:\/\/timg01.baidu-img.cn': 'https:\/\/gss3.bdstatic.com\/6Ls0a7b-KgQFm2e889WK1HF6hq',
            'http:\/\/tc1.baidu-1img.cn': 'https:\/\/gss0.baidu.com\/6LVXsjip0QIZ8Aqbn9fN2DC',
            'http:\/\/tc2.baidu-1img.cn': 'https:\/\/gss0.baidu.com\/6LVXsjip0QIZ8Aqbn9fN2DC',
            'http:\/\/ztd00.photos.bdimg.com': 'https:\/\/gss0.bdstatic.com\/yqACvGbaBA94lNC68IqT0jB-xx1xbK',
            'http:\/\/hiphotos.baidu.com': 'https:\/\/gss3.baidu.com\/7LsWdDW5_xN3otqbppnN2DJv',
            'http:\/\/himg.bdimg.com': 'https:\/\/gss1.bdstatic.com\/7Ls0a8Sm1A5BphGlnYG',
            'http:\/\/a.hiphotos.bdimg.com': 'https:\/\/gss0.bdstatic.com\/94o3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/b.hiphotos.bdimg.com': 'https:\/\/gss1.bdstatic.com\/9vo3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/c.hiphotos.bdimg.com': 'https:\/\/gss2.bdstatic.com\/9fo3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/d.hiphotos.bdimg.com': 'https:\/\/gss3.bdstatic.com\/-Po3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/e.hiphotos.bdimg.com': 'https:\/\/gss0.bdstatic.com\/-4o3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/f.hiphotos.bdimg.com': 'https:\/\/gss1.bdstatic.com\/-vo3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/g.hiphotos.bdimg.com': 'https:\/\/gss2.bdstatic.com\/-fo3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/h.hiphotos.bdimg.com': 'https:\/\/gss2.bdstatic.com\/7Po3dSag_xI4khGkpoWK1HF6hhy',
            'http:\/\/bdimg.share.baidu.com': 'https:\/\/gss1.baidu.com\/9rA4cT8aBw9FktbgoI7O1ygwehsv',
            'http:\/\/timg01.baidu-2img.cn': 'https:\/\/gss0.baidu.com\/6Ls0a7b-KgQFm2e886qO_jowehu',
            'http:\/\/a.hiphotos.baidu.com': 'https:\/\/gss0.baidu.com\/94o3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/b.hiphotos.baidu.com': 'https:\/\/gss1.baidu.com\/9vo3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/c.hiphotos.baidu.com': 'https:\/\/gss3.baidu.com\/9fo3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/d.hiphotos.baidu.com': 'https:\/\/gss0.baidu.com\/-Po3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/e.hiphotos.baidu.com': 'https:\/\/gss1.baidu.com\/-4o3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/f.hiphotos.baidu.com': 'https:\/\/gss2.baidu.com\/-vo3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/g.hiphotos.baidu.com': 'https:\/\/gss3.baidu.com\/-fo3dSag_xI4khGko9WTAnF6hhy',
            'http:\/\/h.hiphotos.baidu.com': 'https:\/\/gss0.baidu.com\/7Po3dSag_xI4khGko9WTAnF6hhy'
        };

        if (/^http/.test(href)) {
            var inMap = 0;

            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    var tmpReg = new RegExp(key, 'i');

                    if (tmpReg.test(href)) {
                        href = href.replace(tmpReg, map[key]);

                        inMap = 1;

                        break;
                    }
                }
            }

            if (inMap === 0) {
                href = 'https://' + href;
            }
        }

        return href;
    }

    customElem.prototype.build = build;

    return customElem;
});
