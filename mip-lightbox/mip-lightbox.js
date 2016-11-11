/**
 * @author: wangpei07@baidu.com
 * @date: 2016-11-02
 * @file: mip-lightbox.js
 */

define(function (require){
    var customElement = require('customElement').create();
    var fixedElement = require('components/fixedElement');
    var util = require('util');
    var Gesture = util.Gesture;
    

    /**
     * render
     *
     */
    function render () {

        var _this = this;
        _this.open = false;
        _this.id_ = this.element.id;

        util.css(_this.element, {
            'position': 'fixed',
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });
        

        changeParentNode.call(_this);

        /* 事件注册 */
        _this.addEventAction('close', function() { close_.call(_this, event)});
        _this.addEventAction('open', function() {open_.call(_this, event)});

    }

    function changeParentNode() {
        var _this = this;
        var nodes = [];
        var index = 0;
        const CHILDRENS = _this.element.childNodes;

        for(index = 0; index < CHILDRENS.length; index ++) {
            if(CHILDRENS[index].nodeType == 1) {
                nodes.push(CHILDRENS[index]);
            }
        }

        _this.container_ = document.createElement('div');
        _this.applyFillContent(_this.container_);
        _this.element.appendChild(_this.container_);

        for(index = 0; index < nodes.length; index ++) {
            _this.container_.appendChild(nodes[index]);
        }
    }


    /**
     * [open_ 打开 sidebar]
     * 
     * @return
     */
    function open_(event) {

        var _this = this;

        if(_this.open) {
            return;
        }
        
        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();

        new Gesture(_this.element, {
            preventY: true
        })

        _this.open = true;
        util.css(_this.element, {'display': 'block'});
        openMask_.call(_this);

    }


    /**
     * [close_ 关闭 sidebar]
     * 
     * @return
     */
    function close_(event) {

        var _this = this;

        if(!_this.open) {
            return;
        }
        fixedElement.showFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();

        _this.open = false;

        closeMask_.call(_this);
        util.css(_this.element, {'display': 'none'});
        util.css(document.body, {'overflow': 'auto'});

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
            mask.id = 'MIP-LLIGTBOX-MASK';
            mask.setAttribute('on', 'tap:' + _this.id_ + '.close');
            mask.style.display = 'block';

            /* 与mip-lightbox 同级dom */
            _this.element.parentNode.appendChild(mask);
            mask.addEventListener('touchmove', function(evt) {
                evt.preventDefault();
            }, false);

            _this.maskElement = mask;

        }

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
     * 初始化
     *
     */
    customElement.prototype.build = render;
    return customElement;
});
