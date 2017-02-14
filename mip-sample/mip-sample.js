define(function (require) {
    var naboo = require('naboo');
    var util = require('util');
    var Gesture = util.Gesture;
    var css = util.css;

    var customElement = require('customElement').create();

    /**
     * Find elements by selector.
     * @param {string} selector
     * @param {HTMLElement} element.
     * @return {Array.<HTMLElement>}
     */
    function find(selector, element) {
        return Array.prototype.slice.call((element || document).querySelectorAll(selector));
    }

    /**
     * Register front-back mode.
     * @param {HTMLElement} front The front-element
     * @param {HTMLElement} back The back-element
     * @param {number} delay Delay time
     * @param {number} duration Animation duration
     * @param {HTMLElement} element Parent element
     */
    function registerSampleSingle(front, back, delay, duration, element) {
        var gesture = new Gesture(element, {
            preventDefault: true
        });
        var animating = false;

        css(back, {
            display: 'block',
            transform: 'rotateX(-180deg)'
        });

        gesture.on('swipe', function (event, data) {
            if (animating) {
                return;
            }
            animating = true;
            var method = 'rotate' + (data.direction == 3 || data.direction == 1 ? 'X' : 'Y');
            var direction = data.direction == 1 || data.direction == 4 ? 1 : 0;
            var value = direction ? '180deg' : '-180deg';
            css(back, 'transform', method + '(' + (direction ? '-180deg' : '180deg' + ')'));
            naboo.p(
                naboo.animate(front, {
                    transform: method + '(' + value + ')'
                }, {
                    duration: duration,
                    delay: delay
                }),
                naboo.animate(back, {
                    transform: ''
                }, {
                    duration: duration,
                    delay: delay
                })
            ).start(function () {
                var tmp = front;
                front = back;
                back = tmp;
                animating = false;
            });
        });
    }

    /**
     * Register list mode.
     * @param {HTMLElement} list Card-elements
     * @param {number} delay Delay time
     * @param {number} duration Animation duration
     * @param {HTMLElement} element Parent element
     */
    function registerSampleList(list, delay, duration, element) {
        var elementIndex = css(element, 'zIndex');
        var start = +elementIndex == elementIndex ? elementIndex : 0;

        list.forEach(function (element, index) {
            css(element, 'zIndex', start + list.length - index);
        });

        var gesture = new Gesture(element, {
            preventDefault: true
        });
        gesture.on('swipe', function (event, data) {
            if (!list.length) {
                return;
            }
            var speed = Math.max(data.velocity * 10, 10);
            var x = parseInt(data.deltaX * speed);
            var y = parseInt(data.deltaY * speed);
            var element = list.shift();
            if (element.classList.contains('mip-sample-list-last')) {
                return;
            }
            naboo.animate(element, {
                transform: 'translate(' + x + 'px,' + y + 'px)',
                opacity: 0
            }, {
                duration: duration,
                delay: delay
            }).start(function () {
                css(element, 'display', 'none');
                element = null;
            });
        });
    }

    /**
     * Builder.
     */
    customElement.prototype.build = function () {
        var element = this.element;

        var delay = element.getAttribute('delay');
        var duration = element.getAttribute('duration');

        delay = +delay == delay ? +delay : 0;
        duration = +duration == duration ? +duration : 400

        var list = find('.mip-sample-list', element);
        if (list.length) {
            var self = this;
            list.forEach(function (element) {
                self.applyFillContent(element);
            });
            registerSampleList(
                list,
                delay,
                duration,
                element
            );
        } else {
            var front = find('.mip-sample-front', element)[0];
            var back = find('.mip-sample-back', element)[0];
            if (front && back) {
                this.applyFillContent(front);
                this.applyFillContent(back);
                registerSampleSingle(front, back, delay, duration, element);
            } else {
                element.style.display = 'none';
            }
        }
    };

    return customElement;
});
