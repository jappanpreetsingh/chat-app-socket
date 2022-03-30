const socket = io();

$('#chatting').hide();

$('#send-btn').click(function(){
    const msgText = $('#inp-msg').val();
    //console.log(msgText);
    socket.emit('send-msg',{
        msg:msgText
    })
    $('#inp-msg').val("");
})
socket.on('received-msg',(data)=>{
    // lets append the received msg on ul
    $('#chat').append(`<li><strong>${data.user} :</strong> says ${data.msg}</li>`);
    $('#chat-box').scrollTop($('#chat-box').outerHeight()); // taki msgs aane pe automatically upar scroll hota jaye
})

$('#login-btn').click(function(){
    const user = $('#login-inp').val();
    //console.log(user);
    $('#login-inp').val("");
    socket.emit('login',{ // user bheja as a key to server
        user: user
    })
    $('#login').hide();
    $('#chatting').show();
})