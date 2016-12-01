/**
 * @author: Keith
 * @date: 2016-11-24
 * @file: mip-ls-pagination.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var currentPage = 0;
    var zp = require('zepto');

    function createPagination(elem) {
        var pageSize = 5;
        if (elem.hasAttribute('data-page-size')) {
            pageSize = Number(elem.getAttribute('data-page-size'));
        }
        // 创建页码选择器
        var items = elem.querySelectorAll('li');
        var pages = Math.ceil(items.length / pageSize);
        var elemBox = elem.getBoundingClientRect();
        var parentElem = elem.parentNode;

        var paginationElem = document.createElement('div');
        paginationElem.className = 'pagination';
        paginationElem.style.width = elemBox.width + 'px';
        parentElem.appendChild(paginationElem);

        var firstPageElem = document.createElement('div');
        firstPageElem.className = 'first';
        firstPageElem.innerHTML = '首页';
        paginationElem.appendChild(firstPageElem);

        var prevPageElem = document.createElement('div');
        prevPageElem.className = 'prev';
        prevPageElem.innerHTML = '上一页';
        paginationElem.appendChild(prevPageElem);

        var chooserElem = document.createElement('select');
        chooserElem.className = 'choose';
        paginationElem.appendChild(chooserElem);
        for (var i = 0; i < pages; i++) {
            chooserElem.innerHTML += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
        }

        var nextPageElem = document.createElement('div');
        nextPageElem.className = 'next';
        nextPageElem.innerHTML = '下一页';
        paginationElem.appendChild(nextPageElem);

        var lastPageElem = document.createElement('div');
        lastPageElem.className = 'last';
        lastPageElem.innerHTML = '末页';
        paginationElem.appendChild(lastPageElem);

        zp(firstPageElem).on('click', function () {
            choosePage(0, elem);
        });
        zp(lastPageElem).on('click', function () {
            choosePage(pages, elem);
        });
        zp(prevPageElem).on('click', function () {
            if (currentPage > 0) {
                choosePage(currentPage - 1, elem);
            }
        });
        zp(nextPageElem).on('click', function () {
            if (currentPage < pages - 1) {
                choosePage(currentPage + 1, elem);
            }
        });
        zp(chooserElem).on('click', function () {
            choosePage(Number(chooserElem.value), elem);
        });
    }

    function init(elem) {
        choosePage(0, elem);

        createPagination(elem);
    }

    function choosePage(index, elem) {
        var pageSize = 5;
        if (elem.hasAttribute('data-page-size')) {
            pageSize = Number(elem.getAttribute('data-page-size'));
        }
        var items = elem.querySelectorAll('li');
        var pages = Math.ceil(items.length / pageSize);

        currentPage = index;

        // 切换页码时，修改location.search值
        location.search = '?p=' + index;

        var prevElem = elem.querySelector('.prev');
        var nextElem = elem.querySelector('.next');
        if (currentPage === 0) {
            !prevElem.classList.contains('disabled') && prevElem.classList.add('disabled');
            nextElem.classList.contains('disabled') && nextElem.classList.remove('disabled');
        } else if (currentPage === (pages - 1)) {
            !nextElem.classList.contains('disabled') && nextElem.classList.add('disabled');
            prevElem.classList.contains('disabled') && prevElem.classList.remove('disabled');
        } else {
            prevElem.classList.contains('disabled') && prevElem.classList.remove('disabled');
            nextElem.classList.contains('disabled') && nextElem.classList.remove('disabled');
        }
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        init(element);
    };
    return customElem;
});
