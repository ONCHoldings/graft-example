module.exports = Backbone.Marionette.CompositeView.extend({
    itemView: Graft.$views.Person,
    itemViewContainer: '#persons',
    template: require('../templates/persons.jade'),
    emptyView: Graft.$views.NoPersons,
    onItemviewSetPerson: function(evt, args) {
        Graft.execute('set:person', args.model);
    }
});
