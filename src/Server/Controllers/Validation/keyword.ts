import {Request, Response, NextFunction} from 'express'
import db from '../../Models/db';

import AsyncMiddleware from '../../Types/asyncMiddleware';
import Keyword from '../../Types/db'


/*
NOTE: we still need to build functionality to populate an organization's keywords in db.

database finds organization specific keywords by organization key.

hardcoded organization key:  "awef23fsdf28$123r",



*/

const keyword:AsyncMiddleware = async (req, res, next) =>{

    try{

        const failed: string[] = [];
        const prompt: string = res.locals.prompt;

        const key:string = res.locals.key;
        
        //query database for keywords
        const results = await db.query(`SELECT * FROM keyword WHERE key = $1`, [key]);
        const keywordsFull:Keyword[] = results.rows;

        //remove all unnecessary data
        const keywords:string[] = keywordsFull.map((obj:Keyword): string=>{
            return obj.keyword;
        })

        //checks if organization has keywords
        if(keywords.length > 0){

            for(let i:number = 0; i<keywords.length; i++){

                    //checks if prompt has organizations keywords
                    if(prompt.toLowerCase().indexOf(keywords[i].toLowerCase()) !== -1){

                    const ind :number = prompt.toLowerCase().indexOf(keywords[i].toLowerCase());
                    
                    //makes sure keyword isn't part of a larger word (example 'hell' and 'shell')
                    //will still keep words that start with keyword (example 'build' and 'building', 'builds', 'builder')

                    if (/^[a-zA-Z]+$/.test(prompt[ind-1])){
                        break
                    }

                    const failedKeyword:string = prompt.slice(ind, ind + keywords[i].length);
                    failed.push(failedKeyword);
                }
            }

            if(failed.length > 0){
                res.locals.object = {...res.locals.object, keyword: failed};    
            }

            return next();

        }else {
            return next();
        }
  
    }
    catch(error){

        return next(error);
    }
}

export default keyword