const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);


//local module
const { connectDB } = require('./utils/mongoConnection');
const rootdir = require('./utils/get_path');
const {project_router} = require('./routers/user_router');
const {admin_router} = require('./routers/admin_router');
const {partner_router} = require('./routers/partner_router');
const {common_router} = require('./routers/comman_router');
const {checkUser} = require('./controllers/user_controller');
const { findOneAndUpdate } = require('./models/user_model');
const {uarrived} = require('./controllers/user_controller');
const {parrived} = require('./controllers/partner_controller');

require('dotenv').config(); 
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootdir,'public')));

app.use('/admin',admin_router);
app.use('/partner', partner_router);
app.use('/user',project_router);
app.use('/common', common_router);

// app.use('/',(req,res, next)=>{
//     res.render('base_home');
// });

app.use('/',checkUser);

const uri = process.env.MONGODB_URI;

io.on('connection', (socket) => {
  console.log('guest online');

  socket.on('msg_from_user', (msg) => {
    socket.broadcast.emit('mfu_vb_fp', msg);
  });

  socket.on('msg_from_partner',(msg) => {
    socket.broadcast.emit('mfp_vb_fu',msg);
  });

  socket.on('u_to_X',(msg) => {
    console.log("user ne bhija hai ",msg);
       socket.broadcast.emit('s_conf_u',msg);
  });

  socket.on('p_to_X',(msg) => {
       //console.log('partner ne bheja hai ,',msg);
       socket.broadcast.emit('s_conf_p',msg);
  });

  socket.on('me',(msg) =>{
       socket.broadcast.emit('scs_dlv',msg); //sending msg to every body even to the sender too
  })

  socket.on('not_me',(msg) => {
       //socket.broadcast.emit('')
  })

  socket.on('payment_done',(msg) => {
       socket.broadcast.emit('payment',"payment done");
  })

  socket.on('disconnect', () => {
    console.log('guest offline');
  });
});

connectDB(`${uri}/${process.env.DB_NAME}`).then(() => {

    server.listen(process.env.PORT, () => {
        console.log(`server is listening at ${process.env.PORT}`);
    })

}).catch( (err) => {
    console.log('mongodb conneciton failed and the error is : ',err);
})
