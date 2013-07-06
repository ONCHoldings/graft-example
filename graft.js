var _            = require('underscore');
var $ = global.$ = require('jquery');

Graft = global.Graft = require('./graft.shared');

// Hopefully this will be unecessary one day.
Graft.server = true;

require('./lib/modules');
require('./middleware');
require('./middleware/Server.graft.js');
require('./middleware/Sockets.graft.js');

var Server = Graft.Middleware.Server;

var expressMethods = ['all', 'get', 'post', 'delete', 'use', 'set', 'configure'];

_.each(expressMethods, function(method) {
    Graft[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        return Server[method].apply(Server, args);
    };
}, this);


module.exports = App = Graft;
