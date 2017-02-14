/**
 * @author yzk
 */

define(function(require) {
    var customElem = require('customElement').create();
    var util = require('util');
    var Gesture = util.Gesture;
    var naboo = new util.naboo();
   
   function getCur(r) {
        var l = r.length;
        var c = 0;
        for(var i = 1;i < l;i++) {
            c = r[c] <= r[i] ? c : i;
        }
        return c;
   }

    customElem.prototype.build = function() {
        var ele = this.element;
        var column = 0;
        if (ele.hasAttribute('data-column')) {
            column = ele.getAttribute('data-column');
            column = parseInt(column);
        } else {
            console.error("data-column 没有配置");
            return
        }
        var d = new Array();
        for(var i = 0;i < column;i++) {
            d.push(0);
        }
        var rw = ele.offsetWidth / column;
        var eleRows = ele.querySelectorAll('.rows');
        var eleLen = eleRows.length;
        for(var i = 0; i < eleLen; i++) {
            var c = getCur(d);
            var ofw = c * rw;
            eleRows[i].style.left = ofw + "px";
            eleRows[i].style.top = d[c] + "px";
            eleRows[i].style.width = rw + "px";
            d[c] += eleRows[i].offsetHeight;
            eleRows[i].classList.add('rowsc');
        }
    };

    return customElem;

});