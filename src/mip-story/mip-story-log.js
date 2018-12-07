/**
 * @file mip-story-log.js
 * @desc 小故事日志
 * @author <wangqizheng01@baidu.com>
 */

define(function (require) {
    var util = require('util');
    var viewer = require('viewer');

    // 前缀
    var prefix = 'MIP-SOTRY-LOG-TC';
    var baseData = {};

    // 事件描述 包括事件名、描述，index纯粹为了可读性
    var evtDesc = [
        {
            index: 0,
            evtName: 'CLOSE_STORY',
            desc: '关闭'
        },
        {
            index: 1,
            evtName: 'CLOSE_AUDIO',
            desc: '关闭音频'
        },
        {
            index: 2,
            evtName: 'REPLAY_STORY',
            desc: '重播'
        },
        {
            index: 3,
            evtName: 'LINKTO_RECOMMEND',
            desc: '点击推荐链接'
        },
        {
            index: 4,
            evtName: 'LINKTO_RECOMMEND_FROM',
            desc: '点击推荐来源'
        },
        {
            index: 5,
            evtName: 'SHARE_STORY',
            desc: '点击分享'
        },
        {
            index: 6,
            evtName: 'RECOMMEND_SHOW',
            desc: '推荐链接展现量'
        },
        {
            index: 7,
            evtName: 'VIEWED_PAGE_END',
            desc: '浏览至尾页'
        },
        {
            index: 8,
            evtName: 'VIEWED_PAGE',
            desc: '浏览页面'
        }
    ];

    /**
     * 日志发送
     *
     * @param {number} evtIndex 统计项目编号
     * @param {Object} data 需要发送的数据
     * @example TcLog(0, {}) 点击关闭时发送日志
     */
    function TcLog (evtIndex, data) {
        if(evtIndex !== 0 && !evtIndex) return;

        var curEvt = evtDesc[evtIndex];
        
        var data = data || {};
        var tcData = util.fn.extend(data, baseData, {
            desc: curEvt.desc
        });
        var evt = prefix + curEvt.evtName;

        viewer.sendMessage(evt, tcData);
    }

    /**
     * 获取基本数据
     * 
     */
    TcLog.prototype.initBaseData = function (data) {
        baseData = data || {};
    }

    return TcLog;
});

