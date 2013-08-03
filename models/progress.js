// Drives the progress bar view.
module.exports = Backbone.Model.extend({
    defaults: {
        progress: 0
    },
    increment: function(amount) {
        if (this.isComplete()) { return true; }
        var current = this.get('progress');
        var progress = (current + amount) <= 100 ? current + amount : 100;
        this.set('progress', progress);
        if (progress == 100) {
            this.trigger('complete');
        }
    },
    isComplete: function() {
        return this.get('progress') == 100;
    }
});
