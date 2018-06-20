/**
 *  @file 处理一些主题模板样式的的正则匹配
 */

define(function(require) {

    var regSubjectColor = /^#([a-fA-F\d]{3}|[a-fA-F\d]{6})$/;

    function isCssCplor (color) {
        return regSubjectColor.test(color);
    }

    return {
        isCssCplor: isCssCplor
    }

});