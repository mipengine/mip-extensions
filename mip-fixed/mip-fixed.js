/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElement = require('customElement').create();
    var util = require('util');
    
    /**
     * build
     *
     */
    function build() {

        var _this = this;

        _this.addEventAction('close', function(event) {
            event.preventDefault();
            util.css(_this.element, 'display', 'none');
        });

    }

    customElement.prototype.build = build;
   
    return customElement;
});

