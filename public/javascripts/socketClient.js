/**
 * Created by elias on 13-09-2016.
 */
(function ($) {
    "use strict";

    var socket = io();
    var roomName = $('#roomName').text();

    socket.on('connect', function () {
        console.log('Room: ' + roomName);
    });

    socket.emit('joinRoom', function (roomName) {
        console.log('room has been joined');
    });

    $('form').submit(function () {

        $('<input />').attr('type', 'hidden')
            .attr('name', "username")
            .attr('value', socket.username)
            .appendTo('form');


        console.log($('#message').val());
        $('#messages').append($('<li class="mymessage">').text('your msg: ' + $('#message').val()));

        socket.emit('sendMessage', $('#message').val());
        $('#message').val('');
        return false;
    });

    socket.on('leaveRoom', function (room) {

    });

    socket.on('sendMessage', function (data) {
        $('#messages').append($('<li>').text(data));
    });

})(jQuery);

//    socket.username + ': ' +