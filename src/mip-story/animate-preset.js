/**
 * @file 动画逻辑处理
 * @author xiongwenjie@baidu.com
 * @description 这里是一些预置的动画函数和逻辑
 */
define(function (require) {
    'use strict';

    var animatesPresets = {
        'fade-in': {
            duration: 500,
            easing: 'ease-out',
            delay: 0,
            keyframes: [
                {
                    opacity: 0
                },
                {
                    opacity: 1
                }
            ]
        },
        'fly-in-top': {
            duration: 500,
            easing: 'ease-out',
            delay: 0,
            keyframes: function (offset) {
                var offsetY = -(offset.top + offset.height);
                return [
                    {
                        transform: 'translateY(' + offsetY +'px)'
                    },
                    {
                        transform: 'translateY(0)'
                    }
                ];
            }
        },
        'fly-in-bottom': {
            duration: 500,
            easing: 'ease-out',
            delay: 0,
            keyframes: function (offset) {
                var offsetY = offset.pageHeight + offset.top;
                return [
                    {
                        transform: 'translateY(' + offsetY +'px)'
                    },
                    {
                        transform: 'translateY(0)'
                    }
                ];
            }
        },
        'fly-in-left': {
            duration: 500,
            delay: 0,
            easing: 'ease-out',
            keyframes: function (offset) {
                var offsetX = -(offset.left + offset.width);
                return [
                    {
                        transform: 'translateX(' + offsetX +'px)'
                    },
                    {
                        transform: 'translateX(0)'
                    }
                ];
            }
        },
        'fly-in-right': {
            duration: 500,
            delay: 0,
            easing: 'ease-out',
            keyframes: function (offset) {
                var offsetX = offset.pageWidth - offset.left;
                return [
                    {
                        transform: 'translateX(' + offsetX +'px)'
                    },
                    {
                        transform: 'translateX(0)'
                    }
                ];
            }
        },
        'twirl-in': {
            duration: 1000,
            delay: 0,
            easing: 'cubic-bezier(.2, .75, .4, 1)',
            keyframes: [
              {
                transform: 'rotate(-540deg) scale(0.1)',
                opacity: 0,
              },
              {
                transform: 'none',
                opacity: 1,
              },
            ],
        },
        'whoosh-in-left': {
            duration: 500,
            delay: 0,
            easing: 'ease-out',
            keyframes: function (offset) {
                var offsetX = -(offset.left + offset.width);
                return [
                    {
                        opacity: 0,
                        transform: 'translate3d(' + offsetX + 'px, 0, 0) scale(.15)'
                    },
                    {
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0) scale(1)'
                    }
                ]
            }
        },
        'whoosh-in-right': {
            duration: 500,
            delay: 0,
            easing: 'ease-out',
            keyframes: function (offset) {
                var offsetX = offset.left + offset.width;

                return [
                    {
                        opacity: 0,
                        transform: 'translate3d(' + offsetX + 'px, 0, 0) scale(.15)'
                    },
                    {
                        opacity: 1,
                        transform: 'translate3d(0, 0, 0) scale(1)'
                    }
                ]
            }
        },
        'rotate-in-left': {
            duration: 700,
            easing: 'ease-out',
            delay: 0,
            keyframes: function(offset) {
                var offsetX = -(offset.left + offset.width);
                return [
                    {
                        transform: 'translate3d(' + offsetX + 'px, 0, 0) rotate(-360deg)'
                    },
                    {
                        transform: 'translate3d(0, 0, 0) rotate(0)'
                    }
                ]
            }
        },
        'rotate-in-right': {
            duration: 700,
            easing: 'ease-out',
            delay: 0,
            keyframes: function (offset) {
                var offsetX = offset.left + offset.width;

                return [
                    {
                        transform: 'translate3d(' + offsetX + 'px, 0, 0) rotate(360deg)'
                    },
                    {
                        transform: 'translate3d(0, 0, 0) rotate(0)'
                    }
                ]
            }
        }
    };

    // Object.keys(animates).forEach(function (key) {
    //     var value = animates[key];

    //     // 这里处理下名称是因为 naboo register 的 key 没有做去重，可能被别的项目注册覆盖，关爱代码更关爱你。
    //     naboo.register('mip-story-' + key, function (next, el, opts, offset) {
    //         opts.duration = opts.duration || value.duration || 300;
    //         opts.delay = opts.delay || value.delay || 0;
    //         opts.easing = opts.easing || value.easing || '-ease-out';

    //         var before = value.before;
    //         var after = value.after;

    //         if ('function' === typeof before) {
    //             before = before(offset);
    //         }
    //         if ('function' === typeof after) {
    //             after = after(offset);
    //         }

    //         util.css(el, before);

    //         naboo.animate(el, after, opts).start(next);
    //     });
    // });

    // naboo.keyframes = animates;

    return animatesPresets;
});