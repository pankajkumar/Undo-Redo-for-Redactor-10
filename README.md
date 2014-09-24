Undo-Redo-for-Redactor-10
=========================

Undo redo plugin for redactor 10

To use this plugin , use following code: -

$('#redactor').redactor({
	plugins:['undoredo'],
    changeCallback: function()
    {
        this.undoredo.changeCallback();
    }
});
