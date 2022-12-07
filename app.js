const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const PORT = 3000;

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'yakofutsalapp'
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  connection.query(
    'select * from people; ',
    (error, results) => {
  
      if (error){
        console.log(error);
      }
      res.render('index.ejs',{people: results});
      
    }
  );
});

server.listen(PORT);

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('sendMessage', (message) => {
  console.log('Message has been sent: ', message);

  io.emit('receiveMessage', message);
  });
});


