/**
 * @file mip-experiment extension
 * @author liangjiaying<jiaojiaomao220@163.com> 2017.02
 */

define(function (require) {

    var customElement = require('customElement').create();
    var util = require('util');
    var customStorage = new util.customStorage(0);

    /**
     * experiment variables initialization
     *
     * @param  {Object} ele mip-dom
     */
    function initExp(ele) {
        var expString = ele.querySelector('script[type="application/json"]').innerHTML;
        var expJson = '';

        // mip-experiment variables valication
        try {
            expJson = JSON.parse(expString);
        } catch (err) {
            console.warn('<mip-experiment>配置不是合法JSON, ' + err.message);
        }
        if (!expJson) {
            return;
        }

        for (var expName in expJson) {
            // read experiment group
            var expGroup = getExpGroup(expName, expJson);
            setExpGroup(expName, expGroup);
        }
    }

    /**
     * read experiment group: use url group、history group, or set new group
     *
     * @param  {string} expName experiment name
     * @param  {Object} expJson json for experiment config
     * @return {string} group name
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
         * get forced group from URL
         * hash：#mip-x-btn-color=red&mip-x-font-color=white
         *
         * @return {string} experiment group name
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
         * get group form localstorage
         *
         * @return {string} experiment group name
         */
        function getExpGroupFromStorage() {
            var group = customStorage.get('mip-x-' + expName);
            return group in expVar ? group : '';
        }

        /**
         * reset group
         *
         * @return {string} experiment group name
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
         * Add config ratio recursively
         *
         * @param {number} i      i
         * @param {Object} expVar variables in config
         * @return {number} addition of config
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
     * assign experiment to <body>
     *
     * @param {string} expName  experiment name
     * @param {string} expGroup experiment group
     */
    function setExpGroup(expName, expGroup) {
        customStorage.set('mip-x-' + expName, expGroup);
        if (expGroup !== 'default') {
            document.getElementsByTagName('body')[0].setAttribute('mip-x-' + expName, expGroup);
        }
    }

    /**
     * build element, exec only once
     */
    customElement.prototype.build = function () {
        var element = this.element;
        initExp(element);
        util.css(element, 'display', 'initial');
    };

    return customElement;
});
