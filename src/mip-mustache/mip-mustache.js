/**
 * @file Mustache template
 * @author zeloat1203@gmail.com
 */
define(function (require) {
    'use strict';
    // 引入html-sanitizer
    var sanitizer = require('./sanitizer');
    var mustache = require('./mustache');
    var templates = require('templates');
    var Mustache = templates.inheritTemplate();

    Mustache.prototype.cache = function (templateHTML) {
        mustache.parse(templateHTML);
    };
    Mustache.prototype.render = function (templateHTML, data) {
        var html = mustache.render(templateHTML, data);
        return sanitizer(html);
    };
    return Mustache;
});
