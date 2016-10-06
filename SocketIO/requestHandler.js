/**
 * Created by elias on 04-10-2016.
 */

var mongoose = require('mongoose');
var Schema = require('../model/schema');
var database = require('../model/database');
var db = require('../model/model')(database);


module.exports = function (socket, io) {
    console.log("We are connected");

    socket.on('joinRoom', function (room) {
        console.log(room + ' has been joined');
        socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + ' has left the room')
        socket.leave(socket.room);
        socket.room = room;
        socket.join(socket.room);
        socket.emit('updatechat', 'you have connected to ' + socket.room);
        socket.broadcast.to(socket.room).emit('updateChat', socket.username + ' has joined the room');
    });

    socket.on('leaveRoom', function (username) {
        socket.broadcast.to(socket.room).emit('leaving', socket.username + ' has left the room');
        socket.leave(socket.room);

    });

    socket.on('disconnect', function () {
        //socket.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });

    socket.on('sendMessage', function (data) {
        console.log('msg: ' + data);
        socket.broadcast.to(socket.room).emit('updateChat', socket.username, data);
    });

    socket.on('addUser', function (data) {
        socket.username = data.name;

        var newUser = {
            'name': data.name,
            'password': data.password
        }

        console.log(socket.username);
        var user = new Schema.User(newUser);
        user.save(function (err, user) {
            if (err) {
                socket.authenticated = false;
                socket.emit('checkAuthenticate', socket.authenticated);
            } else {
                socket.authenticated = true;
                socket.emit('checkAuthenticate', socket.authenticated);
            }
        });
    });


    socket.on('login', function (data) {

        Schema.User.findOne({
            'name': data.name,
            'password': data.password
        }, function (err, user) {
            if (err) {
                console.log(err);
                socket.authenticated = false;
            }
            if (user) {
                console.log(user);
                socket.username = data.username;
                socket.authenticated = true;
                socket.emit('checkAuthenticate', '', socket.authenticated);
            } else {
                console.log('error');
                socket.authenticated = false;
                socket.emit('checkAuthenticate', 'User does not exist', socket.authenticated);
            }
        });
    });

}