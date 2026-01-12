const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) =>  {
    const {role} = req.body;
    console.log(req.body);
    res.render('login', {role});
})

router.post('/register', (req, res, next) => {
    const {rolla} = req.body;
    console.log(req.body);
    res.render('register',{rolla});
})

module.exports = { common_router : router};