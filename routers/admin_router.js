const express = require('express');
const admin_router = express.Router();
const { loginAdmin,registerAdmin } = require('../controllers/admin_controller');

admin_router.get('/login',(req, res, next) => {
    res.render('login');
})

admin_router.get('/register',(req,res,next)=>{
    res.render('register');
})

admin_router.post('/login',loginAdmin);

admin_router.post('/register', registerAdmin);

admin_router.get('/home',(req, res) => {
    res.render('admin_home');
})

module.exports = {admin_router : admin_router };