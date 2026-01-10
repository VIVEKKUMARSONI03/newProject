const express = require('express');
const partner_router = express.Router();
const { loginPartner,registerPartner, get_list } = require('../controllers/partner_controller');

partner_router.get('/login',(req, res, next) => {
    res.render('login');
})

partner_router.get('/register',(req,res,next)=>{
    res.render('register');
})

partner_router.post('/login',loginPartner);

partner_router.post('/register', registerPartner);

partner_router.post('/get_list',get_list);

module.exports = {partner_router : partner_router };