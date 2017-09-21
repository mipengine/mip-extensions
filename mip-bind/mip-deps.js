/**
 * @file mip-bind The dispatch center, responsible for distributing messages to Observer and Watcher
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    /**
     * Deps Module
     *
     */
    var Deps = {
        /**
         * Watcher array
         *
         */
        subs: {},

        /**
         * Add watcher to subs
         *
         * @param {string} pth data path
         * @param {Object} watcher html element watcher
         */
        addWatcher: function (pth, watcher) {
            if (!watcher) {
                return;
            }
            this.subs[pth] = watcher;
        },

        /**
         * Notify deps and update html element
         *
         * @param {string} pth data path
         */
        notify: function (pth) {
            if (pth) {
                this.update(this.subs[pth]);
            }
            else {
                for (var key in this.subs) {
                    if (this.subs.hasOwnProperty(key)) {
                        this.update(this.subs[key]);
                    }
                }
            }
        },

        /**
         * Trigger watcher update
         *
         * @param {Object} watcher html element watcher
         */
        update: function (watcher) {
            watcher && watcher.update && watcher.update();
        }
    };

    return Deps;
});
