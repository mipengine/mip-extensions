/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var MIP_STORY_HINT_DAMPING_HIDE = 'mip-story-hint-damping-hide';
    var MIP_STORY_SYSTEM_SHOW = 'mip-story-system-show';
    var HASSHOWMIPSTORYHINT = 'has-show-mip-story-hint';
    var FIRST_PAGE_NAVIGATION_OVERLAY_TIMEOUT = 250;

    var util = require('util');

    function MIPStoryHint() {
    }

    MIPStoryHint.prototype.build = function () {
        var html = '<aside class="mip-story-hint mip-story-hint-damping-hide">'
            +   '<div class="mip-story-hint-shadow"></div>'
            +   '<div class="mip-story-hint-system">'
            +   '    <div class="mip-story-hint-left"></div>'
            +   '    <div class="mip-story-hint-middle">'
            +   '        <span class="mip-story-hint-middle-top"></span>'
            +   '        <span class="mip-story-hint-middle-icon">'
            +   '            <span class="mip-story-hint-touch-icon"></span>'
            +   '            <span>点击屏幕左右区域</span>'
            +   '            <span>切换内容</span>'
            +   '        </span>'
            +   '        <span class="mip-story-hint-middle-bottom"></span>'
            +   '    </div>'
            +   '    <div class="mip-story-hint-right"></div>'
            +   '</div>'
            +   '<div class="mip-story-hint-rotate">'
            +   '    <mip-img src="https://www.mipengine.org/static/img/mip-story/mip-story-rotate.png"></mip-img>'
            +   '    <p>为了更好的体验，请将手机横过来</p>'
            +   '</div>'
            // +   '<div class="mip-story-page-switch">'
            // +   '   <span class="mip-story-page-switch-left">'
            // +   '     <span></span>'
            // +   '     <span></span>'
            // +   '   </span>'
            // +   '   <span class="mip-story-page-switch-right">'
            // +   '       <span></span>'
            // +   '       <span></span>'
            // +   '   </span>'
            // +   '</div>'
            + '</aside>';
        return html;
    };

    MIPStoryHint.prototype.showDamping = function () {
        var self = this;
        var ele = document.querySelector('.mip-story-hint');
        util.css(ele, {display: 'block'});
        ele.classList.remove(MIP_STORY_HINT_DAMPING_HIDE);
        setTimeout(function () {
            self.hideDamping();
        }, FIRST_PAGE_NAVIGATION_OVERLAY_TIMEOUT);
    };

    MIPStoryHint.prototype.hideDamping = function () {
        var ele = document.querySelector('.mip-story-hint');
        util.css(ele, {display: 'none'});
        ele.classList.add(MIP_STORY_HINT_DAMPING_HIDE);
    };

    MIPStoryHint.prototype.showSystemLater = function () {
        var hasShown = localStorage.getItem(HASSHOWMIPSTORYHINT);
        if (!hasShown) {
            var ele = document.querySelector('.mip-story-hint');
            util.css(ele, {display: 'block'});
            ele.classList.add(MIP_STORY_SYSTEM_SHOW);
            localStorage.setItem('has-show-mip-story-hint', '1');
        }
    };

    MIPStoryHint.prototype.hideSystemLater = function () {
        var ele = document.querySelector('.mip-story-hint');
        util.css(ele, {display: 'none'});
        ele.classList.remove(MIP_STORY_SYSTEM_SHOW);
    };

    MIPStoryHint.prototype.toggleSystemLater = function () {
        var ele = document.querySelector('.mip-story-hint');
        var display = ele.style.display;
        if (display === 'block') {
            this.hideSystemLater();
        }
        else {
            this.showSystemLater();
        }
    };

    MIPStoryHint.prototype.showPageSwitchLayer = function () {
        // var hint = document.querySelector('.mip-story-hint');
        // util.css(hint, {display: 'block'});
        // var sw = document.querySelector('.mip-story-page-switch');
        // util.css(sw, {display: 'block'});
        // var left = document.querySelector('.mip-story-page-switch-left');
        // util.css(left, {display: 'none'});
        // var right = document.querySelector('.mip-story-page-switch-right');
        // util.css(right, {display: 'block'});
        // setTimeout(function () {
        //     util.css(hint, {display: 'none'});
        //     util.css(sw, {display: 'none'});
        //     util.css(left, {display: 'none'});
        //     util.css(right, {display: 'none'});
        // }, 400);
    };

    MIPStoryHint.prototype.hidePageSwitchLayer = function () {
        // var hint = document.querySelector('.mip-story-hint');
        // util.css(hint, {display: 'block'});
        // var sw = document.querySelector('.mip-story-page-switch');
        // util.css(sw, {display: 'block'});
        // var left = document.querySelector('.mip-story-page-switch-left');
        // util.css(left, {display: 'block'});
        // var right = document.querySelector('.mip-story-page-switch-right');
        // util.css(right, {display: 'none'});
        // setTimeout(function () {
        //     util.css(hint, {display: 'none'});
        //     util.css(sw, {display: 'none'});
        //     util.css(left, {display: 'none'});
        //     util.css(right, {display: 'none'});
        // }, 400);
    };

    return MIPStoryHint;
});
