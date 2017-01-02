/**
 * 网盟插件
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var $ = require('zepto');
    var jsSrc = '//dup.baidustatic.com/js/dm.js';
    var scriptId = 'MIP_DUP_JS';
    
    var render = function(_this, me) {

        var $this = $(_this);
        var cproID = _this.getAttribute("cproid");
        if(!cproID) {
            return;
        }
        // 定制化 特殊处理
        var elem = _this.querySelector('script') || null; 

        if(elem) {

            if(isJsonScriptTag(elem)) {
                jsSrc = '//cpro.baidustatic.com/cpro/ui/c.js';
                scriptId = 'MIP_DUP_JS_EXT';
                var obj = JSON.parse(elem.textContent.toString());
                (window.cproArray = window.cproArray || []).push({
                    id: cproID  
                });

                (window["cproStyleApi"]=window["cproStyleApi"] || {})[cproID] = obj;

            }

        }
        
        var script = initJs();
        if (!elem) {
            initadbaidu($this, cproID, me, script);
        }
    };

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs() {
        var MIPDUPJS = document.getElementById(scriptId);
        if(MIPDUPJS) return MIPDUPJS;

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
     * @param  {String} cproID  广告id
     * @return
     */
    function initadbaidu($elemID, cproID, me, script) {

        var s = "_" + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemID.append(html);

        (window.slotbydup=window.slotbydup || []).push({
            id: cproID,
            container: s,
            display: 'inlay-fix',
            async: true
        });

        if(script) {
            var fixedElement = require('fixed-element');
            var layer = fixedElement._fixedLayer;
            var child = document.getElementById(s);
            child.addEventListener("DOMSubtreeModified", function(e) {
                var elem = window.getComputedStyle(child, null);
                var pos = elem && elem.getPropertyValue('position') ? 
                          elem.getPropertyValue('position') : '';
                if(layer && layer.querySelector('#'+s)){
                  return;
                }
                if(pos == 'fixed') {
                    $elemID.append(document.getElementById(s));
                    if(layer) {
                      var idx = document.querySelectorAll('mip-fixed').length;
                      var data = {
                        element: child.parentElement,
                        id: 'Fixed'+ idx
                      };
                      fixedElement.moveToFixedLayer(data, parseInt(idx));
                    }
                }
            },false);
        }

        me.applyFillContent(document.getElementById(s), true);

    }


    /**
     * [isJsonScriptTag 判断是否是定制化script标签]
     * 
     * @param  {Object}  element 节点对象
     * @return {Boolean} 
     */
    function isJsonScriptTag(element){

        return element.tagName == 'SCRIPT' && 

               element.getAttribute('type') &&

               element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';

    }


    return {
        render: render
    }
});


