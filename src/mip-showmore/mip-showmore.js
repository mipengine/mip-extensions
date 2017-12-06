/**
 * @file mip-showmore 显示更多组件
 * @author fengchuantao,liangjiaying<jiaojiaomao220@163.com>
 * @time 2017-7
 */

define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var viewport = require('viewport');
    var timeoutArray = [];

    // 匹配节点是否在按钮中
    function matchOriginTarget (id, node) {
        while (node.parentNode) {
            var attr = node.getAttribute('on');
            if (attr && attr.indexOf('tap:' + id) === 0) {
                return node;
            }
            node = node.parentNode;
        }
        return node;
    }

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
        this.clickBtnSpan = this.clickBtn && this.clickBtn.querySelector('.mip-showmore-btnshow');
        // 获取内容显示框，v1.0.0 方法
        this.showBox = this.ele.querySelector('[showmorebox]');
        // 获取动画时间, 默认为0.24，兼容0的写法
        this.animateTime = this.ele.getAttribute('animatetime');
        if (this.animateTime === null || isNaN(this.animateTime)) {
            // if transition time is not set, set into 0.24s
            this.animateTime = 0.24;
        }
        // 折叠高度类型
        this.heightType = ['HEIGHTSCREEN', 'HEIGHT', 'LENGTH'];
        // 对应的收起按钮
        this.btn = document.querySelector('div[on="tap:' + this.ele.id +  '.toggle"]');
        this.eleid = ele.id;
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
                        this.showType = this.heightType[0];
                        this.maxHeight = viewport.getHeight() * value;
                        this._initHeight();
                        break;
                    case 'heightpx':
                        this.showType = this.heightType[1];
                        this._initHeight();
                        break;
                    default:
                        break;
                }
            }
        }
        else if (this.maxHeight && !isNaN(this.maxHeight)) {
            this.showType = this.heightType[1];
            this._initHeight();
        }
        else if (this.maxLen && !isNaN(this.maxLen)) {
            this.showType = this.heightType[2];
            this._initTextLength();
        }
        else {
            this.maxHeight = 0;
            this._initHeight();
        }

        // 避免初始加载闪现
        util.css(this.ele, {
            visibility: 'visible'
        });

        // 保存点击按钮当前display状态，兼容v1.0.0和v1.1.0
        var display = this.clickBtnSpan && getComputedStyle(this.clickBtnSpan).display;
        var displayNew = this.btn && getComputedStyle(this.btn).display
        this.btnDisplay = displayNew || display;
    };

    // 改变按钮的样式值 - showmore改为隐藏状态, 按钮为“收起”
    Showmore.prototype.changeBtnStyle = function (type) {
        // v1.0.0显示更多按钮
        var showMoreBtn = this.ele.querySelector('.mip-showmore-btnshow');
        var showMoreBtnHide = this.ele.querySelector('.mip-showmore-btnhide');

        // v1.1.0选中 showmore的div
        var showMoreBtn2 = this.btn || showMoreBtn;
        if (type === 'fold') {
            util.css(showMoreBtn2, 'display', 'inline-block');
            showMoreBtnHide && util.css(showMoreBtnHide, 'display', 'none');
            // 处理bottom渐变
            this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);
        } else if ((type === 'unfold')) {
            util.css(showMoreBtn2, 'display', 'none');
            // showMoreBtnHide && util.css(showMoreBtnHide, 'display', 'inline-block');

            // 处理bottom渐变
            this.bottomShadow && this.showBox.classList.remove(this.bottomShadowClassName);
        }
    };

    Showmore.prototype._initHeight = function () {
        // 获取页面元素高度
        var height;
        if (this.showBox.style.height && this.showBox.style.height.match('px')) {
            height = getHeightUnfold(this.showBox);
        } else {
            height = util.rect.getElementOffset(this.showBox).height;
        }
        // 如果高度大于阈值
        if (height > this.maxHeight) {
            util.css(this.showBox, {
                'height': this.maxHeight + 'px',
                'overflow': 'hidden'
            });
            // 改变按钮的样式值 - 改为隐藏状态
            this.changeBtnStyle('fold');
        } else {
            util.css(this.showBox, height, 'auto');
            this.changeBtnStyle('unfold');
        }
    };

    // 字数控制
    Showmore.prototype._initTextLength = function () {
        // 防止重复初始化
        if(this.oriDiv) {
            return
        }
        // 存储原始html文字 & NODE
        var originalHtml = this.showBox.innerHTML;

        // 获取剪切后的字符串
        var cutOffText = this._cutHtmlStr(this.maxLen);

        // 如果长度大于阈值，复制修改前内容到.mip-showmore-originText,
        // 剪切后的内容保存在.mip-showmore-abstract，未来修改内容，
        // 只需要针对这两个DOM做展示/隐藏处理
        if (originalHtml.length !== cutOffText.length) {
            // 改变按钮的样式值 - 改为隐藏状态
            this.changeBtnStyle('fold');

            // 清除被_cutHtmlStr处理之后的原始内容
            this.showBox.innerHTML = '';
            // 保存剪切前 dom，插入文档
            this.oriDiv = document.createElement('div');
            this.oriDiv.setAttribute('class', 'mip-showmore-originText mip-showmore-nodisplay');
            this.oriDiv.innerHTML = originalHtml;
            this.showBox.appendChild(this.oriDiv);

            // 创建剪切后 dom, 插入文档
            this.cutDiv = document.createElement('div');
            this.cutDiv.setAttribute('class', 'mip-showmore-abstract');
            this.cutDiv.innerHTML = '<p>' + cutOffText + '...' + '</p>';
            this.showBox.appendChild(this.cutDiv);
        }
    };

    // 绑定显示更多按钮
    // XXX: v1.0.0 逻辑，兼容 <p showmorebtn></p>
    Showmore.prototype._bindClick = function () {
        if (!this.clickBtn) {
            return;
        }
        var showmore = this;
        this.clickBtn.addEventListener('click', function () {
            showmore.toggle.apply(showmore);
        }, false);

    };
    // 点击时按钮添加class
    Showmore.prototype.addClassWhenUnfold = function () {
        var btnShowmore = this.btn;
        btnShowmore ? btnShowmore.classList.add('mip-showmore-btn-hide') : '';
    };
    // 高度阈值控制
    Showmore.prototype.toggle = function (event) {
        var me = this;
        var classList = this.ele.classList;
        var clickBtn = event && event.target
            ? matchOriginTarget(this.ele.id.trim(), event.target)
            : null;
        var opt = {};
        opt.aniTime = this.animateTime;
        if (this.showType === this.heightType[2]) {
            // 高度限制
            opt.oriHeight = util.rect.getElementOffset(this.showBox).height + 'px';
            var originDom = this.oriDiv;
            var cutDom = this.cutDiv;

            if (classList.contains('mip-showmore-boxshow')) {
                // 隐藏超出字数的内容
                originDom.classList.add('mip-showmore-nodisplay');
                cutDom.classList.remove('mip-showmore-nodisplay');
                opt.tarHeight = util.rect.getElementOffset(this.showBox).height + 'px';
                originDom.classList.remove('mip-showmore-nodisplay');
                cutDom.classList.add('mip-showmore-nodisplay');
                this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);
                opt.type = 'fold';
                opt.cbFun = function (showmore) {
                    showmore._toggleClickBtn(clickBtn, 'showOpen');
                    classList.remove('mip-showmore-boxshow');
                    originDom.classList.add('mip-showmore-nodisplay');
                    cutDom.classList.remove('mip-showmore-nodisplay');
                }.bind(undefined, this);
            }
            else {
                // 显示超出字数的内容
                this.bottomShadow && this.showBox.classList.remove(this.bottomShadowClassName);
                opt.type = 'unfold';
                originDom.classList.remove('mip-showmore-nodisplay');
                cutDom.classList.add('mip-showmore-nodisplay');
                opt.tarHeight = getHeightUnfold(this.showBox) + 'px';
                this.showBox.style.height = this.maxHeight + 'px';
                opt.cbFun = function (showmore) {
                    showmore._toggleClickBtn(clickBtn, 'showClose');
                    classList.add('mip-showmore-boxshow');
                    me.addClassWhenUnfold();
                }.bind(undefined, this);
            }
        }
        else if (this.showType === this.heightType[1] || this.showType === this.heightType[0]) {
            if (classList.contains('mip-showmore-boxshow')) {
                this.bottomShadow && this.showBox.classList.add(this.bottomShadowClassName);
                // 隐藏超出高度的内容
                classList.remove('mip-showmore-boxshow');
                opt.type = 'fold';
                opt.tarHeight = this.maxHeight + 'px';
                opt.cbFun = function (showmore, clickBtn) {
                    showmore._toggleClickBtn(clickBtn, 'showOpen');
                }.bind(undefined, this, clickBtn);
            }
            else {
                // 显示超出高度的内容
                this.bottomShadow && this.showBox.classList.remove(this.bottomShadowClassName);
                classList.add('mip-showmore-boxshow');
                opt.type = 'unfold';
                opt.cbFun = function (showmore, clickBtn) {
                    showmore._toggleClickBtn(clickBtn, 'showClose');
                    showmore.ele.style.height = 'auto';
                    me.addClassWhenUnfold();
                }.bind(undefined, this, clickBtn);
            }
        }
        heightAni({
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
        var closeclass;
        if (clickBtn && clickBtn.dataset && clickBtn.dataset.closeclass) {
            closeclass = clickBtn.dataset.closeclass;
        }
        if (status === 'showOpen') {
            // v1.1.0 显示“展开”按钮
            if (clickBtn) {
                if (closeclass) {
                    clickBtn.classList.remove(closeclass);
                }
                else {
                    clickBtn.innerText = clickBtn.dataset.opentext;
                }
            }
            // v1.0.0 显示“展开”按钮
            this._changeBtnText({
                display: this.btnDisplay
            }, {
                display: 'none'
            });
        }
        else {
            // v1.1.0显示“收起”按钮
            if (clickBtn) {
                if (closeclass) {
                    clickBtn.classList.add(closeclass);
                }
                else {
                    var opentext = clickBtn.innerText;
                    clickBtn.innerText = clickBtn.dataset.closetext || '收起';
                    clickBtn.dataset.opentext = opentext;
                }
            }
            // v1.0.0 显示“收起”按钮
            this._changeBtnText({
                display: 'none'
            }, {
                display: this.btnDisplay
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
         * Make height transiton for element that has unknown height.
         * height transiton from 0px/40px to whatever height element will be.
         *
         * author&maintainer liangjiaying<jiaojiaomao220@163.com>
         *
         * @param  {Object} opt options
         * @example
         * {
         *     "ele": document.getElementById('id1'), // target DOM
         *     "type": "fold",                  // "fold" or "unfold"
         *     "transitionTime": "0.3",         // seconds, animation time
         *     "tarHeight": "140px",            // DOM height when animation ends
         *     "oriHeight": "20px",             // DOM height when animation begins
         *     "cbFun": function() {}.bind()    //callback, exec after animation
         * }
     */
    function heightAni(opt) {
        var element = opt.ele;
        var type = opt.type;
        var transitionTime;
        var timeoutArr = timeoutArray || [];

        if (!type || !element) {
            return;
        }

        if (opt.transitionTime === undefined || isNaN(opt.transitionTime)) {
            // if transition time is not set, set into 0.24s
            transitionTime = 0.24;
        }
        else {
            // '0.2s' -> 0.2, 20 -> 1, -0.5 -> 0.5
            transitionTime = Math.min(parseFloat(opt.transitionTime), 1);
        }

        // use ?: to make sure oriHeight won't be rewrite when opt.oriHeight is set to 0
        var oriHeight = (opt.oriHeight !== undefined ? opt.oriHeight : getComputedStyle(element).height);
        var tarHeight;
        var cbFun = opt.cbFun || function () {};

        if (type === 'unfold') {

            // make sure tarHeight won't be rewrite when opt.tarHeight is set to 0
            if (opt.tarHeight !== undefined) {
                tarHeight = opt.tarHeight;
            }
            else {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
                tarHeight = getComputedStyle(element).height;
            }

            // set height to auto after transition,
            // in case of height change of inside element later.
            var timeout1 = setTimeout(function () {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
            }, transitionTime * 1000);
            timeoutArr[0] = timeout1;
        }
        else if (type === 'fold') {
            tarHeight = opt.tarHeight || 0;
        }

        element.style.height = oriHeight;
        // now start the animation
        var timeout2 = setTimeout(function () {
            element.style.transition = 'height ' + transitionTime + 's';
            // XXX: in setTimeout, or there won't be any animation
            element.style.height = tarHeight;
        }, 10);
        // after transition, exec callback functions
        var timeout3 = setTimeout(function () {
            cbFun();
        }, transitionTime * 1000);

        // save timeout, for later clearTimeout
        timeoutArr[element.id] = timeoutArr[element.id] || [];
        timeoutArr[element.id][1] = timeout2;
        timeoutArr[element.id][2] = timeout3;
    }

    /**
     * get real height of DOM without height restrictions
     *
     * @param  {Object} dom some dom
     * @return {number}     height
     */
    function getHeightUnfold (dom) {
        var fakeNode = document.createElement('div');
        var style = getComputedStyle(dom);
        fakeNode.innerHTML = dom.innerHTML;

        fakeNode.style.padding = style.padding;
        fakeNode.style.margin = style.margin;
        fakeNode.style.border = style.border;

        fakeNode.style.position = 'absolute';
        // 先插入再改样式，以防元素属性在createdCallback中被添加覆盖
        dom.parentNode.insertBefore(fakeNode, dom);
        fakeNode.style.height = 'auto';
        fakeNode.style.visibility = 'hidden';

        var height = util.rect.getElementOffset(fakeNode).height;
        dom.parentNode.removeChild(fakeNode);

        return height;
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var me = this;
        var ele = this.element;
        var showmoreObj = new Showmore(ele);
        showmoreObj.init();
        showmoreObj._bindClick();

        this.addEventAction('toggle', function (event) {
            showmoreObj.toggle(event);
        });

        window.addEventListener('orientationchange', function() {
            showmoreObj.init();
        }, false);
    };

    // when remove node, clear timeout
    customElement.prototype.detachedCallback = function () {
        var tArr = timeoutArray && timeoutArray[this.element.id] || [];
        for (var i = 0; i < tArr.length; i++) {
            window.clearTimeout(tArr[i]);
        }
    };


    return customElement;
});