import express, {Request, Response} from 'express';
import worker from '../Controllers/Auth/worker';
import config from '../Controllers/Config/config';

const router =  express.Router();

router.post('/signup', worker.signup, (req,res)=>{
        res.status(200).json(res.locals.key)
    }),

router.post('/login', 
    worker.login,
    config.request, 
    
    (req,res)=>{


    res.status(200).json({key: res.locals.key, config: res.locals.config})
    })

    


export default router
