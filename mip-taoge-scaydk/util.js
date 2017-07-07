/**
 * @file util.js 模块
 * @author 涛哥 <liangtao.gz@foamail.com>
 */

define(function (require) {
    return {
        trim: function (source) {
            return source.replace(/(^\s+|\s+$)/g, '');
        }
    };
});
