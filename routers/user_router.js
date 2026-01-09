const express = require('express');
const project_router = express.Router();
const { loginUser,registerUser } = require('../controllers/user_controller');

project_router.get('/login',(req, res, next) => {
    res.render('login');
})

project_router.get('/register',(req,res,next)=>{
    res.render('register');
})

project_router.post('/login',loginUser);

project_router.post('/register', registerUser);

project_router.get('/home',(req, res, next) => {
    res.render('home');
})


module.exports = {project_router : project_router };