    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var schema = require('../model/schema');
    var database = require('../model/database');

    /**
     * SOCKET.IO
     * all index site socket IO things
     */
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

    router.get('/:room', function(req, res, next){
       var room = req.params.room;
        schema.Room.find({}, function (err, rooms) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.render('index', {
                    title: 'uChat',
                    rooms: rooms,
                    chatRoom: room
                });
            }
        });
    });

    /* POST FROM index page */
    router.post('/createuser', function (req, res, next) {
        console.log(req.body);

        var newUser = {'name' : req.body.newname,
            'password' : req.body.newpass
        }

        var user = new schema.User(newUser);
        user.save(function (err, user) {
            if (err) {
                return console.error(err);
            } else {
                res.redirect('back');
                //res.redirect(req.get('referer'));
            }
        });
    });

module.exports = router;