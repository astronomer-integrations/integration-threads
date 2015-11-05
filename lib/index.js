'use strict';

/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');

//
// /**
//  * Expose `Threads`
//  */
//
var Threads = module.exports = integration('Threads')
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.eventKey')
  .endpoint('https://input.threads.io/v1/segment/webhook')
  .timeout('3s');

// /**
//  * Expose our methods
//  */
//
Threads.prototype.identify = request;
Threads.prototype.track = request;
Threads.prototype.page = request;

// /**
//  * Request.
//  *
//  * @param {Facade} message
//  * @param {Function} fn
//  * @api private
//  */
//
function request(message, done){
  var body = JSON.stringify(transform(message.json()));
  this.post()
    .query({ integration: 'astronomer' })
    .query({ eventKey: this.settings.eventKey })
    .type('json')
    .send(body)
    .parse(ignore)
    .end(this.handle(done));
}

/**
 * Ignore is a superagent parser (which segmentio-integration
 * uses under the hood) to just completely ignore the response
 * from the webhook request. This is ideal because we can't
 * rely on content-type header for parsing and more importantly we
 * don't really want to parse an unbound amount of data that
 * the request could respond with.
 */

function ignore(res, fn){
  res.text = '';
  res.on('data', function(){});
  res.on('end', fn);
}

function transform(msg){
  msg.userId = "" + msg.userId;
  return msg;
}
