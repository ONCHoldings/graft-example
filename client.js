/*jshint browser:true */
var Graft = window.Graft = require('graftjs');

var Backbone = require('backbone'),
_  = require('underscore');

Graft.addInitializer(function(options) {
    require('./models/Progress.graft.js');
    require('./views/Progress.graft.js');
});

/**
 * Backbone.js client side initialization.
 */
Graft.on('start', function(options) {
    // Manage the initial regions
    this.addRegions({
        sidebar: '#sidebar',
        content: '#content'
    });

    Graft.$state.progress = new Graft.$models.Progress({progress: 10});
    function timer() {
        var progress = Graft.$state.progress;

        if (!progress.isComplete()) {
            progress.increment(5);
            _.delay(timer, 200);
        }
    }
    _.delay(timer, 200);


    this.content.show(new Graft.$views.Progress({
        model: Graft.$state.progress
    }));

    this.$state.progress.on('complete', function() {
        //this.content.show(new Graft.$views.Account());
    }, this);

    Backbone.history.start({push$state: true, silent: false, root: "/"});
}, Graft);

Graft.start();
