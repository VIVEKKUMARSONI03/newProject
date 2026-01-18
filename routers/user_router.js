const express = require('express');
const project_router = express.Router();
const { loginUser,registerUser, create_order, show_map, cancel } = require('../controllers/user_controller');

project_router.get('/login',(req, res, next) => {
    res.render('login');
})

project_router.get('/register',(req,res,next)=>{
    res.render('register');
})

project_router.post('/login',loginUser);

project_router.post('/register', registerUser);

project_router.post('/order/:email',create_order);

project_router.post('/open_map/:email',show_map);

project_router.post('/manage_orders/:email',(req, res, next) => {
    const {orderId} = req.body;
    const {email} = req.params;
    console.log('email is : ',email, 'orderlist is : ',orderId);
    res.render('manage_orders', {email : email,orderId: orderId});
});

project_router.post('/cancel/:email',cancel);


module.exports = {project_router : project_router };