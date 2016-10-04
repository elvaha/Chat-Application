/**
 * Created by elias on 27-09-2016.
 */

    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    var schema = require('../model/schema');
    var database = require('../model/database');

    router.get('/:room', function (req, res, next) {

        schema.Room.find({
            'name': req.params.room
        }, function (err, rooms) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
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
            doc.messages.push(req.body);
        })
    });

module.exports = router;