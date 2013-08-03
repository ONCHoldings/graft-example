module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'article',
    className: 'person',
    modelEvents: {
        'change': 'render'
    },
    template: require('../templates/person-detail.jade'),
       serializeData: _.compose(
        function(data) {
            data.model = this.model;
            return data;
        },
        Backbone.Marionette
            .ItemView
            .prototype
            .serializeData
    ),
});
