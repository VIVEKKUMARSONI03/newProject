const socket = io();
const cover = document.getElementById('cover');
const me = document.getElementById('me');
const not_me = document.getElementById('not_me');
const cover2 = document.getElementById('cover2');
const payment_button = document.getElementById('payment_button');


not_me.addEventListener('click',()=>{
    cover.style.display = 'none';
    socket.emit('not_me',"you are at wrong user");
})

me.addEventListener('click', ()=>{
    cover.style.display = 'none';
    cover2.style.display = 'flex';
    socket.emit('me',"yes i am");
})

payment_button.addEventListener('click',() => {

    socket.emit('payment_done',"payment_done");
})

//setInterval(()=>{
  socket.on('s_conf_p',(msg) => {
   // window.location.href = '/user/arrived';
    cover.style.display = 'flex';
})
//},500)

//dispatched wala functionality bhi execute karni hai