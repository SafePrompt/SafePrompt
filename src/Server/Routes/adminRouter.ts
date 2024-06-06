import express, {Request, Response} from 'express';
import admin from '../Controllers/Auth/admin';

const router =  express.Router();

router.post('/signup', 
    admin.signup,


    (req,res)=>{
    res.status(200).json(res.locals.key)
   
})

router.post('/login', 
    admin.login,


    (req,res)=>{
    res.status(200).json(res.locals.key)
   
})


export default router


