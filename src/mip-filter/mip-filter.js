/**
 * @file 筛选
 * @author liangjiaying@baidu.com
 * @time 2016.09
 */
define(function (require) {
    var customElement = require('customElement').create();

    /**
     * build
     */
    function build() {
        var element = this.element;

        var filter = new Filter({
            filterWrap: element.querySelector(element.getAttribute('mip-filter-filterWrap')),
            itemWrap: element.querySelector(element.getAttribute('mip-filter-itemWrap')),
            enableHash: element.getAttribute('mip-filter-enableHash'),
            filterText: element.getAttribute('mip-filter-filterText') || ""
        });

        filter.init();
    }

    var util = {
        // used multiple times
        containReg: function (txt) {
            return new RegExp('(\\s+|^)' + txt + '(\\s+|$)');
        },
        // check if dom has certain class
        hasClass: function (ele, cls) {
            return ele.className.match(this.containReg(cls));
        },
        // add certain class to dom
        addClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                return;
            }
            ele.className = (ele.className + ' ' + cls).trim();
        },
        // remove certain class from dom
        removeClass: function (ele, cls) {
            if (!this.hasClass(ele, cls)) {
                return;
            }
            ele.className = ele.className.replace(this.containReg(cls), ' ').trim();
        },
        // toggle certain class of dom
        toggleClass: function (ele, cls) {
            if (this.hasClass(ele, cls)) {
                this.removeClass(ele, cls);
            } else {
                this.addClass(ele, cls);
            }
        }
    };
    /**
    * define a Filter,
    * opt.filterWrap: mandatory. dom wrapper of filter
    * opt.itemWrap: mandatory. dom wrapper of item
    * opt.mobileWidth: maximum width to show wise layout
    * opt.enableHash: weather use window hash.
    * opt.filterText: text shown when filter is activated.
    */
    function Filter(opt) {
        var _this = this;
        if (!opt || !opt.filterWrap || !opt.itemWrap) {
            return;
        }

        opt.mobileWidth = opt.mobileWidth || 767;
        opt.emptyTip = opt.emptyTip || '没有符合的内容';
        opt.enableHash = (opt.enableHash && opt.enableHash==="false") ? false : true;

        /**
        * shoot: at first time,
        * add filter color and text to default-"none"
        */
        this.init = function () {
            var hash = '';
            var filter = '';
            if (opt.enableHash) {
                hash = window.location.hash;
            }
            if(hash) {
                filter = hash.replace('#','');
            } else {
                filter = 'all';
            }
            var filterTarget = opt.filterWrap.querySelector('[data-filtertype="' + filter + '"]')
            this.filterSelect(filterTarget);
        };

        /**
        * shoot: when a filter is clicked.
        * add filter color and text to selected one.
        */
        this.filterSelect = function (target) {
            var oldEle = opt.filterWrap.querySelector('.active') || '';
            var newEle = target;
            if(oldEle) {
                util.removeClass(oldEle, 'active')
            }
            util.addClass(target, 'active');

            var text = newEle.textContent.replace(newEle.querySelector('.filter-num').textContent, '');
            if (text === '查看全部') {
                text = '无';
            }
            opt.filterWrap.querySelector('.filter-result').innerText = opt.filterText + text;
            // in wise, when select, collapse filter
            if (window.innerWidth <= opt.mobileWidth && oldEle) {
                _this.toggleFilter();
            }
            _this.applyFilter(newEle.dataset.filtertype);
        };

        /**
        * shoot: on mobile when filter btn is clicked.
        * slide up or down the whole filter.
        */
        this.toggleFilter = function () {
            var listWrap = opt.filterWrap.querySelector('.filter-list');

            // hide and show filter list only on wise
            if (window.innerWidth <= opt.mobileWidth) {

                if (util.hasClass(listWrap, 'show')) {
                    // hide filter list
                    listWrap.style.height = '0px';
                } else {
                    // show filter list
                    listWrap.style.transition = 'none';
                    listWrap.style.WebkitTransition = 'none';
                    listWrap.style.height = 'auto';
                    var height = getComputedStyle(listWrap).height;

                    // target height acquired, now start the animation
                    listWrap.style.height = '0px';
                    listWrap.style.transition = 'height 0.3s';
                    setTimeout(function () {
                        // trick: in setTimeout, or there won't be any animation
                        listWrap.style.height = height;
                    }, 10);
                }
                util.toggleClass(listWrap, 'show');
            }
        };

        /**
        * shoot: when filter btn is clicked.
        * hide items that cant pass the filter.
        */
        this.applyFilter = function (filter) {
            var num = 0;
            //hack: arr.forEach() cannot be used in uc&qq browser
            for (var i = 0; i < opt.itemWrap.querySelectorAll('.filter-item').length; i++) {
                var item = opt.itemWrap.querySelectorAll('.filter-item')[i];
                if (item.dataset.filtertype.match(util.containReg(filter)) || filter === 'all') {
                    // show item
                    num ++;
                    item.style.display = 'block';
                } else {
                    // hide item
                    item.style.display = 'none';
                }
            }
            if (!num) {
                // no item can be shown, add "no item" text
                if (!opt.itemWrap.querySelector('.filter-emptytip')) {
                    var emptyTip = document.createElement('div');
                    util.addClass(emptyTip, 'filter-emptytip');
                    emptyTip.innerHTML = opt.emptyTip;
                    opt.itemWrap.appendChild(emptyTip);
                } else {}
            } else {
                var emptyTip = opt.itemWrap.querySelector('.filter-emptytip');
                if (emptyTip) {
                    opt.itemWrap.removeChild(emptyTip);
                }
            }
            if (opt.enableHash) {
                window.location.hash = filter;
            }
            window.scrollTo(0,0);
        };

        /**
        * add click event to all filters
        * when clicked, select the filter,
        * if wise, collapse filter list.
        */
        for (var i = 0; i < opt.filterWrap.querySelectorAll('.filter-link').length; i++) {
            var ele = opt.filterWrap.querySelectorAll('.filter-link')[i];
            ele.addEventListener('click', function(e) {
                _this.filterSelect(e.target)
            });
        }

        /**
        * add click event to filter result, which show only on wise.
        * when clicked, uncollapse and collapse filter list.
        */
        opt.filterWrap.querySelector('.filter-result').addEventListener('click', _this.toggleFilter);
    }

    // 初始化
    customElement.prototype.build = build;
    return customElement;
});


