/**
 * @file 下载组件
 * @author fengchuantao
 * @time 2016.06.21
 * @modify wangpei07 2016.11.21
 */

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * [getHtml 拼接html]
     */
    function getHtml() {
        var element = this;
        var src = element.getAttribute(getUserAgent() + '-downsrc') || '';
        var btnText = element.getAttribute('downbtntext') || '';
        var showText = getShowText.call(element) || '';
        var imageAddr = element.getAttribute('src') || '';
        var imageStr = '';

        if (imageAddr) {
            imageStr = [
                '<div class="mip-appdl-imgbox">',
                '    <img src=' + imageAddr + ' class="mip-appdl-downimg">',
                '</div>'
            ].join('');
        }

        var html = [
            '<div class="mip-appdl-box' + (imageAddr ? '' : ' mip-appdl-pm10') + '">',
            '    <div class="mip-appdl-content">' + imageStr,
            '        <div class="mip-appdl-textbox">' + showText + '</div>',
            '        <div class="mip-appdl-downbtn">',
            '            <a href=' + src + ' target="_blank">' + btnText + '</a>',
            '        </div>',
            '        <div class="mip-appdl-closebutton"></div>',
            '    </div>',
            '</div>'
        ].join('');

        if (src) {
            $(element).append(html);

            // 关闭按钮点击事件
            $(this).on('click', '.mip-appdl-closebutton', function () {
                $(this).parents('.mip-element').remove();
            });
        }
    }

    /**
     * [getShowText 显示文案处理]
     *
     * @return {string} [拼接后的html字符串]
     */
    function getShowText() {
        var element = this;
        var text = element.getAttribute('texttip');
        var showText = ['<div class="mip-appdl-text">'];
        var array = [];
        var index = 0;

        // 字符串转换为数组
        if (text) {
            try {
                array = new Function('return ' + text)();
            }
            catch (e) {}
        }

        // 限定最大行数两行
        for (index = 0; index < Math.min(2, array.length); index++) {
            showText.push('<p>' + array[index] + '</p>');
        }
        showText.push('</div>');

        return showText.join('');
    }

    /**
     * [getUserAgent 获取浏览器类型]
     *
     * @return {string} [浏览器类型字符串]
     */
    function getUserAgent() {
        var agent = navigator.userAgent;
        var regIOS = /(iPhone|iPad|iPod|iOS)/i;
        var regAdr = /(Android)/i;

        return regIOS.test(agent) ? 'Ios' : regAdr.test(agent) ? 'Android' : 'Other';
    }

    /**
     * [build 组件build函数]
     */
    customElement.prototype.build = function () {
        var element = this.element;
        getHtml.call(element);
    };

    return customElement;

});
