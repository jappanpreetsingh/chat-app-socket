const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');

app.use('/',express.static(path.join(__dirname,'public'))); // serve static files at / path

const users = {};

io.on('connection',(socket)=>{
    console.log(`Connection established at ${socket.id}`);
    socket.on('send-msg',(data)=>{ // server listening
        io.emit('received-msg',{
            msg:data.msg,
            //id:socket.id
            user:users[socket.id]
        })
    })
    socket.on('login',(data)=>{ // server listening
        users[socket.id] = data.user;
    })
})




const port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server running at port ${port}`);
})