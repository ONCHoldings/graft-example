// Initialize the Graft application object.
var Graft = require('graftjs/server');

// Set up REST endpoints for all models and collecitons (optional)
require('graftjs/middleware/REST.graft.js');

// Bundle up the code for client side deployment (optional)
require('graftjs/middleware/Client.graft.js');

// Load up the bootstrap visual base layer (optional)
require('graft-bootstrap/middleware/Less.graft.js');

// Simple closure-based data store. (optional)
require('graft-mockdb');

// Parse the directory for additional code to load.
Graft.load(__dirname);

// Register the index page to be delivered to the client.
Graft.get('/', function(req, res) {
    res.render('layout', {});
});

// Start the Application, specifying some options.
Graft.start({
    locals: {
        siteName: 'Graft.js Example',
        title: 'Graft.js Example'
    }
});
