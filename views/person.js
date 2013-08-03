module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    className: 'person',
    modelEvents: {
        'change': 'render'
    },
    triggers: {
        "click a": "set:person"
    },  
    onRender: function() {
        if (this.model.get('active')) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    },
    template: require('../templates/person.jade'),
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
