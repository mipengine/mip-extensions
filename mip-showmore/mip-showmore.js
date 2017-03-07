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
            toggle();
        }
        else if (maxLen && !isNaN(maxLen)) {
            maxLenFn();
        }
        else {
            maxHeight = 0;
            toggle();
        }

        // 避免初始加载闪现
        util.css(element, {
            'visibility': 'visible'
        });

        // 高度阈值控制
        function toggle() {
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
                        changeBtnText({
                            'display': 'block'
                        }, {
                            'display': 'none'
                        });
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
                                'transition': 'height 0s',
                                'height': 'auto'
                            });
                        }, runtime);
                        changeBtnText({
                            'display': 'none'
                        }, {
                            'display': 'block'
                        });
                    }
                });
            }
        }

        // 字数控制
        function maxLenFn() {
            // 剪切后的字符串
            var cutOffText;
            // 存储原始html对象
            var originalHtml = showBox.innerHTML;

            // 获取剪切后的字符串
            cutOffText = cutHtmlStr(maxLen);

            // 如果长度大于阀值
            if (originalHtml.length !== cutOffText.length) {
                // 显示展开更多按钮
                var showBtnMore = element.querySelector('.mip-showmore-btnshow');
                util.css(showBtnMore, {
                    'display': 'block'
                });

                cutOffText = '<p class=\'mip-showmore-abstract\'>' + cutOffText + '...' + '</p>';
                showBox.innerHTML = cutOffText;

                // 绑定显示全部标签
                clickBtn.addEventListener('click', function () {
                    if (this.classList.contains('mip-showmore-boxshow')) {
                        showBox.innerHTML = cutOffText;
                        this.classList.remove('mip-showmore-boxshow');
                        changeBtnText({
                            'display': 'block'
                        }, {
                            'display': 'none'
                        });
                    }
                    else {
                        showBox.innerHTML = originalHtml;
                        this.classList.add('mip-showmore-boxshow');
                        changeBtnText({
                            'display': 'none'
                        }, {
                            'display': 'block'
                        });
                    }
                });
            }
        }

        // 剪切字符串
        function cutHtmlStr(maxLen) {
            var allChildList = showBox.childNodes;
            var cutHtml = '';
            var tmpNum = 0;
            var newNodeList = [];
            for (var i = 0; i < allChildList.length; i++) {
                var tmpHtml = allChildList[i].textContent.replace(/(^\s*)|(\s*$)/g, '');
                if ((cutHtml.length + tmpHtml.length) <= maxLen) { // 如果长度没有达到最大字数
                    cutHtml = cutHtml + tmpHtml;
                    tmpNum = cutHtml.length;
                    newNodeList.push(allChildList[i]);
                }
                else { // 已经大于
                    var diffNum = maxLen - tmpNum > 0 ? maxLen - tmpNum : tmpNum - maxLen;
                    var cutText = tmpHtml ? tmpHtml.slice(0, diffNum) : '';
                    allChildList[i].textContent = cutText;
                    newNodeList.push(allChildList[i]);
                    break;
                }
            }
            var endHtml = '';
            for (var j = 0; j < newNodeList.length; j++) {
                var nodeType = newNodeList[j].nodeType;
                if (nodeType === 1) {
                    endHtml = endHtml + newNodeList[j].outerHTML;
                }
                else if (nodeType === 3) {
                    endHtml = endHtml + newNodeList[j].textContent;
                }

            }
            return endHtml;
        }

        // 按钮文案显示切换
        function changeBtnText(showBtnObj, hideBtnObj) {
            var btnShow = element.querySelector('.mip-showmore-btnshow');
            var btnHide = element.querySelector('.mip-showmore-btnhide');
            changeBtnShow(btnShow, showBtnObj);
            changeBtnShow(btnHide, hideBtnObj);
        }

        // 文案切换显示
        function changeBtnShow(obj, cssObj) {
            util.css(obj, cssObj);
        }
    };
    return customElement;
});
