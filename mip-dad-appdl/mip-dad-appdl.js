/**
 * @file mip-dad-appdl 手机爸爸的app下载切换效果
 * @author pifire
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
		// this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var $element = $(element);
        var ad = $element.attr('ad');
        var aid = $element.attr('aid');
        var addr = $element.attr('addr');
        var ppDN = 'http://ucan.25pp.com/PPAssistant_PM_4008.apk';
        var text1 = '\u4f7f\u7528\u76ae\u76ae\u52a9\u624b';
        var text2 = '\u76ae\u76ae\u52a9\u624b\u662f\u5168\u9762\u3001\u4e13\u4e1a\u7684'
		+ '\u5e94\u7528\u5e02\u573a\uff0c\u5c06\u4e3a\u60a8\u5b89\u88c5\u76ae\u76ae\u52a9'
		+ '\u624b\uff0c\u542f\u52a8\u9ad8\u901f\u5f15\u64ce\uff0c\u5b89\u5168\u65e0\u6bd2'
		+ '\u3001\u6781\u901f\u4e0b\u8f7d\u5e94\u7528\uff01';
        var text3 = '\u4f7f\u7528\u666e\u901a\u4e0b\u8f7d\u65e0\u6cd5\u907f\u514d\u6d41'
		+ '\u91cf\u52ab\u6301\u3001\u4e0b\u8f7d\u8f83\u6162\u7b49\u95ee\u9898\uff0c\u5efa'
		+ '\u8bae\u9009\u62e9\u76ae\u76ae\u52a9\u624b\u5b89\u88c5\u9ad8\u901f\u4e0b\u8f7d\uff01';
        var innerHTML = '';
        if (ad > 0) {
            innerHTML = '<i>' + text1 + '</i>'
				+ '<s ur="' + addr + '" aid="' + aid + '">\u9ad8\u901f\u4e0b\u8f7d</s>'
				+ '<p >' + text2 + '</p>'
				+ '<u style="display: none;">' + text3 + '</u>';
        }
		else {
            innerHTML = '<s ur="' + addr + '" aid="' + aid + '" class="pt">\u7acb\u5373\u4e0b\u8f7d</s>';
        }
        $element.html(innerHTML);
        var flag = 1;
        $element.on('click', 'i', function () {
            if (flag === 1) {
                $element.addClass('no');
                $element.find('s').text('\u666e\u901a\u4e0b\u8f7d');
                $element.find('p').attr('style', 'display:none');
                $element.find('u').attr('style', 'display:block');
                flag = 0;
            }
			else {
                $element.removeClass('no');
                $element.find('s').text('\u9ad8\u901f\u4e0b\u8f7d');
                $element.find('p').attr('style', 'display:block');
                $element.find('u').attr('style', 'display:none');
                flag = 1;
            }
        });
        $element.on('click', 's', function () {
            if ($element.hasClass('no') || $element.find('s').hasClass('pt')) {
                if ($element.attr('ur') == null) {
                    location.href = 'http://www.mobile-dad.com/tourl.php?apkid=' + $element.attr('aid');
                }
				else {
                    window.open($element.attr('ur'), '_self', '');
                }
            }
			else {
                location.href = ppDN;
            }
        });
    };
    return customElement;
});
