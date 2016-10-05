/**
 * Created by elias on 13-09-2016.
 */
(function ($) {
    "use strict";

    var socket = io();
    var roomName = $('#roomName').text();
    var yourname = '';

    socket.on('connect', function () {
        console.log('Room: ' + roomName);
    });

    $('#login').click(function () {
        console.log('login clicked');
        $('.overlay').hide();

        var username = $('#name').val();
        var password = $('#password').val();

        var data = {
            'name': username,
            'password': password
        };
        socket.emit('login', data);
        yourname = username;
        return false;
    });

    $('#form-create').submit(function () {
        console.log('create clicked');
        $('.overlay').hide();
        var username = $('#newname').val();
        var password = $('#newpass').val();

        var data = {
            'name': username,
            'password': password
        };
        socket.emit('addUser', data)
        return false;
    });

    $('#show-create').click(function () {
        $('.login').hide();
        $('.create-user').show();
    });

    $('#form-send').submit(function () {
        var message = $('#message').val();
        $('#messages').append($('<div class="mymessage col-lg-7">').text(yourname + ': ' + message));
        console.log(socket);
        socket.emit('sendMessage', message);
        $('#message').val('');
        return false;
    });

    socket.on('leaveRoom', function (room) {

    });

    socket.on('updateChat', function (username, data) {
        if (username == 'SERVER') {
            $('#messages').append($('<div class="servermessage col-lg-12">').text(username + ': ' + data));
        } else {
            $('#messages').append($('<div class="message col-lg-7">').text(username + ': ' + data));
        }

    });

    socket.on('checkAuthenticate', function (err, data) {
        if (data) {
            $('.overlay').hide();
            $('.login-hover').hide();
        } else {
            //handle error    
        }
    });

    $('.roomswitch').click(function (data) {
        var room = data.currentTarget.innerHTML;
        $('#chatHeader').text(room);
        socket.emit('joinRoom', room);
        $('.chatRoom').show();
    })

})(jQuery);

//    socket.username + ': ' +