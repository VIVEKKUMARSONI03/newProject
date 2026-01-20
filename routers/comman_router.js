const express = require('express');
const router = express.Router();

const Branch = require('../models/branch_model');

router.post('/login', (req, res, next) =>  {
    const {role} = req.body;
    console.log(req.body);
    res.render('login', {role});
})

router.post('/register', async(req, res, next) => {
    const {rolla} = req.body;
    console.log(req.body);

    const branch_list = await Branch.find();

    res.render('register',{rolla:rolla, branch_list: branch_list});
})

module.exports = { common_router : router};