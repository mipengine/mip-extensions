/**
 * @file mip-story-jsmpeg 组件
 * @author
 */

define(function (require) {
    'use strict';

    var customElement = require('customElement').create();
    var util = require('util');
    var dm = util.dom;

    function getAttributeSet(attributes) {
        var attrs = {};
        Array.prototype.slice.apply(attributes).forEach(function (attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
    }

    function getJsonString(attrs) {
        var attrString = '';
        for (var prop in attrs){
            attrString += prop + '=' + attrs[prop] + ' ';
        }
        return attrString
    }
    
    customElement.prototype.initStoryImg = function () {
        this.attributes = getAttributeSet(this.element.attributes);
        var attrString = getJsonString(this.attributes);
        var imgHtml = '<mip-img ' + attrString + '></mip-img>';
        var storyImg = dm.create(imgHtml);
        this.element.parentNode.insertBefore(storyImg, this.element);
    }

    customElement.prototype.attributeChangedCallback = function () {
        if (this.element.hasAttribute('preload')) {
            this.initStoryImg();
        }
    };

    customElement.prototype.firstInviewCallback = function () {
    };

    /* eslint-disable */
    MIP.registerMipElement('mip-story-img', customElement);

    return customElement;
});
