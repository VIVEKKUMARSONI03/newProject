const socket = io();

socket.emit('mff', 'i am a user');

socket.on('mfb', (msg) => {
    console.log(msg);
})