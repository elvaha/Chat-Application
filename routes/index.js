module.exports = function (io) {

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var schema = require('../model/schema');
    var database = require('../model/database');

    /**
     * SOCKET.IO
     * all index site socket IO things
     */

    io.on('AddUser', function (username) {
        socket.username = username;
    });


    /* GET home page. */
    router.get('/', function (req, res, next) {
        schema.Room.find({}, function (err, rooms) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.render('index', {
                    title: 'uChat',
                    rooms: rooms
                });
            }
        });
    });

    /* POST FROM index page */
    router.post('/', function (req, res, next) {

        var user = new schema.User(req.body);

        user.save(function (err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.send('users');
            }
        });
    });




    return router;
}