module.exports = Backbone.Router.extend({
    initialize: function(opt) {
        this.listenTo(Graft, 'set:person', function(model) {
            Backbone.history.navigate('/' + model.id, {trigger: false});
        });
    },
    routes: {
        ':person': 'person'
    },
    person: function(person) {
        Graft.execute('set:person', person);
    }
});
