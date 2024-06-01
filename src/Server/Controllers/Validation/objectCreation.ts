import {Request, Response, NextFunction} from 'express'

import middleware from '../../Types/middleware'

const objectCreation: middleware = (req, res, next)=>{

 try{

    const { prompt, key, user } = req.body as { prompt: string; key: string; user: string };

    if (typeof key !== 'string' || typeof prompt !== 'string' || typeof user !== 'string'){
        return res.status(400).send('Invalid request body');
    }

    res.locals.object = {prompt: prompt}
    res.locals.user = user
    res.locals.key = key
    res.locals.prompt = prompt

    return next()

    } catch(error){
        return next(error)
    }
}


export default objectCreation;