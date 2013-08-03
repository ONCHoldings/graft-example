module.exports = Backbone.Marionette.ItemView.extend({
    className: 'progress-bar',
    template: require('../templates/progress-bar.jade'),
    modelEvents: {
        'change:progress' : 'progress'
    },
    ui: {
        'bar': '.progress .bar'
    },
    progress: function() {
        this.ui.bar.get(0).style.width = this.model.get('progress') + '%';
    }
});
