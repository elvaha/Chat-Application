/**
 * Created by elias on 27-09-2016.
 */
module.exports = function (io) {

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var schema = require('../model/schema');
    var database = require('../model/database');


    /**
     *SOCKET IO
     * all socket io commumication for a room
     */

    io.on('joinRoom', function (room) {
        console.log(room + ' has been joined');
        socket.room = room;
        socket.join(room);
        socket.broadcast.to(room).emit('updateChat', socket.username + ' has joined the room');
    });

    io.on('leaveRoom', function (username) {
        socket.broadcast.to(socket.room).emit('leaving', socket.username + ' has left the room');
        socket.leave(socket.room);

    });

    io.on('disconnect', function () {
        io.sockets.emit('updateusers', usernames);
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });

    io.on('sendMessage', function (data) {
        console.log('msg: ' + data);
    });




    router.get('/:room', function (req, res, next) {

        schema.Room.find({
            'name': req.params.room
        }, function (err, rooms) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                //                if (io.username == null) {
                //                    res.render('error', {
                //                        'error': {
                //                            'stack': "no user found go back to homepage",
                //                            'status': "NO USER FOUND"
                //                        }
                //                    });
                //                } else {
                res.render('room', {
                    'room': req.params.room,
                    messages: rooms.messages
                });
                //                }
            }
        });
    });

    router.post('/:room', function (req, res, next) {

        var message = {
            'name': req.body.username,
            'content': req.body.message
        }

        var room = schema.Room.findOne({
            name: req.params.room
        }, function (err, doc) {
            doc.messages.push(req.body.)
        })
    });


    return router;
}