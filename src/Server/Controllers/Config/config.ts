import AsyncMiddleware from "../../Types/asyncMiddleware";
import db from "../../Models/db";

interface entries {
    keyword: string,
    type: string
}

const config = {



    submit: async (req,res,next)=>{

        const {address, currency, ein, email, keyword, phone, ssn, key, entries} : {address: string, currency: string, ein: string, email: string, keyword: string, phone: string, ssn: string, key:string, entries:entries[]} = req.body;
        
        const response = await db.query('UPDATE config SET currency = $1, email = $2, ein = $3, ssn = $4, phone = $5, keyword = $6 WHERE key= $7 returning *;', [currency, email, ein, ssn, phone, keyword, key])


        if (entries.length > 0){
    
            const query = 'DELETE FROM keyword WHERE key = $1';
            
            const deleteResponse = await db.query(query, [key])

            const query2 = 'INSERT INTO keyword (keyword, "key", type) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;'
            let values;

            for (let i:number = 0; i < entries.length; i++){

                values = [entries[i].keyword, key, entries[i].type];

                let response = await db.query(query2, values)

                }
            }
     
        return next();

    },

    request: async (req,res,next)=>{

        const key:string = res.locals.key;
        const configResponse = await db.query('SELECT * FROM config WHERE key = $1;',[key])
        const keywordsResponse = await db.query('SELECT * FROM keyword WHERE key = $1', [key]);

        interface dbResponse {
            keyword: string;
            type: string;
        }

        const entries = keywordsResponse.rows.map((obj) : dbResponse =>{
            return {keyword: obj.keyword, type: obj.type}});

        res.locals.config = {...configResponse.rows[0], entries: entries};
        return next()
    },


    initialize: async(req,res,next)=>{

        const key = res.locals.key;

        const response = await db.query('INSERT INTO config (currency, email, ein, ssn, phone, keyword, key) VALUES ($1, $2, $3, $4, $5, $6, $7) returning * ;', [false, false, false, false, false, false, key])

        return next()
    }




} as {
    submit: AsyncMiddleware,
    request: AsyncMiddleware,
    initialize: AsyncMiddleware
}

export default config;