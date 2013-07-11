graft-example
=============

This repository contains a small demo site i was building, before the codebase morphed into Graft.js. These files were removed from the main repo and forked here instead.

### Installing

The ideal way to run this site would be to make use of `npm link` as follows:

    cd ~/Projects; # or wherever you store your code
    
    # getting graft
    git clone git@github.com:ONCHoldings/graft.js.git
    cd graft.js
    npm link
    
    # now the site
    git clone git@github.com:ONCHoldings/graft-example.git
    cd graft-example
    npm link graftjs
    npm install

This will link your local graft.js clone to the node_modules directory
of this site, meaning you are free to work on them in tandem.

### Running

To run the example, you simply run :

	    node server.js
 
It is also recommended to use [debug](https://github.com/visionmedia/debug) output in this manner:

	    DEBUG='graft:*' node server.js
