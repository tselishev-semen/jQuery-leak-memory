/**
 *
 * Leak Memory Plugin for jQuery
 * @version 1.0.0
 * @see {@link https://github.com/tselishev-semen/jquery-leak-memory}
 *
 * @author Tselishev Semen tselishev.semen@yandex.ru
 */

/**
 *
 * To use: load plugin after loading jquery.js, but before loading your project's code.
 * @example
 * <script src="path/to/jquery.js"></script>
 * <script src="path/to/jquery-leak-memory.js"></script>
 * <script src="path/to/other-jquery-plugins.js"></script>
 * <script src="path/to/your-code.js"></script>
 * //then, when you think that there was a memory leak
 * $.leakMemory('getLeak'):
 */
(function ($) {
    'use strict';
    var _private = {
        memory: {},
        $Data: $.data,
        /**
         *
         * @param {string} key cache key
         * @param {Object} item cache item
         * @returns {?Node}
         */
        getElement: function (key, item) {
            return item.handle ? item.handle.elem : this.memory[key]
        },
        /**
         *
         * @param {Node} el
         */
        isNotReachable: function (el) {
            return el.nodeType === Node.ELEMENT_NODE && !el.parentNode;
        }
    };

    //public api
    var methods = {
        getLeak: function getLeak() {
            var leak = {};

            $.each($.cache, function (key, item) {
                var el;
                if ((el = this.getElement(key, item)) && this.isNotReachable(el)) {
                    leak[key] = {elem: el};

                    //leak memory from $.data method
                    item.data && (leak[key]['$.data'] = item.data);

                    //leak memory from jQuery events
                    item.events && $.extend(leak[key], item.events);
                }
            }.bind(_private));

            //render info
            (console.table || console.log).call(console, leak);
        }
    };

    //add spy for $.data method
    $.extend({
        data: function (el) {
            var result = this.$Data.apply($, arguments);
            el && (this.memory[el[$.expando]] = el);
            return result;
        }.bind(_private)
    });

    /**
     * create plugin
     * @param {string} method
     * @returns {*}
     */
    $.leakMemory = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            $.error('Method with name ' + method + ' isn\'t found in jQuery.leakMemory.');
        }
    };

})(jQuery);
