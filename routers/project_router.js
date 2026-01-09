const express = require('express');
const project_router = express.Router();

project_router.get('/login',(req, res, next) => {
    res.render('login');
})

project_router.get('/register',(req,res,next)=>{
    res.render('register');
})


module.exports = {project_router : project_router };