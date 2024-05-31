import express, {Request, Response} from 'express';

const router =  express.Router();


//validation checks
import objectCreation from '../Controllers/Validation/objectCreation';
import phone from '../Controllers/Validation/phone';

const address = require('../Controllers/Validation/address');
const code = require('../Controllers/Validation/code');
const currency = require('../Controllers/Validation/currency');
const dictionary = require('../Controllers/Validation/dictionary');
const email = require('../Controllers/Validation/email');
const keyword = require('../Controllers/Validation/keyword');

//query storage 
const queryStore = require('../Controllers/queryStore');


router.post('/', 
    objectCreation,
    phone,

    (req: Request, res: Response)=>{
    res.send(res.locals.object)
})




module.exports = router;
