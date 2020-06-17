'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000/caps');

const storeName = process.env.STORE_NAME || 'OpheliaStore';
socket.emit('join', storeName);

socket.on('delivered', (payload) =>{
  console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);
})
setInterval(fakeInfo, 5000);

function fakeInfo(){
  let obj = {
    storeName : process.env.STORE_NAME || 'OpheliaStore',
    orderId : faker.random.uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress()
  };
  socket.emit('pickup', obj);
}
