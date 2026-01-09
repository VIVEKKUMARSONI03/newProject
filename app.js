const express = require('express');
const app = express();
const path = require('path');

//local module
const { connectDB } = require('./utils/mongoConnection');
const rootdir = require('./utils/get_path');
const {project_router} = require('./routers/user_router');
const {admin_router} = require('./routers/admin_router');
const {partner_router} = require('./routers/partner_router');
const {common_router} = require('./routers/comman_router');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootdir,'public')));

app.use('/admin',admin_router);
app.use('/partner', partner_router);
app.use('/user',project_router);
app.use('/common', common_router);
app.use('/',(req, res, next)=>{
    res.render('base_home')
})
// app.use('/',(req,res,next) => {
//     res.render('404');
// })


const uri = "mongodb+srv://vermachandra896:chandra1234@cluster0.hpioxnn.mongodb.net/project";

connectDB(uri).then(() => {

    app.listen(3000, () => {
        console.log("server is listening at 3000");
    })

}).catch( (err) => {
    console.log('mongodb conneciton failed and the error is : ',err);
})