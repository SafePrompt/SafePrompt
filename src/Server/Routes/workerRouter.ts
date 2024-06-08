import express, {Request, Response} from 'express';
import worker from '../Controllers/Auth/worker';
import config from '../Controllers/Config/config';
import token from '../Controllers/Auth/token';



const router =  express.Router();

router.post('/signup', 
    worker.signup, 
    token.setToken, 

    (req,res)=>{
        res.status(200).json(res.locals.key)
    }),

router.post('/login', 
    worker.login,
    config.request, 
    token.setToken,
    
    (req,res)=>{
        res.status(200).json({key: res.locals.key, config: res.locals.config})
    })

    


export default router
