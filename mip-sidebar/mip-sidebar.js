/**
 * 侧边栏组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    var Gesture = util.Gesture;

    /**
     * [toggle_ 打开或关闭 sidebar 入口]
     * 
     * @return {[type]}
     */
    function toggle_() {

        isOpen_.call(this) ? close_.call(this) : open_.call(this);

    }

    /**
     * [open_ 打开 sidebar]
     * 
     * @return
     */
    function open_() {

        var _this = this;

        if(isOpen_.call(this)) { 
            return; 
        }

        // pageScroll_.call(_this);

        util.css(_this.element, {'display': 'block'});
        openMask_.call(_this);

        /* 动画效果 */
        var openTimer = setTimeout(function() {

            _this.element.setAttribute('open', '');
            _this.element.setAttribute('aria-hidden', 'false');
            clearTimeout(openTimer);

        }, _this.ANIMATION_TIMEOUT);

    }

    /**
     * [close_ 关闭 sidebar]
     * 
     * @return
     */
    function close_() {

        var _this = this;

        _this.element.removeAttribute('open');
        _this.element.setAttribute('aria-hidden', 'true');

        closeMask_.call(_this);

        /* 动画效果 */
        var closeTimer = setTimeout(function() {

            util.css(_this.element, {'display': 'none'});
            clearTimeout(closeTimer);

        }, _this.ANIMATION_TIMEOUT);

    }

    /**
     * [openMask_ 打开遮盖层]
     * 
     * @return
     */
    function openMask_() {
        
        var _this = this;

        /* 不存在遮盖层时先创建 */
        if(!_this.maskElement) {

            const mask = document.createElement('div');
            mask.id = 'MIP-' + _this.id_.toUpperCase() + '-MASK';
            mask.className = 'MIP-SIDEBAR-MASK';
            mask.style.display = 'block';

            /* 与mip-sidebar 同级dom */
            _this.element.parentNode.appendChild(mask);
            mask.addEventListener('touchmove', function(evt) {
                evt.preventDefault();
            }, false);

            _this.maskElement = mask;

        }

        _this.maskElement.setAttribute('on', 'tap:' + _this.id_ + '.close');

        /* 样式设置 */
        util.css(_this.maskElement, {'display': 'block'});

    }

    /**
     * [closeMask_ 关闭遮盖层]
     * 
     * @return
     */
    function closeMask_() {
        if(this.maskElement) {
            util.css(this.maskElement, {'display': 'none'});
        }
    }

    /**
     * [isOpen_ sidebar 状态判断]
     * 
     * @return
     */
    function isOpen_() {

        return this.element.hasAttribute('open');

    }

    /**
     * build
     *
     */
    function build() {

        var _this = this;
        _this.maskElement = false;
        _this.id_ = _this.element.id;
        _this.side_ = _this.element.getAttribute('side');
        _this.ANIMATION_TIMEOUT = 100; 

        if(_this.side_ != 'left' && _this.side_ != 'right') {
            _this.side_ = 'left';
            _this.element.setAttribute('side', _this.side_);
        }

        if(isOpen_.call(_this)) {
            open_.call(_this);
        } else {
            _this.element.setAttribute('aria-hidden', 'true');
        }


        document.addEventListener('keydown', function(evt) {
            if(evt.keyCode == 27) {
                close_.call(_this);
            }
        }, false);

        _this.addEventAction('toggle', function() { toggle_.call(_this);});
        _this.addEventAction('open', function() {open_.call(_this);});
        _this.addEventAction('close', function() {close_.call(_this);})

    }

    customElement.prototype.build = build;
    customElement.prototype.prerenderAllowed = function () {
        return true;
    };
   
    return customElement;
});

