// Initialize the Graft application object.
var Graft = require('graftjs/server');

// Set up REST endpoints for all models and collecitons (optional)
require('graftjs/io/Rest.graft.js');

// Bundle up the code for client side deployment (optional)
require('graftjs/server/Client.graft.js');

// Load up the bootstrap visual base layer (optional)
require('graft-bootstrap/server');
require('graft-bootstrap/server/Less.graft.js');

// Simple closure-based data store. (optional)
require('graft-mockdb/server');

// Bundle a contributed library up for use on the client side (optional)
Graft.bundle('vendor', 'Nonsense');

// Parse the directory for additional code to load.
Graft.load(__dirname);

// Register the index page to be delivered to the client.
Graft.get('/:person?', function(req, res) {
    res.render('layout', {});
});

// Start the Application, specifying some options.
module.exports = Graft.start({
    locals: {
        siteName: 'Graft.js Example',
        title: 'Graft.js Example'
    }
});
