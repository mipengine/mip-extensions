/**
 * @author: wangpei07@baidu.com
 * @date: 2016-11-02
 * @file: mip-lightbox.js
 */

define(function (require){
    var customElement = require('customElement').create();
    var Gesture = require('components/gesture');
    var fixedElement = require('components/fixedElement');
    var util = require('util');
    

    /**
     * render
     *
     */
    function render () {

        var _this = this;
        _this.open = false;

        util.css(_this.element, {
            'position': 'fixed',
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });
        

        changeParentNode.call(_this);

        /* 事件注册 */
        _this.addEventAction('close', function() {close_.call(_this, event)});
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
        
        util.css(_this.container_, {
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });

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

        util.css(_this.element, {'display': 'none'});
        util.css(document.body, {'overflow': 'auto'});

    }


    /**
     * 初始化
     *
     */
    customElement.prototype.build = render;
    return customElement;
});
