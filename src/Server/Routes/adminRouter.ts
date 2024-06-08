import express, {Request, Response} from 'express';
import admin from '../Controllers/Auth/admin';
import config from '../Controllers/Config/config';
import token from '../Controllers/Auth/token';

const router =  express.Router();

router.post('/signup', 
    admin.signup,
    config.initialize,
    token.setToken,
    (req,res)=>{
    res.status(200).json(res.locals.key)
   
})

router.post('/login', 
    admin.login,
    token.setToken,
    config.request,
    


    (req,res)=>{
    res.status(200).json({key: res.locals.key, config: res.locals.config})
   
})


export default router


