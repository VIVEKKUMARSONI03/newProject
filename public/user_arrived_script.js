const socket = io();
const me = document.getElementById('me');
const not_me = document.getElementById('not_me');

setInterval(()=>{
    socket.emit('u_to_X',"band_karo_bhai");
},500);

me.addEventListener('click',() =>{
      socket.emit('me',"ha mai hi hu : user bola");
});

not_me.addEventListener('click',()=>{
    socket.emit('not_me','na mai nahi hu usre bola');
});