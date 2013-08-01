/*jshint browser:true */
var Graft    = require('graftjs');
var Backbone = require('backbone');
var _        = require('underscore');

Graft.addInitializer(function(options) {
    require('./routers/App.graft.js');

    require('./models/Progress.graft.js');
    require('./views/Progress.graft.js');

    require('./views/Person.graft.js');
    require('./views/PersonDetail.graft.js');
    require('./views/Persons.graft.js');
    require('./views/NoPersons.graft.js');

    require('./models/Person.graft.js');
    require('./models/Persons.graft.js');
});

// Custom library which will get dynamically bundled.
var nonsense = require('./lib/nonsense.js');

/**
 * Backbone.js client side initialization.
 */
Graft.on('start', function(options) {
    Graft.$state.router = new Graft.$routers.App();

    // Manage the initial regions
    this.addRegions({
        sidebar: '#sidebar',
        content: '#content'
    });

    Graft.$state.persons = new Graft.$models.Persons();
    Graft.$state.progress = new Graft.$models.Progress({progress: 0});

    function timer() {
        Graft.$state.persons.add(nonsense());
        var progress = Graft.$state.progress;

        if (!progress.isComplete()) {
            progress.increment(10);
            _.delay(timer, 200);
        }
    }
    _.delay(timer, 200);

    this.content.show(new Graft.$views.Progress({
        model: Graft.$state.progress
    }));

    this.sidebar.show(new Graft.$views.Persons({
        collection: Graft.$state.persons
    }));

    this.$state.progress.on('complete', function() {
        Graft.execute('set:person', Graft.$state.persons.at(0));
    }, this);

    Graft.commands.setHandler('set:person', function(person) {
        function filterFn(m) { return m.get('active'); }

        var oldActive = Graft.$state.persons.find(filterFn);
        oldActive && oldActive.set('active', false);

        person = _.isString(person) ? Graft.$state.persons.get(person) : person;
        person.set('active', 'true');
        Graft.trigger('set:person', person);
    });

    Graft.$state.persons.on('change:active', function(model, active, options) {
        if (!active) return null;

        Graft.content.show(new Graft.$views.PersonDetail({
            model:model 
        }));
    });

    Backbone.history.start({pushState: true, silent: true, root: "/"});
}, Graft);

Graft.start();
