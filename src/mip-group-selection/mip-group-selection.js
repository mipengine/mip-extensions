/**
 * @file mip-city-selection 组件
 * @author Jenny_L
 * TODO:
 * 1. 标题吸顶
 * 2. 侧边栏选择时tip提示
 * 3. 历史记录
 * 4. 可选样式布局，一列三个，一列一个
 * 5. iphone下scroll 动画
 */

define(function (require) {
    'use strict';

    var groupSelection = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');
    var viewport = require('viewport');
    var util = require('util');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    groupSelection.prototype.firstInviewCallback = function () {
        var me = this;
        var ele = this.element;
        var dataUrl = ele.dataset.src;

        // 从本地和远程获取数据
        this.getData(dataUrl).then(function (data) {
            if (!data) {
                console.error('mip-city-selection 需要配置分组选项。可以配置到组件中，也可以配置远程数据。');
            }
            return templates.render(ele, data);
        }).then(function (html) {
            me.renderHtml(html);
            // 修改最下方分组的样式，增加marginBottom, 保证滚动后分组标题可以在页面最上方
            me.modifyMarginBottom();
            // 绑定侧边栏快捷选择事件
            me.bindSidebarClickEvent();
            // 绑定列表元素选择事件
            me.bindItemClickEvent();
        }, function (dat) {
            console.error(dat);
        });
    };

    /**
     * 获取数据
     *
     * @param  {string} url 远程数据 URL
     * @return {Object}     Promise
     */
    groupSelection.prototype.getData = function getData(url) {
        var ele = this.element;
        var groupData;

        // 远程获取数据是异步的，需要promise一下
        return new Promise(function (resolve, reject) {
            if (url) {
                // 优先远程获取数据，覆盖本地配置数据
                fetch(url, {
                    credentials: 'include'
                }).then(function (res) {
                    if (res.ok) {
                        res.json().then(function (data) {
                            resolve(data);
                        });
                    }
                    else {
                        reject('mip-city-selection 组件 Fetch 请求失败!');
                    }
                }).catch(function (e) {
                    reject('mip-city-selection 组件 Fetch 请求失败!');
                });
            }
            else if (groupData = ele.querySelector('script[type="application/json"]')) {
                // 读取在页面中配置的数据
                try {
                    groupData = JSON.parse(groupData.textContent);
                }
                catch (e) {
                    reject('mip-city-selection 组件 json 配置错误, 请检查 json 格式。');
                }
                resolve(groupData);
            }

        });
    };

    /**
     * 获取分组配置信息，渲染备选项和右侧快速选择列表
     *
     * @param {Object} html 要被渲染的数据
     */
    groupSelection.prototype.renderHtml = function renderHtml(html) {
        var ele = this.element;
        var wrapper = document.createElement('div');
        wrapper.classList.add('mip-city-selection-wrapper');
        wrapper.innerHTML = html;
        ele.appendChild(wrapper);
    };

    /**
     * 修改最下方分组的样式，增加marginBottom, 保证滚动后分组标题可以在页面最上方
     */
    groupSelection.prototype.modifyMarginBottom = function modifyMarginBottom() {
        var lastGroup = this.element.querySelector('.mip-city-selection-wrapper .mip-group-selection-content').lastElementChild;
        lastGroup.style.marginBottom = viewport.getHeight() - lastGroup.getBoundingClientRect().height - 10 + 'px';
    };

    /**
     * 绑定侧边栏快捷选择事件
     */
    groupSelection.prototype.bindSidebarClickEvent = function bindSidebarClickEvent() {
        var me = this;
        var ele = this.element;

        util.event.delegate(ele, '.mip-group-selection-link', 'click', sidebarButtonClickHandler);
        // 处理侧边栏每个选项按钮点击事件
        function sidebarButtonClickHandler(e) {
            var button = e.target;
            var targetAnchor = button.dataset.targetAnchor;
            // 滚动待选列表到指定分组
            me.scrollToAnchor(targetAnchor);
            // 显示提示词
            me.showAnchorTip(targetAnchor);
        }
    };

    /**
     * 滚动待选列表到指定分组
     *
     * @param {string} anchor 跳转目标
     */
    groupSelection.prototype.scrollToAnchor = function (anchor) {
        var anchorElement = this.element.querySelector('[data-anchor=' + anchor + ']');
        // 直接使用scrollBy + behavior 在安卓系统5 会报错。但在iphone4s 下不执行也不报错
        try {
            window.scrollBy({
                behavior: 'smooth',
                top: anchorElement.getBoundingClientRect().top - 10
            });
        }
        catch (e) {
        }
        // 兜底效果，再scroll一次
        window.scrollBy(0, anchorElement.getBoundingClientRect().top - 10);
    };

    /**
     * 显示提示词
     */
    groupSelection.prototype.showAnchorTip = function () {};

    /**
     * 绑定列表元素选择事件
     */
    groupSelection.prototype.bindItemClickEvent = function () {
        var ele = this.element;

        util.event.delegate(ele, '.mip-group-selection-item', 'click', itemClickHandler);
        // 处理列表每个选项按钮点击事件
        function itemClickHandler(e) {
            var itemData = e.target && e.target.dataset;
            e.data = itemData;
            /* globals MIP */
            MIP.setData(e.data);
            viewer.eventAction.execute('selected', ele, e);
        }
    };

    return groupSelection;
});
