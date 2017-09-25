/**
 * @file mip-bind The dispatch center, responsible for distributing messages to Observer and Watcher
 * @author Jackson
 * @email smartfutureplayer@gmail.com
 */

define(function (require) {

    var Deps = function () {

        /**
         * Watcher array
         *
         */
        this.subs = [];
    }

    /**
     * Add watcher to subs
     *
     */
    Deps.prototype.addWatcher = function () {
        Deps.target && Deps.target.addWatcher(this);
    },

    /**
     * Notify deps and update html element
     *
     */
    Deps.prototype.notify = function () {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    },

    /**
     * Trigger watcher update
     *
     * @param {Object} watcher html element watcher
     */
    Deps.prototype.update = function (watcher) {
        watcher && watcher.update && watcher.update();
    }

    return Deps;
});
