define(function(require) {
    var GP_ISDEBUG = false;
    var scriptId = "HY_RES";
    var customElem = require('customElement').create();
    customElem.prototype.build = function() {
        var element = this.element;
        var jsSrc = "" + element.getAttribute('data-src').replace("//http://", "//");
        initJs(jsSrc);
        if (GP_ISDEBUG) { console.log('build---' + jsSrc); }
    };
    /**
     * [initJs JS初始化函数]
     * 
     * @return Append Script
     */
    function initJs(_src, _func) {
        var script = document.createElement('script');
        script.src = _src;
        script.charset = 'utf-8';
        script.onreadystatechange = function() {
            if (this.readyState == 'complete') {
                if (typeof _func == "function") { _func(); }
            }

        }
        script.onload = function() {
            if (typeof _func == "function") { _func(); }
        }
        if (GP_ISDEBUG) { console.log('--Append---' + _src); }
        document.body.appendChild(script);
        return script;
    }
    return customElem;
});