const socket = io();
const cover = document.getElementById('cover');
const not_me = document.getElementById('not_me');


not_me.addEventListener('click',()=>{
    cover.style.display = 'none';
})

setInterval(()=>{
  socket.on('s_conf_p',(msg) => {
   // window.location.href = '/user/arrived';
    cover.style.display = 'flex';
})
},500)

//dispatched wala functionality bhi execute karni hai