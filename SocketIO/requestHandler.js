/**
 * Created by elias on 04-10-2016.
 */

module.exports = function(socket){
console.log("We are connected");

socket.on('joinRoom', function (room) {
    console.log(room + ' has been joined');
    socket.room = room;
    socket.join(room);
    socket.broadcast.to(room).emit('updateChat', socket.username + ' has joined the room');
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
});

//io.on('AddUser', function (username) {
//    socket.username = username;
//});

}