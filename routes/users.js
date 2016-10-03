var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET users listing. */
router.get('/', function (req, res, next) {
    schema.User.find({}, function (err, user) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(user);
            res.render('users', {
                title: 'Users',
                users: user
            });
        }
    });
});

router.post('/', function (req, res, next) {

    var user = new schema.User(req.body);

    user.save(function (err, user) {
        if (err) {
            return console.error(err);
        } else {
            res.send('users');
        }
    })
});

module.exports = router;