define(function (require) {
    var customElement = require('customElement').create();
    
    /**
     * Build
     */
    customElement.prototype.build = function () {
        var element = this.element;
        this.addEventAction('close', function(event) {
            event.preventDefault();
            element.style.display = 'none';
        });
    }
   
    return customElement;
});
