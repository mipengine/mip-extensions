/**
 * @file 生成DOM,初始化事件
 * @author zhangyiding@corp.netease.com
 */

/* global define */
define(function (require) {
    var resizeImg = require('./utils/resizeImg');
    var display = require('./utils/displayState');

    var currentImage;
    var currentIndicator;

    var imageList;
    var titleList;
    var indicatorList;

    var openApp;
    var titleWidth;
    var total = 4;
    var index = 0;
    var interval;

    /**
     * 创建DOM
     *
     * @param {Array} list  列表数据
     * @return {HTMLDivElement|boolean} 页脚根结点
     */
    function build(list) {
        if (!list || !list.length || !display.shouldRenderFooter()) {
            return false;
        }
        var rootElement = document.createElement('div');
        rootElement.classList.add('doc-footer');

        var scrollTitleHTML = '';
        var scrollImgHTML = '';
        var scrollIndicatorHTML = '';
        var imgSize = {
            height: 82,
            width: 82
        };

        list.forEach(function (item) {
            scrollTitleHTML += (
                '<li class="scroll-title no-transition" data-docid=' + item.docId + '>\
                    <span class="title">' + item.title + '</span>\
                </li>'
            );
            scrollImgHTML += (
                '<li class="scroll-image">\
                    <img src="' + resizeImg(item.imgsrc, imgSize) + '" alt="' + item.title + '"/>\
                </li>'
            );
            scrollIndicatorHTML += (
                '<li class="scroll-indicator"></li>'
            );
        });

        rootElement.innerHTML = (
            '<a class="open-app">\
                <ul class="scroll-image-wrapper">\
                ' + scrollImgHTML + '\
                </ul>\
                <div class="scroll-title-wrapper">\
                    <ul class="scroll-title-list">\
                        ' + scrollTitleHTML + '\
                    </ul>\
                </div >\
                <ul class="scroll-panel clearfix">\
            ' + scrollIndicatorHTML + '\
                </ul>\
                <div class="close-btn"></div>\
                <div class="open-btn"><span>打开</span></div>\
            </a>'
        );
        return rootElement;
    }

    /**
     * 初始化控件
     *
     * @param {HTMLDivElement} rootElement 根结点(已插入document)
     */
    function initControl(rootElement) {
        var closeButton = rootElement.querySelector('.close-btn');

        openApp = rootElement.querySelector('.open-app');
        imageList = rootElement.querySelectorAll('.scroll-image');
        indicatorList = rootElement.querySelectorAll('.scroll-indicator');
        titleList = rootElement.querySelectorAll('.scroll-title');

        titleWidth = parseFloat(window.getComputedStyle(titleList[0]).width);
        var docid = titleList[0].dataset.docid;
        openApp.href = 'https://3g.163.com/wap/special/mip_open_app/#' + docid;

        // 标题初始位置
        [].forEach.call(titleList, function (scrollTitle, index) {
            scrollTitle.style.transform = 'translateX(' + titleWidth * index + 'px)';
            scrollTitle._offset = index;
            requestAnimationFrame(function () {
                scrollTitle.classList.remove('no-transition');
            });
        });

        // 显示第一张图,第一个轮播指示器
        currentImage = imageList[0];
        currentImage.classList.add('current');

        currentIndicator = indicatorList[0];
        currentIndicator.classList.add('scroll-indicator-current');

        // 关闭
        closeButton.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            rootElement.classList.remove('doc-footer-show');
            if (interval) {
                clearInterval(interval);
            }
            display.setLastCloseTime();
        });

        // 跑马灯开始
        setTimeout(function () {
            rootElement.classList.add('doc-footer-show');
            interval = setInterval(function () {
                next();
            }, 2000);
        }, 800);
    }

    /**
     * 切换下一帧
     */
    function next() {
        index++;
        if (index === total) {
            index = 0;
        }

        // 移动各个标题
        [].forEach.call(titleList, function (scrollItem) {
            scrollItem._offset--;
            if (scrollItem._offset < -1) { // 左边第二个元素移到最右
                scrollItem._offset = total - 2;
                scrollItem.classList.add('no-transition');
            }
            requestAnimationFrame(function () {
                var translate = titleWidth * scrollItem._offset;
                scrollItem.style.transform = scrollItem.style.webkitTransform = 'translateX(' + translate + 'px)';
                requestAnimationFrame(function () {
                    scrollItem.classList.remove('no-transition');
                });
            });
            if (scrollItem._offset === 0) {
                var docid = scrollItem.dataset.docid;
                openApp.href = 'http://3g.163.com/wap/special/mip_open_app/#' + docid;
            }
        });

        currentImage.classList.remove('current');
        currentImage = imageList[index];
        currentImage.classList.add('current');

        currentIndicator.classList.remove('scroll-indicator-current');
        currentIndicator = indicatorList[index];
        currentIndicator.classList.add('scroll-indicator-current');
    }

    return {
        build: build,
        initControl: initControl,
        next: next
    };
});
