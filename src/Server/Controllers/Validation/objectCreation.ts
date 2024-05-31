import {Request, Response, NextFunction} from 'express'

import middleware from '../../Types/middleware'

const objectCreation: middleware = (req, res, next)=>{

 try{

    const { prompt, id, user } = req.body as { prompt: string; id: string; user: string };

    if (typeof id !== 'string' || typeof prompt !== 'string' || typeof user !== 'string'){
        return res.status(400).send('Invalid request body');
    }

    res.locals.object = {}
    res.locals.user = user
    res.locals.id = id
    res.locals.prompt = prompt

    return next()

    } catch(error){
        return next(error)
    }
}


export default objectCreation;