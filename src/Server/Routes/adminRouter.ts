import express, {Request, Response} from 'express';
import admin from '../Controllers/Auth/admin';
import config from '../Controllers/Config/config'

const router =  express.Router();

router.post('/signup', 
    admin.signup,
    config.initialize,
    (req,res)=>{
    res.status(200).json(res.locals.key)
   
})

router.post('/login', 
    admin.login,


    (req,res)=>{
    res.status(200).json(res.locals.key)
   
})


export default router


