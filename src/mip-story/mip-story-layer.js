/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    var TEMPLATEFILL = 'mip-story-template-fill';
    var TEMPLATEVERTICAL = 'mip-story-template-vertical';
    var TEMPLATEHORIZONTAL = 'mip-story-template-horizontal';
    var TEMPLATETHIRDS = 'mip-story-template-thirds';

    customElement.prototype.firstInviewCallback = function () {
        var template = this.element.getAttribute('template');
        switch (template) {
            case 'vertical': {
                this.element.classList.add(TEMPLATEVERTICAL);
                break;
            }
            case 'horizontal': {
                this.element.classList.add(TEMPLATEHORIZONTAL);
                break;
            }
            case 'fill': {
                this.element.classList.add(TEMPLATEFILL);
                break;
            }
            case 'thirds': {
                this.element.classList.add(TEMPLATETHIRDS);
                break;
            }
            default: {
            }
        }
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-layer', customElement);

    return customElement;
});
