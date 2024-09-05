const io = require('./server').io;
io.on('connection', (socket) => {
  console.log('a user connected', socket.handshake.auth.username);
  socket.on('connect', (e) => {
    console.log('auth: ' + e.username);
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('track', (track) => {
    if (track) {
      io.emit('track', track);
    }
  });
  socket.on('ice-candidate', (candidate) => {
    console.log('ice candidate: ' + candidate);
    io.emit('ice-candidate', candidate);
  });
  socket.on('offer', (offer) => {
    console.log('offer: ' + offer);
    io.emit('offer', offer);
  });
  socket.on('answer', (answer) => {
    console.log('answer: ' + answer);
    io.emit('answer', answer);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
