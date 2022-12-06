const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const PORT = 3000;
const mysql = require('mysql');

// todo sql作成
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'progate',
//     password: 'password',
//     database: 'list_app'
// });

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

server.listen(PORT);

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('sendMessage', (message) => {
  console.log('Message has been sent: ', message);

  io.emit('receiveMessage', message);
  });
});
