const socket = io();

socket.emit('mff', 'i am admin');

socket.on('mfb', (msg) => {
    console.log(msg);
})