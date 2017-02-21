/**
 * @file mip-showmore 组件
 * @author fengchuantao
 * @time 2017-1-20
*/

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
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
        var animateTime = element.getAttribute('animatetime') || 0;

        // 如果动画不是数字
        if (isNaN(animateTime)) {
            return;
        }

        // 如果展开按钮或者显示框不存在则返回
        if (!clickBtn || !showBox) {
            return;
        }

        // 获取高度阈值
        var maxHeight = element.getAttribute('maxheight');
        // 获取字数阈值
        var maxLen = element.getAttribute('maxlen');

        // 获取显示框显示对象
        // 处理阈值高度(高度优先于字体长度,不允许两个同时存在)
        if (maxHeight && !isNaN(maxHeight)) {
            maxHeightFn();
        }
        else if (maxLen && !isNaN(maxLen)) {
            maxLenFn();
        }
        else {
            maxHeight = 0;
            maxHeightFn();
        }

        // 避免初始加载闪现
        util.css(element, {
            'visibility': 'visible'
        });


        // 高度阈值控制
        function maxHeightFn() {
            // 获取页面元素高度
            var showBoxHei = util.rect.getElementOffset(showBox).height;

            // 如果高度大于阀值
            if (showBoxHei > maxHeight) {
                util.css(showBox, {
                    'height': maxHeight + 'px',
                    'overflow': 'hidden'
                });

                // 显示更多按钮
                var showMoreBtn = element.querySelector('.mip-showmore-btnshow');
                util.css(showMoreBtn, {
                    'display': 'block'
                });

                // 绑定显示更多按钮
                clickBtn.addEventListener('click', function () {
                    // 如果现在为打开状态
                    if (this.classList.contains('mip-showmore-boxshow')) {
                        this.classList.remove('mip-showmore-boxshow');
                        util.css(showBox, {
                            'height': maxHeight + 'px'
                        });
                        changeBtnText('hide');
                    }
                    else {
                        this.classList.add('mip-showmore-boxshow');
                        util.css(showBox, {
                            'height': showBoxHei + 'px',
                            'transition': 'height ' + animateTime + 's'
                        });
                        var runtime = animateTime * 1000;
                        setTimeout(function () {
                            // 防止内部出现懒加载元素导致高度计算不对
                            util.css(showBox, {
                                'height': 'auto'
                            });
                        }, runtime);
                        changeBtnText('show');
                    }
                });
            }
        }

        // 字数控制
        function maxLenFn() {
            // 获取原生原始的字符串
            var innerText = showBox.innerText.replace(/(^\s*)|(\s*$)/g, '');
            if (innerText === '') {
                innerText = showBox.textContent;
            }

            // 报错剪切后的字符串
            var cutOffText;
            // 存储原始html对象
            var originalHtml;

            // 如果长度大于阀值
            if (innerText.length > maxLen) {
                // 显示展开更多按钮
                var showBtnMore = element.querySelector('.mip-showmore-btnshow');
                util.css(showBtnMore, {
                    'display': 'block'
                });

                // 剪切字符串长度
                cutOffText = innerText.slice(0, maxLen) + '...';
                originalHtml = showBox.innerHTML;
                showBox.innerHTML = '';

                // 创建摘要
                var eleCutOff = document.createElement('p');
                // 创建原始demo
                var eleOriginalHtml = document.createElement('div');
                eleCutOff.className = 'mip-showmore-cutofftext';
                eleOriginalHtml.className = 'mip-showmore-originalhtml';
                eleCutOff.innerHTML = cutOffText;
                eleOriginalHtml.innerHTML = originalHtml;
                showBox.appendChild(eleCutOff);
                showBox.appendChild(eleOriginalHtml);

                // 绑定显示全部标签
                clickBtn.addEventListener('click', function () {
                    if (this.classList.contains('mip-showmore-boxshow')) {
                        util.css(eleCutOff, {
                            'display': 'block'
                        });
                        util.css(eleOriginalHtml, {
                            'display': 'none'
                        });
                        this.classList.remove('mip-showmore-boxshow');
                        changeBtnText('hide');
                    }
                    else {
                        util.css(eleCutOff, {
                            'display': 'none'
                        });
                        util.css(eleOriginalHtml, {
                            'display': 'block'
                        });
                        this.classList.add('mip-showmore-boxshow');
                        changeBtnText('show');
                    }
                });
            }
        }

        // 按钮文案显示切换
        function changeBtnText(type) {
            var btnShow = element.querySelector('.mip-showmore-btnshow');
            var btnHide = element.querySelector('.mip-showmore-btnhide');
            if (type === 'show') {
                util.css(btnShow, {
                    'display': 'none'
                });
                util.css(btnHide, {
                    'display': 'block'
                });
            }
            else {
                util.css(btnShow, {
                    'display': 'block'
                });
                util.css(btnHide, {
                    'display': 'none'
                });
            }
        }
    };
    return customElement;
});
