/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();

    customElement.prototype.firstInviewCallback = function () {
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-layer', customElement);

    return customElement;
});
