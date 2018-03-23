/**
 * @file 网盟插件
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var jsSrc = '//dup.baidustatic.com/js/dm.js';
    var scriptId = 'MIP_DUP_JS';
    var exps;

    var render = function (that, me) {
        var $this = $(that);
        var MIP = window.MIP || {};
        var sample = MIP.hash.get('sample');
        if (sample === 'mip-wm-base') {
            exps = '117021';
        }
        else if (sample === 'mip-wm-exp') {
            exps = '117031';
        }
        var cproID = that.getAttribute('cproid');
        if (!cproID) {
            return;
        }
        // 定制化 特殊处理
        var elem = that.querySelector('script') || null;

        // 判断 preload 逻辑
        var scripts = document.querySelector('script[mip-preload="mip-script-wm"]');
        if (scripts && !elem && sample === 'mip-wm-exp') {
            var s = '_' + Math.random().toString(36).slice(2);
            var html = '<div style="" id="' + s + '"></div>';
            $this.append(html);
            var apiStr = '__container_api_';
            (window[apiStr] = window[apiStr] || []).push({
                containerId: s,
                exps: exps,
                proxy: 0,
                slotId: cproID
            });
        }
        else {
            if (elem) {
                if (isJsonScriptTag(elem)) {
                    jsSrc = '//cpro.baidustatic.com/cpro/ui/c.js';
                    scriptId = 'MIP_DUP_JS_EXT';
                    var obj = JSON.parse(elem.textContent.toString());
                    (window.cproArray = window.cproArray || []).push({
                        id: cproID
                    });
                    (window.cproStyleApi = window.cproStyleApi || {})[cproID] = obj;
                }
            }
            var script = initJs();
            if (!elem) {
                initadbaidu($this, cproID, me, script);
            }
        }
    };

    /**
     * [initJs JS初始化函数]
     *
     * @return {Object}
     */
    function initJs() {
        var MIPDUPJS = document.getElementById(scriptId);
        if (MIPDUPJS) {
            return MIPDUPJS;
        }

        var script = document.createElement('script');
        script.src = jsSrc;
        script.id = scriptId;
        document.body.appendChild(script);

        return script;

    }

    /**
     * [initadbaidu 广告组件初始化]
     *
     * @param  {Object} $elemID mip对象
     * @param  {string} cproID  广告id
     * @param  {Object} me dom对象
     * @param  {Object} script  script对象
     *
     */
    function initadbaidu($elemID, cproID, me, script) {

        var s = '_' + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemID.append(html);

        (window.slotbydup = window.slotbydup || []).push({
            id: cproID,
            container: s,
            display: 'inlay-fix',
            exps: exps,
            async: true
        });

        if (script) {
            var fixedElement = require('fixed-element');
            var layer = fixedElement._fixedLayer;
            var child = document.getElementById(s);
            child.addEventListener('DOMSubtreeModified', function (e) {
                var elem = window.getComputedStyle(child, null);
                var pos = elem && elem.getPropertyValue('position')
                    ? elem.getPropertyValue('position') : '';
                if (layer && layer.querySelector('#' + s)) {
                    return;
                }
                if (pos === 'fixed') {
                    $elemID.append(document.getElementById(s));
                    if (layer) {
                        var idx = document.querySelectorAll('mip-fixed').length;
                        var data = {
                            element: child.parentElement,
                            id: 'Fixed' + idx
                        };
                        fixedElement.moveToFixedLayer(data, parseInt(idx, 10));
                    }
                }
            }, false);
        }

        me.applyFillContent(document.getElementById(s), true);

    }


    /**
     * [isJsonScriptTag 判断是否是定制化script标签]
     *
     * @param {Object} element 节点对象
     *
     * @return {boolean}
     */
    function isJsonScriptTag(element) {

        return element.tagName === 'SCRIPT'
            && element.getAttribute('type')
            && element.getAttribute('type').toUpperCase() === 'APPLICATION/JSON';
    }


    return {
        render: render
    };
});
