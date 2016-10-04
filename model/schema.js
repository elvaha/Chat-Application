/**
 * Created by elias on 27-09-2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var exports = module.exports = {};


// Database Room collection

exports.MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

exports.Message = mongoose.model('Message', exports.MessageSchema);

exports.RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        defualt: Date.now
    },
    messages: [exports.MessageSchema]
});

exports.Room = mongoose.model('Room', exports.RoomSchema);

// Database User collection

exports.UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

exports.User = mongoose.model('User', exports.UserSchema);