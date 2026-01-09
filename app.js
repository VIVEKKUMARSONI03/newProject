const express = require('express');
const app = express();
const path = require('path');

//local module
const { connectDB } = require('./utils/mongoConnection');
const rootdir = require('./utils/get_path');
const { bh } = require('./controllers/base_home');
const {project_router} = require('./routers/project_router');


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(rootdir,'public')));


app.use('/project',project_router);
app.use('/',bh);


const uri = "mongodb+srv://vermachandra896:chandra1234@cluster0.hpioxnn.mongodb.net/project";

connectDB(uri).then(() => {

    app.listen(3000, () => {
        console.log("server is listening at 3000");
    })

}).catch( (err) => {
    console.log('mongodb conneciton failed and the error is : ',err);
})