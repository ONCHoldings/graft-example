_.extend(this, {
    readModel: function(req, res, next) {
        var send = _.bind(res.send, res);
        Graft.request('model:read', req.params.model, req.params.id)
            .then(send, send);
    },
    updateModel: function(req, res, next) {
        var send = _.bind(res.send, res);
        Graft.request('model:update', req.params.model, req.params.id, req.body)
            .then(send, send);
    },
    createModel: function(req, res, next) {
        var send = _.bind(res.send, res);
        Graft.request('model:create', req.params.model, req.body)
            .then(send, send);
    },
    deleteModel: function(req, res, next) {
        var send = _.bind(res.send, res);
        Graft.request('model:delete', req.params.model, req.params.id)
            .then(send, send);
    },
    readCollection: function(req, res, next) {
        var send = _.bind(res.send, res);
        Graft.request('collection:read', req.params.collection)
            .then(send, send);
    },
    modelName: function(model) {
        debug('model:name handler');
        var url = _.result(model, 'url') || false;

        if (url) {
            var matches = url.match(/\/api\/([^/]*)/);
            return matches[1] || false;
        }
        return false;
    }
});

this.addInitializer(function(opts) {
    debug('Initialize REST api');
    this.post('/api/:model', this.createModel);
    this.get('/api/:model/:id', this.readModel);
    this.put('/api/:model/:id', this.updateModel);
    this.del('/api/:model/:id', this.deleteModel);
    this.get('/api/:collection', this.readCollection);
    Graft.reqres.setHandler('model:name', this.modelName);
});

Graft.Middleware.on('listen', function(Server) {
    debug('Mounting REST routes');
    Server.use(this);
}, this);
