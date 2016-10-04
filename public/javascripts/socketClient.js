/**
 * Created by elias on 13-09-2016.
 */
(function ($) {
    "use strict";

    var socket = io();
    var roomName = $('#roomName').text();

    socket.on('connect', function () {
        console.log('Room: ' + roomName);
        socket.emit('addUser', prompt("What's your name?"));
        //socket.emit('joinRoom', function (roomName) {
        //    console.log('room has been joined');
        //});
    });

    $('form-login').submit(function(){
       console.log('login clicked');
        $('.overlay').hide();
        return false;
    });

    $('form-create').submit(function(){
        console.log('create clicked');
        $('.overlay').hide();
        return false;
    });

    $('#show-create').click(function(){
       $('.login').hide();
        $('.create-user').show();
    });

    $('#form-send').submit(function () {

        console.log($('#message').val());
        $('#messages').append($('<li class="mymessage">').text('your msg: ' + $('#message').val()));
        console.log(socket);
        socket.emit('sendMessage', $('#message').val());
        $('#message').val('');
        return false;
    });

    socket.on('leaveRoom', function (room) {

    });

    socket.on('updateChat', function (data) {
        $('#messages').append($('<li class="message">').text(data));
    });

    function switchRoom(room){
        socket.emit('switchRoom', room);
    };

})(jQuery);

//    socket.username + ': ' +