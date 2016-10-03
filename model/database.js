/**
 * Created by elias on 27-09-2016.
 */

var mongoose = require('mongoose');
var exports = module.exports = {};

//Connect to database
mongoose.connect('mongodb://localhost:5050/Uchat');
exports.db = mongoose.connection;
exports.db.on('error', console.error.bind(console, 'connection error:'));
exports.db.once('open', function () {
    console.log("we're connected to database through mongoose!");
});