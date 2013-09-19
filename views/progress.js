module.exports = Backbone.Marionette.ItemView.extend({
    className: 'progress',
    template: require('../templates/progress-bar.jade'),
    modelEvents: {
        'change:progress' : 'progress'
    },
    ui: {
        'bar': '.progress-bar',
        'sr' : '.progress-bar .sr-only'
    },
    progress: function() {
        this.ui.bar.get(0).style.width = this.model.get('progress') + '%';
        this.ui.sr.attr('aria-valuenow', '' + this.model.get('progress'));
    }
});
