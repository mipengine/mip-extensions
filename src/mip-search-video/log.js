/**
 * @file search-video MIP版
 * @author 邹红全<zouhongquan@baidu.com>
 * @version 1.0
 * @copyright 2018 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var Webb2 = require('./webb2.min');
    var md5 = require('./md5.min');
    var util = require('util');
    var platform = util.platform;
    var videoLog = {
        status: {
            init: false,
            waiting: false
        },
        time: {
            play: 0,
            currentTime: 0
        },
        sectionNum: 10
    };

    var log = {
        init: function () {
            var lid = md5(location.href + (+new Date()) + Math.random());
            this.webb2 = new Webb2({
                pid: '1_5',
                lid: lid,
                /* eslint-disable fecs-camelcase */
                pf_comm: {
                    sample: 1
                },
                et_comm: {
                    sample: 1
                }
                /* eslint-enable fecs-camelcase */
            });
        },

        /**
         * Bind log event
         * @param {Element} videoEl <video> element
         */
        bind: function (videoEl) {
            var self = this;
            self.init();
            var autoplay = videoEl.getAttribute('autoplay');
            if (autoplay) {
                videoLog.time.play = +new Date();
            }
            var urlData = {
                url: location.href,
                videoSrc: videoEl.src
            };
            // Play times & Start time
            videoEl.addEventListener('play', function () {
                if (!videoLog.status.init) {
                    videoLog.time.play = +new Date();
                }
            });
            videoEl.addEventListener('playing', function () {
                var playingTime = +new Date();
                // iOS playing event is true playing
                if (!videoLog.status.init && platform.isIos()) {
                    videoLog.status.init = true;
                    var playTime = playingTime - videoLog.time.play;
                    var data = {
                        time: playTime
                    };
                    Object.assign(data, urlData);
                    self.sendLog('play', data);
                }
                else if (videoLog.status.waiting) {
                    videoLog.status.waiting = false;
                    var time = playingTime - videoLog.time.waiting;
                    var data = {
                        time: time,
                        duration: videoEl.duration
                    };
                    Object.assign(data, urlData);
                    self.sendLog('waiting', data);
                }
            });
            videoEl.addEventListener('waiting', function () {
                videoLog.time.waiting = +new Date();
                videoLog.status.waiting = true;
            });
            var sectionArr = new Array(videoLog.sectionNum);
            videoEl.addEventListener('timeupdate', function () {
                // Hack Android playing event
                if (!videoLog.status.init && platform.isAndroid() && videoEl.currentTime !== 0) {
                    videoLog.status.init = true;
                    var playingTime = +new Date();
                    var playTime = playingTime - videoLog.time.play;
                    var data = {
                        time: playTime
                    };
                    Object.assign(data, urlData);
                    self.sendLog('play', data);
                }
                // If duration > 10s send Played time & Play completion ratio log
                if (videoEl.duration > 10) {
                    for (var i = 0; i < sectionArr.length; i++) {
                        if (typeof sectionArr[i] === 'undefined'
                        && ((videoEl.currentTime / videoEl.duration) >= (i / sectionArr.length))) {
                            sectionArr[i] = 1;
                            // Data of 0% is replace by play times
                            if (i !== 0) {
                                var data = {
                                    currentTime: videoEl.currentTime,
                                    cent: (i / videoLog.sectionNum) * 100 + '%'
                                };
                                Object.assign(data, urlData);
                                self.sendLog('section', data);
                            }
                        }
                    }
                }
            });
            // Play end statistics separately
            videoEl.addEventListener('ended', function () {
                var data = {
                    currentTime: videoEl.currentTime,
                    cent: '100%'
                };
                self.sendLog('section', data);
            });
        },

        /**
         * Send log function
         * @param {string} type event type
         * @param {Object} data the record data object
         */
        sendLog: function (type, data) {
            var self = this;
            var time = '';
            switch (type) {
                case 'play':
                    time = data.time;
                    // Send log when first time start play
                    self.webb2.send('pf_comm', {
                        expend: time,
                        url: data.url,
                        videoSrc: data.videoSrc
                    }, function () {}, {
                        group: 'searchVideo-mip'
                    });
                    // Send log when start play time >= 100ms
                    if (100 <= time && time < 300) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Start playing 100<=time<300',
                            time: time,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    if (300 <= time && time < 1000) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Start playing 300<=time<1000',
                            time: time,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    if (1000 <= time) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Start playing 1000<=time',
                            time: time,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    break;
                case 'waiting':
                    time = data.time;
                    var duration = data.duration;
                    // Send log when buffer event happen, coust time >= 100ms
                    if (100 <= time && time < 300) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Buffer 100<=time<300',
                            time: time,
                            duration: duration,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    if (300 <= time && time < 1000) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Buffer 300<=time<1000',
                            time: time,
                            duration: duration,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    if (1000 <= time) {
                        self.webb2.send('et_comm', {
                            msg: 'searchVideo-mip: Buffer 1000<=time',
                            time: time,
                            duration: duration,
                            url: data.url,
                            videoSrc: data.videoSrc
                        });
                    }
                    break;
                case 'section':
                    self.webb2.send('pf_comm', {
                        cent: data.cent,
                        currentTime: data.currentTime,
                        url: data.url,
                        videoSrc: data.videoSrc
                    }, function () {}, {
                        group: 'searchVideo-mip'
                    });
                    break;
            }
        }
    };
    return log;
});
