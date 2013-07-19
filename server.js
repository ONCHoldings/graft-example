// Initialize the Graft application object.
var Graft = require('graftjs/server');

// Load up the REST api middleware. (optional)
// 
// Provides /api/$modelName/$id routes for all
// registered model types, and CRUD.
require('graftjs/middleware/REST.graft.js');

// Load up the Client middleware (optional)
//
// Provides the functionality that bundles up the
// code base and distributes it to the client.
require('graftjs/middleware/Client.graft.js');

Graft.load(__dirname);

// Register the index page to be delivered to the client.
Graft.get('/', function(req, res) {
    res.render('layout', {});
});

// Start the Application.
Graft.start();
