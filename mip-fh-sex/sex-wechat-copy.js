/**
 * @author: laoono
 * @date:  2016-12-08
 * @time: 14:05
 * @contact: laoono.com
 * @description: #
 */

define(function (require) {
    var module = {};
    var $ = require('zepto');

    module.copy = function (ele) {
        ele = $(ele);

        ele.click(function () {
            var self = $(this);
            self.focus();

            try {
                self[0].setSelectionRange(0, this.value.length);

            }
            catch (err) {
                self[0].select();
            }
        });
    };

    return module;
});

