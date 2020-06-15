'use strict';

const events = require('./src/events');
const driver = require('./src/driver');
require('./src/vendor');
events.on('pickup', payload => logIt('pickup', payload));
events.on('in-transit', payload => logIt1('in-transit', payload));
events.on('delivered', payload => logIt2('delivered', payload));

function logIt(event, payload) {
  logIt1(event, payload);
  driver(payload);
}
function logIt1(event, payload) {
  let time = new Date();
  console.log('EVENT',{event, time, payload});
}

function logIt2(event, payload) {
  let time = new Date();
  console.log('EVENT',{event, time, payload});
}




