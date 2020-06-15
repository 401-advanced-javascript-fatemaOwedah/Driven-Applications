'use strict';

const events = require('./events');


function driver(data) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${data.orderId}`);
    events.emit('in-transit', data);
  }, 1000);
  setTimeout(() => {
    console.log(`delivered up ${data.orderId}`);
    events.emit('delivered', data);
  }, 3000);
}
module.exports = driver;