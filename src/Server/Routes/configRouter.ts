import express, {Request, Response} from 'express';

const router =  express.Router();

import config from '../Controllers/Config/config'





//query storage

import queryStore from '../Controllers/queryStore';

router.post('/submit', 
    config.submit,
    

    (req: Request, res: Response)=>{
    res.sendStatus(200);
})

router.get('/request',
    config.request,
    (req: Request, res: Response)=>{
    res.status(200).json(res.locals.config);
})

export default router
