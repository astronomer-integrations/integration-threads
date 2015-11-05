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
    .end(this.handle(done));
}

function transform(msg){
  msg.userId = "" + msg.userId;
  return msg;
}
