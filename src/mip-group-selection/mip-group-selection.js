/**
 * @file mip-city-selection 组件
 * @author
 * TODO:
 * 1. 标题吸顶
 * 2. 侧边栏选择时tip提示
 * 3. 历史记录
 * 4. 可选样式布局，一列三个，一列一个
 * 5. 'select' 事件说明，从外部监听
 */

define(function (require) {
    'use strict';

    var groupSelection = require('customElement').create();
    var templates = require('templates');
    var viewer = require('viewer');
    var viewport = require('viewport');

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    groupSelection.prototype.firstInviewCallback = function () {
        var me = this;
        var ele = this.element;

        // 获取分组配置信息，渲染备选项和右侧快速选择列表
        var renderPromise= this.renderHtml();
        renderPromise.then(function(){
            // 修改最下方分组的样式，增加marginBottom, 保证滚动后分组标题可以在页面最上方
            me.modifyMarginBottom();
            // 绑定侧边栏快捷选择事件
            me.bindSidebarClickEvent();
            // 绑定列表元素选择事件
            me.bindItemClickEvent();
        }, function(data) {
            console.log(data);
        });
    };

    /**
     * 获取分组配置信息，渲染备选项和右侧快速选择列表
     * @return {[type]} [description]
     */
    groupSelection.prototype.renderHtml = function (resolve, reject) {
    	var ele = this.element;
    	var cityData = ele.querySelector('script[type="application/json"]');

        var renderPromise = new Promise(function(resolve, reject) {
            try {
            	if (!cityData) {
            		reject('mip-city-selection 需要配置分组备选项。');
            	}
            	cityData = JSON.parse(cityData.textContent);
            } catch (e) {
            	reject('mip-city-selection 组件 json 配置错误, 请检查 json 格式。')
            }


            // 根据json配置渲染所有分组备选项
            templates.render(ele, cityData).then(function (html) {
                var wrapper = document.createElement('div');
                wrapper.classList = 'mip-city-selection-wrapper';
                wrapper.innerHTML = html;
                ele.appendChild(wrapper);
                resolve();
            });
        });
        return renderPromise; 	
    }

    /**
     * 修改最下方分组的样式，增加marginBottom, 保证滚动后分组标题可以在页面最上方
     * @return {[type]} [description]
     */
    groupSelection.prototype.modifyMarginBottom = function() {
        var lastGroup = this.element.querySelector('.mip-group-selection-content').lastElementChild;
        lastGroup.style.marginBottom = viewport.getHeight() - lastGroup.getBoundingClientRect().height + 'px'
    }

    /**
     * 绑定侧边栏快捷选择事件
     * @return {[type]} [description]
     */
    groupSelection.prototype.bindSidebarClickEvent = function () {
        var me = this;
        var ele = this.element;
        var sidebarButtons = ele.querySelectorAll('.mip-group-selection-link');
        for (var i = 0; i < sidebarButtons.length; i++) {
            var sidebarButton = sidebarButtons[i];
            sidebarButton.addEventListener('click', sidebarButtonClickHandler, false);
        }

        // 处理侧边栏每个选项按钮点击事件
        function sidebarButtonClickHandler (e) {
            var button = event.currentTarget;
            var targetAnchor = button.dataset.targetAnchor;
            // 滚动待选列表到指定分组
            me.scrollToAnchor(targetAnchor);
            // 显示提示词
            me.showAnchorTip(targetAnchor);
        }
    }

    /**
     * 滚动待选列表到指定分组
     * @return {[type]} [description]
     */
    groupSelection.prototype.scrollToAnchor = function (anchor) {
        var anchorElement = this.element.querySelector('[data-anchor=' + anchor + ']');
        window.scrollBy({
            "behavior": "smooth",
            "top": anchorElement.getBoundingClientRect().top - 10
        });
    }

    /**
     * 显示提示词
     * @return {[type]} [description]
     */
    groupSelection.prototype.showAnchorTip = function (anchor) {
    }

    /**
     * 绑定列表元素选择事件
     * @return {[type]} [description]
     */
    groupSelection.prototype.bindItemClickEvent = function () {
        var ele = this.element;
        var me = this;
        var items = ele.querySelectorAll('.mip-group-selection-item');
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.addEventListener('click', itemClickHandler, false);
        }

        // 处理列表每个选项按钮点击事件
        function itemClickHandler (e) {
            var itemData = event.currentTarget.dataset;
            e.data = itemData;
            MIP.setData(e.data);

            viewer.eventAction.execute('selected', ele, e);
        }
    }

    return groupSelection;
});
