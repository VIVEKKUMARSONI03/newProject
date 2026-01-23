const express = require('express');
const partner_router = express.Router();
const { loginPartner,registerPartner, get_list, show_map, deliver, reached } = require('../controllers/partner_controller');

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

partner_router.post('/deliver/:lat/:lng/:placename/:name/:payment/:bcode',deliver);

partner_router.get('/reached/:user_name_in_order',reached);

module.exports = {partner_router : partner_router };