/**
 * @file mip-muzi-appdownload 木子软件app下载切换效果
 * @author pifire
 */

define(function (require) {

    /**
     * [isJsonScriptTag 判断是否是定制化script标签]
     *
     * @param  {Object}  element 节点对象
     * @return {boolean}
     */
    function isJsonScriptTag(element) {

        return element.tagName === 'SCRIPT'
                && element.getAttribute('type')
                && element.getAttribute('type').toUpperCase() === 'APPLICATION/JSON';
    }

    var customElement = require('customElement').create();
    customElement.prototype.build = function () {
        var element = this.element;
        var loadjs = element.getAttribute('loadjs') || null;
        if (loadjs) {
            document.write('<script type="text/javascript" src="' + loadjs + '"></script>');
        }

        var script = element.querySelector('script') || null;
        if (script && isJsonScriptTag(script)) {
            var obj = JSON.parse(script.textContent.toString());
            var funstr = '';
            for (var key in obj) {
                funstr += key + '(' + obj[key] + ');';
            }
            document.write('<script type="text/javascript">' + funstr + '</script>');
        }
    };
    return customElement;
});
