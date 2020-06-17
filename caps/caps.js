// 'use strict';
// require('dotenv').config();

// const net = require('net');
// var uuid = require('uuid-random');

// const PORT = process.env.PORT || 8000;

// const server = net.createServer();

// server.listen(PORT, () => console.log(`Server is up on ${PORT}`));

// let socketPool = {};


// server.on('connection', (socket) => {

//   const id = `Socket-${uuid()}`;
//   console.log(`client with ID : ${id} is connected!!! `);

//   socketPool[id] = socket;

//   socket.on('data', (buffer) => dispatchEvent(buffer));

//   socket.on('error', (e) => { console.log('SOCKET ERR', e); });

//   socket.on('end', (end) => {
//     console.log('connection ended', end);
//     delete socketPool[id];
//   });
// });

// server.on('error', (e) => {
//   console.log('SERVER ERROR', e);
// });

// function dispatchEvent(buffer) {
//   let obj = JSON.parse(buffer.toString().trim());
//   console.log('Event', obj);
//   broadcast(obj);
// }

// function broadcast(obj) {
//   let stringg = JSON.stringify(obj);
//   for (let socket in socketPool) {
//     socketPool[socket].write(stringg);
//   }
// }

'use strict';

module.exports = (io) => {
  const caps = io.of('/caps'); 
  caps.on('connection', (socket) => {

    console.log('Welcome to the caps App!', socket.id);
    let currentRoom = '';
    
    socket.on('join', (room) => {
      socket.leave(currentRoom);
      socket.join(room);
      currentRoom = room;
      console.log('joined room', room);
      
      io.emit('action', `Someone joined the room: ${room}`);
      /* send this to the sender only */
      caps.to(`${socket.id}`).emit('joined', room);

      socket.on('message', (payload) => {
        // emitting to everyone in the room including the sender
        caps.to(currentRoom).emit('message', payload);
      });
    });
  });
};
const io = require('socket.io')(3000);



