const express = require('express');
const app = express();

const { connectDB } = require('./utils/mongoConnection');


app.use(express.json());
app.use(express.urlencoded({extended:true}));


const uri = "mongodb+srv://vermachandra896:chandra1234@cluster0.hpioxnn.mongodb.net/projectUjwala";

connectDB(uri).then(() => {

    app.listen(3000, () => {
        console.log("server is listening at 3000");
    })

}).catch( (err) => {
    console.log('mongodb conneciton failed and the error is : ',err);
})