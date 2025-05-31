import { Server as socketIo } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';

let io;

function initializeSocket(server) {
  io = new socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected : ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, userType } = data;

      if (userType === 'user') {
        await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === 'captain') {
        await Captain.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected : ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit('message', message);
  } else {
    console.log('Socket.io is not initialized');
  }
}

export { initializeSocket, sendMessageToSocketId };
