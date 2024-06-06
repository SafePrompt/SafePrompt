import AsyncMiddleware from "../../Types/asyncMiddleware";
import db from "../../Models/db";

const config = {



    submit: async (req,res,next)=>{

        const {address, currency, ein, email, keyword, phone, ssn, key} : {address: string, currency: string, ein: string, email: string, keyword: string, phone: string, ssn: string, key:string} = req.body;
        const response = await db.query('INSERT INTO config (currency, email, ein, ssn, phone, keyword) VALUES ($1, $2, $3, $4, $5, $6) returning * ;', [currency, email, ein, ssn, phone, keyword])
        console.log(response)
        
        return next()



    },

    getConfig: async (req,res,next)=>{


        return next()
    },
    initialize: async(req,res,next)=>{

        const key = res.locals.key;

        const response = await db.query('INSERT INTO config (currency, email, ein, ssn, phone, keyword, key) VALUES ($1, $2, $3, $4, $5, $6, $7) returning * ;', [false, false, false, false, false, false, key])


    }




} as {
    submit: AsyncMiddleware,
    getConfig: AsyncMiddleware,
    initialize: AsyncMiddleware
}

export default config;