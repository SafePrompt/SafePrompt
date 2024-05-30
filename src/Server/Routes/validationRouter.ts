import express from 'express';

const router =  express.Router();


//validation checks
const address = require('../Controllers/Validation/address');
const code = require('../Controllers/Validation/code');
const currency = require('../Controllers/Validation/currency');
const dictionary = require('../Controllers/Validation/dictionary');
const email = require('../Controllers/Validation/email');
const keyword = require('../Controllers/Validation/keyword');
const phone = require('../Controllers/Validation/phone');

//query storage 
const queryStore = require('../Controllers/queryStore');


router.post('/', (req,res)=>{
    res.send({})
})




module.exports = router;
