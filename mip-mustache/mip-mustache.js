define(function (require) {
    var mustache = require('./mustache');
    var templates = require('templates');
    var Mustache = templates.inheritTemplate();

    Mustache.prototype.cache = function (templateHTML) {
        mustache.parse(templateHTML);
    };
    Mustache.prototype.render = function (templateHTML, data) {
        return mustache.render(templateHTML, data);
    };
    return Mustache;
});
