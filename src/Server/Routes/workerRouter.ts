import express, {Request, Response} from 'express';
import worker from '../Controllers/Auth/worker';

const router =  express.Router();

router.post('/signup', worker.signup, (req,res)=>{
        res.status(200).json(res.locals.key)
    }),

router.post('/login', worker.login, (req,res)=>{
        res.status(200).json(res.locals.key)
    })

    


export default router
