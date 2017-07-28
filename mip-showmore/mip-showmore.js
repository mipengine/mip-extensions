/**
 * @file mip-showmore 显示更多组件
 * @author fengchuantao,liangjiaying<jiaojiaomao220@163.com>
 * @time 2017-7
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');

    /**
     * define a showmore class based on
     *
     * @class Showmore
     * @param {Object} ele dom element
    */
    var Showmore = function (ele) {
        this.ele = ele;
        // 获取点击按钮，v1.0.0 方法
        this.clickBtn = ele.querySelector('[showmorebtn]');
        // 获取内容显示框，v1.0.0 方法
        this.showBox = this.ele.querySelector('[showmorebox]');
        // 获取动画时间
        this.animateTime = this.ele.getAttribute('animatetime') || 0;

        // 获取内容显示框，v1.1.0 方法
        if (!this.showBox) {
            this.showBox = this.ele;
        }
    };

    Showmore.prototype.init = function () {
        // 如果动画不是数字
        if (isNaN(this.animateTime)) {
            return;
        }

        // 获取高度阈值
        this.maxHeight = this.ele.getAttribute('maxheight');
        // 获取字数阈值
        this.maxLen = this.ele.getAttribute('maxlen');
        // 获取是否需要bottom渐变
        this.bottomShadow = this.ele.getAttribute('bottomshadow') === '1';
        // 渐变className
        this.bottomShadowClassName = 'linear-gradient';
        // 获取显示框显示对象
        // 处理阈值高度(高度优先于字体长度,不允许两个同时存在)
        if (this.maxHeight && isNaN(this.maxHeight)) {
            var maxHeightArr = this.maxHeight.split(':');
            var key;
            var value;
            if (maxHeightArr.length > 1) {
                key = maxHeightArr[0].trim();
                value = maxHeightArr[1].trim();

                switch (key) {
                    case 'screen':
                        this.showType = 'HEIGHTSCREEN';
                        this.maxHeight = viewport.getHeight() * value;
                        this._initHeight();
                        break;
                    case 'heightpx':
                        this.showType = 'HEIGHT';
                        this._initHeight();
                        break;
                }
            }
        }
        else if (this.maxHeight && !isNaN(this.maxHeight)) {
            this.showType = 'HEIGHT';
            this._initHeight();
        }
        else if (this.maxLen && !isNaN(this.maxLen)) {
            this.showType = 'LENGTH';
            this._maxLenFn();
        }
        else {
            this.maxHeight = 0;
            this._initHeight();
        }

        this._bindClick();
        // 避免初始加载闪现
        util.css(this.ele, {
            visibility: 'visible'
        });
    };

    Showmore.prototype._initHeight = function () {
        // 获取页面元素高度
        this.showBoxHei = util.rect.getElementOffset(this.showBox).height;
        // 如果高度大于阀值
        if (this.showBoxHei > this.maxHeight) {
            util.css(this.showBox, {
                height: this.maxHeight + 'px',
                overflow: 'hidden'
            });

            // 显示更多按钮
            var showMoreBtn = this.ele.querySelector('.mip-showmore-btnshow');
            util.css(showMoreBtn, {
                display: 'block'
            });
            // 处理bottom渐变
            this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);
        }
    };

    // 字数控制
    Showmore.prototype._maxLenFn = function () {
        // 存储原始html对象
        this.originalHtml = this.showBox.innerHTML;

        // 获取剪切后的字符串
        this.cutOffText = this._cutHtmlStr(this.maxLen);

        // 如果长度大于阀值
        if (this.originalHtml.length !== this.cutOffText.length) {
            // 显示展开更多按钮
            var showBtnMore = this.ele.querySelector('.mip-showmore-btnshow');
            util.css(showBtnMore, {
                display: 'block'
            });

            // 处理bottom渐变
            this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);

            this.cutOffText = '<p class=\'mip-showmore-abstract\'>' + this.cutOffText + '...' + '</p>';
            this.showBox.innerHTML = this.cutOffText;
        }
    };

    // 绑定显示更多按钮
    // XXX: v1.0.0 逻辑，兼容 <p showmorebtn></p>
    Showmore.prototype._bindClick = function () {
        if (!this.clickBtn) {
            return;
        }
        var showmore = this;
        this.clickBtn.addEventListener('click', function (event) {
            showmore.toggle.apply(showmore);
        });
    };

    // 高度阈值控制
    Showmore.prototype.toggle = function (event) {
        var classList = this.ele.classList;
        var clickBtn = event ? event.target : null;
        var opt = {};
        opt.aniTime = this.animateTime || 0.3;

        if (this.showType === 'LENGTH') {
            opt.oriHeight = getComputedStyle(this.showBox).height;
            if (classList.contains('mip-showmore-boxshow')) {
                // 隐藏超出字数的内容
                this.showBox.innerHTML = this.cutOffText;
                opt.tarHeight = getComputedStyle(this.showBox).height;
                this.showBox.innerHTML = this.originalHtml;
                
                opt.type = 'fold';
                opt.cbFun = function(showmore) {
                    showmore.showBox.innerHTML = showmore.cutOffText;
                    showmore._toggleClickBtn(clickBtn, 'showOpen');
                    classList.remove('mip-showmore-boxshow');
                }.bind(undefined, this);
            }
            else {
                // 显示超出字数的内容
                classList.add('mip-showmore-boxshow');
                this.showBox.innerHTML = this.originalHtml;
                opt.type = 'unfold';
                opt.cbFun = function(showmore) {
                    showmore._toggleClickBtn(clickBtn, 'showClose');
                }.bind(undefined, this);
            }
        }
        else if (this.showType === 'HEIGHT' || this.showType === 'HEIGHTSCREEN') {
            if (classList.contains('mip-showmore-boxshow')) {
                this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);
                // 隐藏超出高度的内容
                classList.remove('mip-showmore-boxshow');
                opt.type = 'fold';
                opt.tarHeight = this.maxHeight + 'px',
                opt.cbFun = function(showmore, clickBtn) {
                    showmore._toggleClickBtn(clickBtn, 'showOpen');
                }.bind(undefined, this, clickBtn);
            }
            else {
                // 显示超出高度的内容
                this.bottomShadow && this.showBox.classList.remove(this.bottomShadowClassName);
                classList.add('mip-showmore-boxshow');
                opt.type = 'unfold';
                opt.cbFun = function(showmore, clickBtn) {
                    showmore._toggleClickBtn(clickBtn, 'showClose');
                }.bind(undefined, this, clickBtn)
            }
        }
        util.fn.heightAni({
            ele: this.showBox,
            type: opt.type,
            transitionTime: opt.aniTime,
            tarHeight: opt.tarHeight,
            oriHeight: opt.oriHeight,
            cbFun: opt.cbFun
        });
    };

    Showmore.prototype._toggleClickBtn = function (clickBtn, status) {
        if (!status) {
            return;
        }
        if (status === 'showOpen') {
            // v1.1.0 显示“展开”按钮
            if (clickBtn) {
                clickBtn.innerText = clickBtn.dataset.opentext;
            }
            // v1.0.0 显示“展开”按钮
            this._changeBtnText({
                display: 'block'
            }, {
                display: 'none'
            });
        }
        else {
            // v1.1.0显示“收起”按钮
            if (clickBtn) {
                var opentext = clickBtn.innerText;
                clickBtn.innerText = clickBtn.dataset.closetext || '收起';
                clickBtn.dataset.opentext = opentext;
            }

            // v1.0.0 显示“收起”按钮
            this._changeBtnText({
                display: 'none'
            }, {
                display: 'block'
            });
        }
    };

    // 剪切字符串
    Showmore.prototype._cutHtmlStr = function (maxLen) {
        var allChildList = this.showBox.childNodes;
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
    };

    // v1.0.0 按钮文案显示切换
    Showmore.prototype._changeBtnText = function (showBtnObj, hideBtnObj) {
        var btnShow = this.ele.querySelector('.mip-showmore-btnshow');
        var btnHide = this.ele.querySelector('.mip-showmore-btnhide');
        this._changeBtnShow(btnShow, showBtnObj);
        this._changeBtnShow(btnHide, hideBtnObj);
    };

    // v1.0.0 文案切换显示
    Showmore.prototype._changeBtnShow = function (obj, cssObj) {
        util.css(obj, cssObj);
    };

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var ele = this.element;
        var showmoreObj = new Showmore(ele);
        showmoreObj.init();

        this.addEventAction('toggle', function (event) {
            showmoreObj.toggle(event);
        });

    };
    return customElement;
});
