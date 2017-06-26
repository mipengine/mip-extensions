/**
 * @file 统计功能
 * @author Zhang
 */
define(function (require) {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    function cr173Count() {
        var webInfo = {
            Username: $('.f-information').attr('data-Username'),
            Type: $('.f-information').attr('data-Type'),
            DateTime: $('.f-information').attr('data-DateTime'),
            Id: $('.f-information').attr('data-id')
        };
        var src = 'https://count.612.com//index.php?m=r';
        var charset = '&charset=' + getPageCharset();
        var atime = '&atime=' + webInfo.DateTime;
        var ref = '&ref=' + encodeURIComponent(document.referrer);
        var url = '&url=' + encodeURIComponent(window.location.href);
        var username = '&username=' + encodeURIComponent(webInfo.Username);
        var type = '&type=' + webInfo.Type;
        var rid = '&rid=' + webInfo.Id;
        var platform = '&platform=2';
        var content = '&content=' + encodeURIComponent(document.title);
        if (compareDate(webInfo.DateTime, '2014/12/31')) {
            var jsStrdate = src + charset + atime + ref + url + username + type + rid + platform + content;
            document.write('<iframe src="' + jsStrdate + '" width="0" height="0" style="display:none;"></iframe>');
            var bjname = webInfo.Username;
            var cnzzprotocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
            var cnzzid;
            var cnzzsite;
            if (bjname !== '') {
                switch (bjname) {
                    case 'lilei':
                        cnzzid = 1260145133, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'cr173zhuwei':
                        cnzzid = 1259254879, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'hy_cr173':
                        cnzzid = 1257189736, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'liquan':
                        cnzzid = 1259255002, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'zhongzai':
                        cnzzid = 1256652057, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'chenzhihua':
                        cnzzid = 1260137048, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'cr173_zjj':
                        cnzzid = 1256652045, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'huyakun':
                        cnzzid = 1256652041, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zhangcongqing':
                        cnzzid = 1259255061, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'fanqiang':
                        cnzzid = 1259255027, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'wangzhuang':
                        cnzzid = 1256652029, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'zhangwen':
                        cnzzid = 1256652022, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'pengqi':
                        cnzzid = 1257189713, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'xudewen':
                        cnzzid = 1256652011, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'luowen':
                        cnzzid = 1256652007, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'zhongqiang':
                        cnzzid = 1256652001, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'shixing':
                        cnzzid = 1256651994, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'thza':
                        cnzzid = 1256651988, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'lixinlong':
                        cnzzid = 1260137114, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'zhangjia':
                        cnzzid = 1259257318, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zhpc':
                        cnzzid = 1257189729, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'liuxiaocong':
                        cnzzid = 1260137076, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'zhangyanan':
                        cnzzid = 1259255042, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'oywx':
                        cnzzid = 1256651884, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'ganzhen':
                        cnzzid = 1256651837, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'tandan':
                        cnzzid = 1259255086, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'xiaokaiyang':
                        cnzzid = 1259257431, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'fangyu':
                        cnzzid = 1259257460, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'cr_wh':
                        cnzzid = 1261372691, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'wujiaqi':
                        cnzzid = 1261372711, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'lujieming':
                        cnzzid = 1256651941, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'huangkui':
                        cnzzid = 1260137150, cnzzsite = 's95.cnzz.com';
                        break;
                }
                if (typeof cnzzid === 'number' && typeof cnzzsite === 'string') {
                    var jsStr = '%3Cspan id=\'cnzz_stat_icon_';
                    jsStr += cnzzid + '\'%3E%3C/span%3E%3Cscript src=\'';
                    jsStr += cnzzprotocol;
                    jsStr += cnzzsite;
                    jsStr += '/stat.php%3Fid%3D';
                    jsStr += cnzzid;
                    jsStr += '%26show%3Dpic1\' type=\'text/javascript\'%3E%3C/script%3E';
                    document.write(unescape(jsStr));
                }
            }
        }
    }
    function getPageCharset() {
        var charSet = '';
        var oType = getBrowser();
        switch (oType) {
            case 'IE':
                charSet = document.charset;
                break;
            case 'FIREFOX':
                charSet = document.characterSet;
                break;
            default:
                break;
        }
        return charSet;
    }
    function getBrowser() {
        var oType = '';
        if (navigator.userAgent.indexOf('MSIE') !== -1) {
            oType = 'IE';
        }
        else if (navigator.userAgent.indexOf('Firefox') !== -1) {
            oType = 'FIREFOX';
        }

        return oType;
    }
    function compareDate(d1, d2) {
        return ((new Date(d1.replace(/-/g, '\/'))) > (new Date(d2.replace(/-/g, '\/'))));
    }
    customElem.prototype.build = function () {
        cr173Count();
    };
    return customElem;
});
