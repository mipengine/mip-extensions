/**
 * @file mip-alert 个人统计
 * @author
 */

define(function (require) {

    var customElement = require('customElement').create();
    function qqtnCount() {		
        var webInfo = {
            Rootid: $('.f-information').attr('data-rootid'),
            Username: $('.f-information').attr('data-Username'),
            Type: $('.f-information').attr('data-Type'),
            DateTime: $('.f-information').attr('data-DateTime'),
            Id: $('.f-information').attr('data-id')
        };
        var cnzzprotocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
        var cnzzId1 = '%3Cspan id=\'cnzz_stat_icon_5932461\'%3E%3C/span%3E%3Cscript src=\'';
        var cnzzUrl1 = 's11.cnzz.com/stat.php%3Fid%3D5932461\' type=\'text/javascript\'%3E%3C/script%3E';
        document.write(unescape(cnzzId1 + cnzzprotocol + cnzzUrl1));
        var rootidArry = [37, 38, 39, 40, 41, 42, 43, 44];
        if ($.inArray(webInfo.Rootid, rootidArry) !== -1) {
            var cnzzprotocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
            var cnzzId2 = '%3Cspan id=\'cnzz_stat_icon_1257361975\'%3E%3C/span%3E%3Cscript src=\'';
            var cnzzUrl2 = 's11.cnzz.com/z_stat.php%3Fid%3D1257361975\' type=\'text/javascript\'%3E%3C/script%3E';
            document.write(unescape(cnzzId2 + cnzzprotocol + cnzzUrl2));
        }
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
        if (compareDate(webInfo.DateTime, '2015/11/1')) {
            var jsStrdate = src + charset + atime + ref + url + username + type + rid + platform + content;
            document.write('<iframe src="' + jsStrdate + '" width="0" height="0" style="display:none;"></iframe>');
            var bjname = webInfo.Username;
            var cnzzprotocol = (('https:' === document.location.protocol) ? ' https://' : ' http://');
            var cnzzid;
            var cnzzsite;
            if (bjname !== '') {
                switch (bjname) {
                    case 'wyz':
                        cnzzid = 1256765412, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'caozhi':
                        cnzzid = 1256765785, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zqr':
                        cnzzid = 1256765801, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'liucui':
                        cnzzid = 1257643251, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'yjw':
                        cnzzid = 1258159606, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'chengli':
                        cnzzid = 1258608451, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'xhl':
                        cnzzid = 1258750045, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'lxl':
                        cnzzid = 1259099543, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'jxf':
                        cnzzid = 1259422848, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'wangkang':
                        cnzzid = 1259711734, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'zhangdi':
                        cnzzid = 1259956349, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'zjy':
                        cnzzid = 1259956363, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'guanxi':
                        cnzzid = 1260279967, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'wuying':
                        cnzzid = 1260279990, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'zqrjk':
                        cnzzid = 1260551168, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'gaodou':
                        cnzzid = 1260551152, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'sml':
                        cnzzid = 1260551136, cnzzsite = 's4.cnzz.com';
                        break;
                    case 'chenggang':
                        cnzzid = 1260551116, cnzzsite = 's11.cnzz.com';
                        break;
                    case 'gaoqiang':
                        cnzzid = 1260870448, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'yangchao':
                        cnzzid = 1260870449, cnzzsite = 's95.cnzz.com';
                        break;
                    case 'chengl':
                        cnzzid = 1261168426, cnzzsite = 's11.cnzz.com';
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
    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
		qqtnCount();
    };

    return customElement;
});
