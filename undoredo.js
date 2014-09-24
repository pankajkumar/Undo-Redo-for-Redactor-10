/**
 * Created by panks on 9/24/14.
 */

if (!RedactorPlugins) var RedactorPlugins = {};

(function () {
    'use strict';

    if (!Array.prototype.last) {
        Array.prototype.last = function () {
            return this[this.length - 1];
        };
    }

    RedactorPlugins.undoredo = function(){
        return {
            history:[],
            actions:[],
            init: function () {
                var undo=this.button.add('undo', 'Undo');
                this.button.addCallback(undo,this.undoredo.executeUndoscript);

                var redo=this.button.add('redo', 'Redo');
                this.button.addCallback(redo,this.undoredo.executeRedoscript);
                this.undoredo.history.push(this.code.get());

            },
            changeCallback:function(){
                if (this.code.get() !== this.undoredo.history.last()) {
                    this.undoredo.history.push(this.code.get());
                }
            },

            executeUndoscript: function () {
                if (this.undoredo.history.length) {
                    if (this.undoredo.history.last() === this.code.get()) {
                        this.undoredo.history.pop();
                    }
                    if (this.undoredo.history.length) {
                        var data=this.undoredo.history.pop();
                        this.code.set(data);
                        this.undoredo.actions.push(data);
                    }
                }
            },

            executeRedoscript: function () {
                if (this.undoredo.actions.length) {
                    if (this.undoredo.actions.last() === this.code.get()) {
                        this.undoredo.actions.pop();
                    }
                    if (this.undoredo.actions.length) {
                        var data=this.undoredo.actions.pop();
                        this.code.set(data);
                        this.undoredo.history.push(data);
                    }
                }
            }
        };
    };

})();