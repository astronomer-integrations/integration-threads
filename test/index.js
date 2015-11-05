'use strict';

var Test = require('segmentio-integration-tester');
var Threads = require('..');
var assert = require('assert');

describe('Threads', function(){
    var types = ['track', 'identify', 'page'];
    var threads;
    var settings;
    var test;

    beforeEach(function(){
        settings = {
            eventKey: 'c01be3ce4c7ed82939024dbf39cb8ffbf70b6be6307fcc2c'
        };
        threads = new Threads(settings);
        test = Test(threads, __dirname);
    });

    it('should have the correct settings', function() {
        test
        .name('Threads')
        .ensure('settings.eventKey')
        .channels(['server', 'mobile', 'client'])
        .endpoint('https://input.threads.io/v1/segment/webhook')
        .timeout('3s');
    });

    types.forEach(function(type) {
        describe('#' + type, function(){
            var json;

            beforeEach(function(){
                json = test.fixture(type + '-basic');
            });

            it('should succeed on valid call', function(done){
                test
                .set(settings)
                [type](json.input)
                .expects(202)
                .end(done);
            });

            it('should convert userId to string', function(done){
                json.input.userId = 1234;
                test
                .set(settings)
                [type](json.input)
                .expects(202)
                .end(done);
            });
        });
    });
});
