'use strict';

const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8000;

client.connect(PORT, HOST, ()=> {console.log('Driver got connected');});

client.on('data', function(data) {
  let obj = JSON.parse(data); 
  if (obj.event =='pickup'){
    setTimeout(() => {
      console.log(`DRIVER: picked up ${obj.payload.orderId}`);
      client.write(JSON.stringify({event:'in-transit',time:new Date(), payload:obj.payload}));
    }, 1000);
    setTimeout(() => {
      console.log(`DRIVER: delivered up ${obj.payload.orderId}`);
      client.write(JSON.stringify({event:'delivered',time:new Date(), payload:obj.payload}));
    }, 3000);
  }  
});

client.on('close', function() {
  console.log('Driver Connection got closed');
});
client.on('error', (e) => {
  console.log('Driver ERROR', e);
});