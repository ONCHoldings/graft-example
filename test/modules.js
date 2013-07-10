var utils    = require('./utils');
var should   = require('should');
var path     = require('path');
var request  = require('request');
var async    = require('async');
var _        = require('underscore');
var log      = _.bind(console.log, console);
var testPort = 8901;

// Initialize the Graft application object.
var Graft = require('../graft');

// Small helper to make sure files are loaded in correct order.
function fileOrder(order, file1, file2) {
    var orig = path.resolve(__dirname + file1);
    var xtra = path.resolve(__dirname + file2);

    var oIndex = _(order).indexOf(orig);
    var xIndex = _(order).indexOf(xtra);

    oIndex.should.be.below(xIndex);
}

describe('Module system', function() {
    describe('Before Start', function() {
        it('Should have initialized bundles', function() {
            Graft.should.have.property('bundles');
        });

        it('Should have added server middleware to bundle', function() {
            Graft.bundles.middleware.should.have.property('Server');
        });

        it('Should have initialized server module into marionette', function() {
            Graft.Middleware.should.have.property('Server');
        });

        it('Should have server middleware first in order', function() {
            var file = path.resolve(__dirname + '/../middleware/Server.graft.js');
            Graft.bundles.order[0].should.equal(file);
        });

        it('Should not have initialized rest middleware', function() {
            Graft.bundles.middleware.should.not.have.property('Test');
        });

        it('Should not have initialized client middleware', function() {
            Graft.bundles.middleware.should.not.have.property('Client');
        });

        it('Should not have included any models', function() {
            Graft.$models.should.eql({});
        });

        it('Should not have included any views', function() {
            Graft.$views.should.eql({});
        });

        it('Should not have included any routers', function() {
            Graft.$routers.should.eql({});
        });

        describe('Including Test middleware', function() {

            before(function() {
                require('./fixture/middleware/Test.graft.js');
            });

            it('Should have been added to the bundle', function() {
                Graft.bundles.middleware.should.have.property('Test');
            });

            it('Should have been initialized into marionette', function() {
                Graft.Middleware.should.have.property('Test');
            });

            it('Should have the listening property defaulted to false', function() {
                Graft.Middleware.Test.listening = false;
            });
            it('Should not have mounted express routes yet', function() {
                Graft.Middleware.Test.express.routes.should.not.have.property('get');
            });

            it('Property on module is set to alpha', function() {
                Graft.Middleware.Test.greekLetter.should.eql('alpha');
            });

            describe('Including another middleware with the same name', function() {
                before(function() {
                    this.Test = require('./fixture/override/middleware/Test.graft.js');
                });

                it('Property should be set to beta', function() {
                    Graft.Middleware.Test.greekLetter.should.eql('beta');
                });

                it('Should have the right loadOrder', function() {
                    Graft.Middleware.Test.loadOrder.should.eql(['alpha', 'beta']);
                });

                it('Should have the bundle order correct', function() {
                    fileOrder(
                        Graft.bundles.order,
                        '/fixture/middleware/Test.graft.js',
                        '/fixture/override/middleware/Test.graft.js'
                    );
                });
            });
        });

        describe('Including a single model (Group)', function() {
            before(function() {
                this.Group = require('./fixture/models/Group.graft.js');
            });

            it('Graft.$models have the Group property', function() {
                Graft.$models.should.have.property('Group');
            });

            it('Graft.Model should have the Group module initialized', function() {
                Graft.Model.should.have.property('Group');
            });

            it('Export from require should match instance in Graft.$models', function() {
                Graft.$models.Group.should.eql(this.Group);
            });

            it('Graft.$models.Group should not equal Graft.Models.Group', function() {
                Graft.$models.Group.should.not.eql(Graft.Model.Group);
            });

            it('Graft.$models.Group should equal Graft.Model.Group.export', function() {
                Graft.$models.Group.should.not.eql(Graft.Model.Group.export);
            });

            it('Graft.module("Model.Group") matches Graft.Model.Group', function() {
                Graft.Model.Group.should.eql(Graft.module("Model.Group"));
            });
        });

        describe('Using Graft.load() to require many modules', function() {
            before(function() {
                Graft.load(__dirname + '/fixture');
            });
            it('Should have include all the models', function() {
                Graft.Model.should.have.property('Groups');
                Graft.Model.should.have.property('Account');
                Graft.Model.should.have.property('Accounts');
            });

            it('Should have the bundle order correct', function() {
                fileOrder(
                    Graft.bundles.order,
                    '/fixture/models/Group.graft.js',
                    '/fixture/models/Accounts.graft.js'
                );
            });
        });

        describe('After start', function() {
            before(function() {
                Graft.start({ port: testPort });
            });
            it('Should have mounted express routes', function() {
                Graft.Middleware.Test.express.routes.should.have.property('get');
            });
            it('Should have the correct initOrder for test middleware', function() {
                Graft.Middleware.Test.initOrder.should.eql(['alpha', 'beta']);
            });
            it('Should have set the test middleware to listening', function() {
                Graft.Middleware.Test.listening.should.eql(true);
            });

            describe('Have working routes', function() {
                before(utils.requestUrl(testPort, '/test/mufassa'));

                it ('should return status 200', function() {
                    this.resp.should.have.status(200);
                });

                it ('should have a body', function() {
                    should.exist(this.body);
                });

                it('should match the route param', function() {
                    this.body.should.eql('Hello mufassa');
                });
            });

        });
    });
});

