/**
 * @file mip-experiment 组件
 * @author liangjiaying 2017.02
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var customStorage = new util.customStorage(0);

    /**
     * 初始化实验设置
     *
     * @param  {Object} ele mip-dom
     */
    function initExp(ele) {
        var expString = ele.querySelector('script[type="application/json"]').innerHTML;
        var expJson = '';

        // 验证mip-experiment合法性
        try {
            expJson = JSON.parse(expString);
        } catch (err) {
            console.warn('<mip-experiment>配置不是合法JSON, ' + err.message);
        }
        if (!expJson) {
            return;
        }

        for (var expName in expJson) {
            // 读取sticky和实验分组情况
            var expGroup = getExpGroup(expName, expJson);
            setExpGroup(expName, expGroup);
        }
    }

    /**
     * 获取实验分组: 根据url、storage历史获取分组, 或重新分组
     *
     * @param  {string} expName 实验名
     * @param  {Object} expJson 实验分组配置
     * @return {string} 分组名
     */
    function getExpGroup(expName, expJson) {
        var isSticky = (expJson[expName].sticky === false ? false : true);
        var expVar = expJson[expName].variants || {};
        expVar.default = 100;

        var groupFromUrl = getExpGroupFromUrl();

        var groupFromStorage = '';
        if (isSticky && !groupFromUrl) {
            groupFromStorage = getExpGroupFromStorage();
        }

        if (!groupFromStorage && !groupFromUrl) {
            var groupNew = getExpGroupNew();
        }

        var finalGroup = groupFromUrl || groupFromStorage || groupNew;

        return finalGroup;

        /**
         * 从URL中获取强制分组信息实验分组配置配置
         * hash取值：#mip-x-btn-color=red&mip-x-font-color=white
         *
         * @return {string} 分组
         */
        function getExpGroupFromUrl() {
            var hash = window.location.hash.slice(1);
            if (!hash) {
                return '';
            }

            var expGroupArr = hash.split('&');
            for (var i in expGroupArr) {
                if (!expGroupArr[i].match(expName)) {
                    continue;
                }
                var regExp = new RegExp('mip-x-' + expName + '=(\\w+)');
                var expGroup = regExp.exec(expGroupArr[i])[1];
                return expGroup in expVar ? expGroup : '';
            }
            return '';
        }

        /**
         * 从缓存中获取用户分组
         *
         * @return {string} 分组
         */
        function getExpGroupFromStorage() {
            var group = customStorage.get('mip-x-' + expName);
            return group in expVar ? group : '';
        }

        /**
         * 重新给用户分组
         *
         * @return {string} 分组
         */
        function getExpGroupNew() {
            var rNumber = Math.random() * 100;
            var groups = Object.keys(expVar);
            // 根据随机数和每组份数计算新分组
            for (var i = 0; i < groups.length - 1; i++) {
                var percentCur = addVars(i, expVar);
                // XXX: i为字符串，i-0变为数字
                var percentNext = addVars(i + 1, expVar);
                if (i === 0 && rNumber < expVar[groups[0]]) {
                    return groups[0];
                }
                if (rNumber >= percentCur && rNumber < percentNext) {
                    return groups[i + 1];
                } else if (rNumber > percentNext) {
                    continue;
                }
            }
            return 'default';
        }

        /**
         * 递归计算实验配置项比例
         *
         * @param {number} i      指定叠加的最终位数
         * @param {Object} expVar 用户填写的variables
         * @return {number} 分组之和
         */
        function addVars(i, expVar) {
            var groups = Object.keys(expVar);
            if (i === 0) {
                return expVar[groups[0]];
            } else {
                return expVar[groups[i]] + arguments.callee(i - 1, expVar);
            }
        }
    }

    /**
     * 设置实验分组，将分组名传入body属性
     *
     * @param {string} expName  实验名
     * @param {string} expGroup 实验分组
     */
    function setExpGroup(expName, expGroup) {
        customStorage.set('mip-x-' + expName, expGroup);
        if (expGroup !== 'default') {
            document.getElementsByTagName('body')[0].setAttribute('mip-x-' + expName, expGroup);
        }
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.build = function () {
        var element = this.element;
        initExp(element);
        util.css(element, 'display', 'initial');
    };

    return customElement;
});
