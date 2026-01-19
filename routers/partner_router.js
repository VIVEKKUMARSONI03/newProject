const express = require('express');
const partner_router = express.Router();
const { loginPartner,registerPartner, get_list, show_map, deliver } = require('../controllers/partner_controller');

partner_router.get('/login',(req, res, next) => {
    res.render('login');
})

partner_router.get('/register',(req,res,next)=>{
    res.render('register');
})

partner_router.post('/login',loginPartner);

partner_router.post('/register', registerPartner);

partner_router.post('/:email/get_list',get_list);

partner_router.post('/open_map/:email',show_map);

partner_router.post('/deliver/:lat/:lng/:placename/:name/:bcode',deliver);

partner_router.get('/arrived', (req, res,next) => {
    res.render('arrived_for_partner');
})

module.exports = {partner_router : partner_router };