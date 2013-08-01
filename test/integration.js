var Graft      = require('graftjs/server');
var should     = require('should');
var utils      = require('graftjs/test/utils.js');
var Backbone   = require('backbone');
var testPort   = 12400;

describe('graft-example integration tests', function() {
    this.timeout(5000);
    before(function(done) { require('../server.js').then(done); });

    it('has loaded backbone extensions correctly', function() {
        Backbone.should.have.property('Marionette');
    });

    it('was able to start up', function() {
        Graft.Middleware.Server.should.have.property('_isInitialized', true);
    });

    describe('index page', function() {
        before(utils.requestUrl(testPort, '/'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it('response should be json', function() {
            this.resp.should.have.header('content-type', 'text/html; charset=utf-8');
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
    });

    describe('client entry point', function() {
        before(utils.requestUrl(testPort, '/js/client.js'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it('response should be javascript', function() {
            this.resp.should.have.header('content-type', 'text/javascript');
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
    });
    describe('compiled less', function() {
        before(utils.requestUrl(testPort, '/assets/css/example.css'));

        it ('should return status 200', function() {
            this.resp.should.have.status(200);
        });

        it('response should be javascript', function() {
            this.resp.should.have.header('content-type', 'text/css; charset=UTF-8');
        });

        it ('should have a body', function() {
            should.exist(this.body);
        });
    });

    describe('stop server', utils.stopServer);
});
