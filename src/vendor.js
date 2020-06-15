'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');


events.on('delivered',consoleThanks);

function consoleThanks(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
}

setInterval(() => {
  let data = {
    storeName : process.env.STORE_NAME,
    orderId : faker.random.uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress(),
  };
  events.emit('pickup', data);
}, 5000);
