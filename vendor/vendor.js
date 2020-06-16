'use strict';

const net = require('net');
require('dotenv').config();
const client = new net.Socket();
const faker = require('faker');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;

client.connect(PORT, HOST, ()=> {console.log('Vendor got connected');});

client.on('data', function(data){
  let obj = JSON.parse(data);
  if(obj.event === 'delivered'){
    console.log('VENDOR: Thank you for delivering', obj.payload.orderId);
  }
});

setInterval(fakeInfo, 5000);

function fakeInfo(){
  let data = {
    storeName : process.env.STORE_NAME,
    orderId : faker.random.uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress()
  };
  client.write(JSON.stringify({event:'pickup', payload:data}));
}


client.on('close', function() {
  console.log('vendor Connection got closed');
});