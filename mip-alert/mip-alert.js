/**
 * @file Alert
 * @author Excas
 * @time 2016.11.03
 */

define(function (require) {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * build
     *
     */
    customElement.prototype.build = function () {
        var _element = this.element;

        var alert = _element.getAttribute('alert');

        $(_element).on('click', function () {
            window.alert(alert||"");
        });
    }

    return customElement;

});
