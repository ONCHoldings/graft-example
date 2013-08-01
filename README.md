[![Build Status](https://travis-ci.org/ONCHoldings/graft-example.png)](https://travis-ci.org/ONCHoldings/graft-example)

graft-example
=============

A simple example of a [Graft.js](https://github.com/ONCHoldings/graft.js) app.

This is a simple person lister, that illustrates how the backbone components (models, views, routers)
and the code that they require (jade templates and other libraries), are automatically bundled
up and published on the client.

The two entry points are server.js and client.js.

### Installing

    git clone git@github.com:ONCHoldings/graft-example.git
    cd graft-example
    npm install


### Running

To run the example, you simply run :

	    node server.js
 
It is also recommended to use [debug](https://github.com/visionmedia/debug) output in this manner:

	    DEBUG='graft:*' node server.js

# Tests

    npm test
