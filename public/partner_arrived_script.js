const socket = io();

setInterval(() => {
    socket.emit('p_to_X',"partner_bola");
},500);