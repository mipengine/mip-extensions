// mip-[componentname]/util.js
define(function(require) {
    return {
        trim: function (source) {
            return source.replace(/(^\s+|\s+$)/g, '');
        }
    };
});