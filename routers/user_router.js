const express = require('express');
const project_router = express.Router();
const { loginUser,registerUser, create_order } = require('../controllers/user_controller');

project_router.get('/login',(req, res, next) => {
    res.render('login');
})

project_router.get('/register',(req,res,next)=>{
    res.render('register');
})

project_router.post('/login',loginUser);

project_router.post('/register', registerUser);

// project_router.get('/home',(req, res, next) => {
//     res.render('home');
// });

project_router.post('/order/:email',create_order);


module.exports = {project_router : project_router };