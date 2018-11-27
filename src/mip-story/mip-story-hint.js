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
    var MIP_STORY_HINT_CLASS = '.mip-story-hint';
    var MIP_STORY_PAGE_SWITCH_LEFT_CLASS = 'mip-story-page-switch-lt';
    var MIP_STORY_PAGE_SWITCH_RIGHT_CLASS = 'mip-story-page-switch-rt';

    var util = require('util');

    function MIPStoryHint(root) {
        this.rootEl = root;
    }

    MIPStoryHint.prototype.build = function () {
        var html = '<aside class="mip-story-hint mip-story-hint-damping-hide">'
            +   '<div class="mip-story-hint-shadow"></div>'
            +   '<div class="mip-story-hint-system">'
            +       '<div class="mip-story-hint-left"></div>'
            +       '<div class="mip-story-hint-middle">'
            +           '<span class="mip-story-hint-middle-top"></span>'
            +           '<span class="mip-story-hint-middle-icon">'
            +               '<span class="mip-story-hint-touch-icon"></span>'
            +               '<span>点击屏幕左右区域</span>'
            +               '<span>切换内容</span>'
            +           '</span>'
            +           '<span class="mip-story-hint-middle-bottom"></span>'
            +       '</div>'
            +       '<div class="mip-story-hint-right"></div>'
            +   '</div>'
            +   '<div class="mip-story-hint-rotate">'
            +       '<mip-img src="https://www.mipengine.org/static/img/mip-story/mip-story-rotate.png"></mip-img>'
            +       '<p>为了更好的体验，请将手机横过来</p>'
            +   '</div>'
            +   '<div class="mip-story-page-switch">'
            +      '<span class="mip-story-page-switch-left">'
            +        '<span></span>'
            +        '<span></span>'
            +      '</span>'
            +      '<span class="mip-story-page-switch-right">'
            +          '<span></span>'
            +          '<span></span>'
            +      '</span>'
            +   '</div>'
            + '</aside>';
        return html;
    };

    MIPStoryHint.prototype.showDamping = function () {
        var self = this;
        var ele = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        util.css(ele, {display: 'block'});
        ele.classList.remove(MIP_STORY_HINT_DAMPING_HIDE);
        setTimeout(function () {
            self.hideDamping();
        }, FIRST_PAGE_NAVIGATION_OVERLAY_TIMEOUT);
    };

    MIPStoryHint.prototype.hideDamping = function () {
        var ele = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        util.css(ele, {display: 'none'});
        ele.classList.add(MIP_STORY_HINT_DAMPING_HIDE);
    };

    MIPStoryHint.prototype.showSystemLater = function () {
        var ele = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        util.css(ele, {display: 'block'});
        ele.classList.add(MIP_STORY_SYSTEM_SHOW);
    };

    MIPStoryHint.prototype.hideSystemLater = function () {
        var ele = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        util.css(ele, {display: 'none'});
        ele.classList.remove(MIP_STORY_SYSTEM_SHOW);
    };

    MIPStoryHint.prototype.toggleSystemLater = function () {
        var ele = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        var display = ele.style.display;
        if (display === 'block') {
            this.hideSystemLater();
        }
        else {
            this.showSystemLater();
        }
    };

    MIPStoryHint.prototype.showPageSwitchLayer = function () {
        var hint = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        hint.classList.add(MIP_STORY_PAGE_SWITCH_RIGHT_CLASS);
        setTimeout(function () {
            hint.classList.remove(MIP_STORY_PAGE_SWITCH_RIGHT_CLASS);
        }, 400);
    };

    MIPStoryHint.prototype.hidePageSwitchLayer = function () {
        var hint = this.rootEl.querySelector(MIP_STORY_HINT_CLASS);
        hint.classList.add(MIP_STORY_PAGE_SWITCH_LEFT_CLASS);
        setTimeout(function () {
            hint.classList.remove(MIP_STORY_PAGE_SWITCH_LEFT_CLASS);
        }, 400);
    };

    return MIPStoryHint;
});
