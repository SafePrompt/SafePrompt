import express, {Request, Response} from 'express';

const router =  express.Router();


//validation checks
import objectCreation from '../Controllers/Validation/objectCreation';

import phone from '../Controllers/Validation/phone';
import email from '../Controllers/Validation/email';
import keyword from '../Controllers/Validation/keyword'

const address = require('../Controllers/Validation/address');
const code = require('../Controllers/Validation/code');
const currency = require('../Controllers/Validation/currency');
const dictionary = require('../Controllers/Validation/dictionary');

//query storage 
const queryStore = require('../Controllers/queryStore');


router.post('/', 
    objectCreation,
    phone,
    email,
    keyword,

    (req: Request, res: Response)=>{
    res.send(res.locals.object)
})

export default router
