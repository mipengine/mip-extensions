/**
 * @file mip-showmore 组件
 * @author fengchuantao
 * @time 2017-1-20
*/

define(function (require) {
    var $ = require('zepto');
    var customElement = require('customElement').create();


    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        // 获取点击按钮
        var clickBtn = element.querySelector('[showmorebtn]');
        // 获取内容显示框
        var showBox = element.querySelector('[showmorebox]');
        // 获取动画时间
        var animateTime = element.getAttribute('animatetime') || '0';
        // 如果动画不是数字
        if (isNaN(animateTime)) {
            return;
        }
        // 获取高度阈值
        var maxHeight = element.getAttribute('maxheight');
        // 获取字数阈值
        var maxLen = element.getAttribute('maxlen');
        // 如果展开按钮或者显示框不存在则返回
        if (!clickBtn || !showBox) {
            return;
        }
        // 处理阈值高度(高度优先于字体长度,不允许两个同时存在)
        if (maxHeight && !isNaN(maxHeight)) {
            maxHeightFn();
        }
        else if (maxLen && !isNaN(maxLen)) {
            maxLenFn();
        }
        else {
            return;
        }

        // 高度阈值控制
        function maxHeightFn() {
            // 获取页面元素高度
            var showBoxHei = $(showBox).height();
            // 如果高度大于阀值
            if (showBoxHei > maxHeight) {
                $(showBox).css({
                    'height': maxHeight + 'px',
                    'overflow': 'hidden',
                    'transition': 'height ' + animateTime + 's'
                });
                $(element).find('.mip-showmore-btnshow').css('display', 'block');

                // 绑定显示更多按钮
                $(clickBtn).on('click', function () {
                    // 如果现在为打开状态
                    if ($(this).hasClass('mip-showmore-boxshow')) {
                        $(this).removeClass('mip-showmore-boxshow');
                        $(showBox).css('height', maxHeight + 'px');
                        changeBtnText('hide');
                    }
                    else {
                        $(this).addClass('mip-showmore-boxshow');
                        $(showBox).css('height', showBoxHei + 'px');
                        changeBtnText('show');
                    }
                });
            }
        }

        // 字数控制
        function maxLenFn() {
            // 获取原生原始的字符串
            var innerText = $(showBox).text();
            // 存储剪切后的字符串
            var cutOffText;
            // 存储原始html对象
            var originalHtml;
            // 如果长度大于阀值
            if (innerText.length > maxLen) {
                // 显示展开更多按钮
                $(element).find('.mip-showmore-btnshow').css('display', 'block');
                cutOffText = innerText.slice(0, maxLen) + '......';
                originalHtml = $(showBox).html();
                $(showBox).html('');
                $(showBox).append('<p class="mip-showmore-cutofftext">' + cutOffText + '</p>');
                $(showBox).append('<div class="mip-showmore-originalhtml">' + originalHtml + '</div>');
                $(clickBtn).on('click', function () {
                    if ($(this).hasClass('mip-showmore-boxshow')) {
                        $(showBox).find('.mip-showmore-cutofftext').css('display', 'block');
                        $(showBox).find('.mip-showmore-originalhtml').css('display', 'none');
                        $(this).removeClass('mip-showmore-boxshow');
                        changeBtnText('hide');
                    }
                    else {
                        $(showBox).find('.mip-showmore-cutofftext').css('display', 'none');
                        $(showBox).find('.mip-showmore-originalhtml').css('display', 'block');
                        $(this).addClass('mip-showmore-boxshow');
                        changeBtnText('show');
                    }
                });
            }
        }

        // 按钮文案显示切换
        function changeBtnText(type) {
            if (type === 'show') {
                $(element).find('.mip-showmore-btnshow').css('display', 'none');
                $(element).find('.mip-showmore-btnhide').css('display', 'block');
            }
            else {
                $(element).find('.mip-showmore-btnshow').css('display', 'block');
                $(element).find('.mip-showmore-btnhide').css('display', 'none');
            }
        }
    };
    return customElement;
});
