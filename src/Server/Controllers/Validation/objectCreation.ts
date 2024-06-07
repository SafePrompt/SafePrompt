import {Request, Response, NextFunction} from 'express'

import AsyncMiddleware from '../../Types/asyncMiddleware';
import db from '../../Models/db';

const objectCreation = async (req: Request, res: Response, next: NextFunction)=>{

    try{

    



    const { prompt, key, user } = req.body as { prompt: string; key: string; user: string };

    const configResponse = await db.query('SELECT * FROM config WHERE key = $1;',[key])

    req.body.config = configResponse.rows[0];
    

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