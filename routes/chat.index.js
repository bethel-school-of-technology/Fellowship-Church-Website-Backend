const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./message.js');
const { isRealString } = require('./chat.validation');
const { ChatUsers } = require('./chat.users');
const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);
var users = new ChatUsers();

io.on('connection', (socket) => {

    socket.on('leave', (params) => {
        socket.leave(params.room);
    });

    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Bad request');
        }

        socket.join(params.room);
        users.removeChatUser(socket.id);
        users.addChatUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateChatUserList', users.getChatUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', params.room, 'Welcome to the chat app.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.room, `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getChatUser(socket.id);
        if (user && isRealString(message.text)) {
            let tempObj = generateMessage(user.name, user.room, message.text);
            io.to(user.room).emit('newMessage', tempObj);
            callback({
                data: tempObj
            });
        }
        callback();
    });

    socket.on('createLocationMsg', (coords) => {
        var user = users.getChatUser(socket.id);
        if (user) {
            io.to(user.room).emit('createLocationMsg', generateLocationMessage(user.name, user.room, coords.lat, coords.lon));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeChatUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateChatUserList', users.getChatUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.room, `${user.name} has left.`));
        }
    });

});



module.exports = io;