const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const scoketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

dotenv.config();
const key = fs.readFileSync('./certs/cert.key');
const cert = fs.readFileSync('./certs/cert.crt');
const server = https.createServer({key, cert}, app);
const io = scoketio(server, {
  cors: {
    origin: 'https://react-video-chat-app-puce.vercel.app/',
    methods: ['GET', 'POST'],
  },
});

server.listen(3000, () => {
  console.log(
    'server is running at 3000',
    'https://localhost:' + server.address().port,
  );
});

module.exports = {server, app, io};
