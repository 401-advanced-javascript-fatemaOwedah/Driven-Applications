'use strict';

require('dotenv').config();

const net = require('net');
const faker = require('faker');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;

client.connect(PORT, HOST, ()=> {console.log('Vendor got connected');});

client.on('data', function(data){
  let obj = JSON.parse(data);
  if(obj.event == 'delivered'){
    console.log(`VENDOR: Thank you for delivering ${obj.payload.orderId}`);
  }
});

let setIn = setInterval(fakeInfo, 5000);

function fakeInfo(){
  let obj = {
    storeName : process.env.STORE_NAME || 'OpheliaStore',
    orderId : faker.random.uuid(),
    customerName : faker.name.findName(),
    address : faker.address.streetAddress()
  };
  client.write(JSON.stringify({event:'pickup',time:new Date(),payload:obj}));
}
client.on('close', function() {
  clearInterval(setIn);
  console.log('Vindor Connection got closed');
});
client.on('error', (e) => {
  console.log('Driver ERROR', e);
});