const express = require('express');

const { connectDB } = require('./utils/mongoConnection');

const app = express();

const uri = "mongodb+srv://vermachandra896:chandra1234@cluster0.hpioxnn.mongodb.net/projectUjwala";

connectDB(uri).then(() => {

    app.listen(3000, () => {
        console.log("server is listening at 3000");
    })

}).catch( (err) => {
    console.log('mongodb conneciton failed and the error is : ',err);
})