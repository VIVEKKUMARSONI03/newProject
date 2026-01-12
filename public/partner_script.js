const socket = io();

socket.emit('mff', 'i am partner');

socket.on('mfb', (msg) => {
    console.log(msg);
})