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

server.listen(PORT);

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



io.on('connection', (socket) => {
  console.log('connected');

  socket.on('sendMessage',message => {
    let afterIsAttend = message.attendance;let id = message.id;
    console.log(afterIsAttend);console.log(id);
    connection.query(
      'UPDATE people SET attendance = (?) WHERE id = (?);',
      [afterIsAttend,id],
      (error, results) => {
        if (error){console.log(error);
        }else{
        console.log(results);
        io.emit('receiveMessage', "complete updating DB!");

        connection.query(
          "select * from people;",
          (error,results) =>{
            console.log(results);
          }
        )
        }
      }
    )

  });
});


