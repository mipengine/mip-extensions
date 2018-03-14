/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var ACTIVE = 'mip-story-page-progress-bar-active';
    var VISITED = 'mip-story-page-progress-bar-visited';

    function MIPProgress(root, elements) {
        this.root = root;
        this.elements = elements;
        this.win = window;
        this.items = {};
        this.oldEle;
    }

    MIPProgress.prototype.build = function () {
        var closeStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '小故事关闭按钮', '点击', window.location.href]
            })
        );
        var content = '<aside class="mip-story-system-layer">';
        if (history.length > 1) {
            content += '<span class="mip-story-close" data-stats-baidu-obj="' + closeStats + '"></span>';
        }
        content += '<ol class="mip-story-progress-bar">';
        for (var i = 0; i < this.elements.length; i++) {
            content += '<li class="mip-story-page-progress-bar">'
                    +       '<div class="mip-story-page-progress-value"></div>'
                    + '</li>';
        }
        content += '</ol>';

        var muteStats = encodeURIComponent(
            JSON.stringify({
                type: 'click',
                data: ['_trackEvent', '音频静音按钮', '点击', window.location.href]
            })
        );
        content += this.showAudio()
            ? '<span class="mip-stoy-audio" muted data-stats-baidu-obj="'
            + muteStats + '"></span></aside>' : '';
        return content;
    };

    MIPProgress.prototype.showAudio = function () {
        var ele = this.root.querySelectorAll('audio, video');
        return !!ele.length;
    };

    MIPProgress.prototype.updateProgress = function (index, status) {
        var progressBar = this.root.querySelectorAll('.mip-story-progress-bar li');
        var ele = progressBar[index];
        ele.classList.add(ACTIVE);
        this.oldEle && this.oldEle !== ele && this.oldEle.classList.remove(ACTIVE);

        if (status) {
            this.oldEle && this.oldEle !== ele && this.oldEle.classList.add(VISITED);
            for (var i = index; i < progressBar.length; i++) {
                progressBar[i].classList.remove(VISITED);
            }
        }
        else {
            this.oldEle && this.oldEle !== ele && this.oldEle.classList.remove(VISITED);
        }
        this.oldEle = ele;
    };

    return MIPProgress;
});
