/**
 * @file mip-story 组件
 * @author
 */

define(function (require) {
    'use strict';

    var ACTIVE = 'mip-story-page-progress-bar-active';
    var VISITED = 'mip-story-page-progress-bar-visited';
    var css = require('util').css;
    var timeStrFormat = require('./animation-util').timeStrFormat;
    /**
     * [MIPProgress 头部导航进度条]
     * @param {Element} root    mip-story根节点
     * @param {[type]} elements  mip-story-view 节点数组
     * @param {[type]} audioHide 是否隐藏音频
     */
    function MIPProgress(root, elements, audioHide) {

        this.root = root;
        this.elements = elements;
        this.audioHide = audioHide;
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
            ? '<span class="mip-stoy-audio" data-stats-baidu-obj="'
            + muteStats + '"></span></aside>' : '';
        return content;
    };

    MIPProgress.prototype.showAudio = function () {
        var ele = this.root.querySelectorAll('audio, video');
        return !!ele.length && !this.audioHide;
    };

    MIPProgress.prototype.updateProgress = function (index, status) {
        this.progressBar = this.root.querySelectorAll('.mip-story-progress-bar .mip-story-page-progress-value');
        this.ele = this.progressBar[index];
        // 设置当前元素的状态
        this.setCurrentEleStatus(index, status);
        // 处理其他views的状态
        this.setOtherEleStatus(index, status);
        this.oldEle = this.ele;
    };

    MIPProgress.prototype.setCurrentEleStatus = function (index, status) {
        var autoAdvanceDuration = timeStrFormat(this.elements[index].getAttribute('auto-advancement-after'));
        // 后续会有场景视频播放时，如果遇到缓冲，则需要暂停动画
        // 所以采用 WebAnimation API来进行头部切换动画的控制；
        // 处理其他views的状态
        if (!this.ele.animatePlayer) {
            this.setCurrentEleAnimatePlayer(autoAdvanceDuration);
        } else {
            // 这里对自动播放和非自动播放做了不同处理
            // 如果设置了自动播放或者当前不是被访问过的状态，就重新播放动画；
            if (autoAdvanceDuration || status) {
                // WAAPI的polyfill 在cancelapi上的实现和标准有点不一致，这里手动处理下；
                css(this.ele, {transform: "scale3d(0, 1, 0)"});
                this.ele.classList.remove(VISITED);
                this.ele.animatePlayer.play();
            }
        };
    }

    MIPProgress.prototype.setOtherEleStatus = function (index, status) {
        // 处理前一个元素的状态
        if (this.oldEle && this.oldEle !== this.ele) {
            this.resetOldEleStatus(status, index);
        }
        // 往前翻页时需要init后面页面的动画
        if (status) {
            for (var i = index + 1; i < this.progressBar.length; i++) {
                this.cancelEleVistedStatus(this.progressBar[i]);
            }
        }
    }

    MIPProgress.prototype.resetOldEleStatus = function (status, index) {
        // 向后翻
        if (status) {
            this.oldEle.classList.add(VISITED);
            this.oldEle.animatePlayer && this.oldEle.animatePlayer.finish();
        }
        else {
            // 往前翻时需要清除元素已经播放过的状态
            this.cancelEleVistedStatus(this.oldEle);
        }
    }

    MIPProgress.prototype.cancelEleVistedStatus = function (ele) {
        if (ele) {
            css(ele, {transform: "scale3d(0, 1, 0)"});
            ele.classList.remove(VISITED);
            ele.animatePlayer && ele.animatePlayer.cancel();
        }
    }

    MIPProgress.prototype.setCurrentEleAnimatePlayer = function (autoAdvanceDuration) {
        this.ele.animatePlayer = this.ele.animate([
            {
                transform: 'scale3d(0, 1, 1)'
            }, {
                transform: 'scale3d(1, 1, 1)'
            }
        ]
        ,{
            easing: 'linear',
            duration: autoAdvanceDuration || 200,
            fill: 'forwards'
        });
    };


    return MIPProgress;
});
