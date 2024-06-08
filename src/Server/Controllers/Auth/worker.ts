import AsyncMiddleware from "../../Types/asyncMiddleware";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from "../../Models/db";
import {QueryResult} from 'pg';




interface dbResponse {
    username: string,
    password: string,
    key: string,
    admin: boolean
}

const worker = {

    signup:  async(req,res,next)=>{

        try{

            res.locals.role = 'worker';

            const {username, password, key} : {username: string, password: string, key: string} = req.body;

            res.locals.username = username;
            
            const salt:string = bcrypt.genSaltSync(10);
            const hashPassword:string = bcrypt.hashSync(password, salt);

            const usernameExistsObj: dbResponse[] = await db.query(`SELECT * FROM "user" WHERE username = $1`, [username])
                .then(res=>res.rows);

            if (usernameExistsObj.length === 0){


                const orgExists: dbResponse[] = await db.query('SELECT * FROM "user" WHERE key = $1 AND admin = true', [key])
                    .then((res)=>res.rows);

                if (orgExists.length === 1){

                    await db.query('INSERT INTO "user" (username, password, key, admin) VALUES ($1, $2, $3, $4)', [username, hashPassword, key, false]);
                    res.locals.key = key;

                    
                    return next()

                } 

                return res.status(409).json("Invalid Organization");


            } else {

                return res.status(409).json("Username Already Exists");

            }
        }catch(error){
            return next(error);
        }

    },

    login: async (req, res, next) => {
        try{

            const {username, password} : {username: string, password: string} = req.body;

            

            const queryResponse: QueryResult = await db.query('SELECT * FROM "user" WHERE username = $1', [username])
            const responseArr: dbResponse[] = queryResponse.rows;

            if (responseArr.length === 1 && bcrypt.compareSync(password, responseArr[0].password) && !responseArr[0].admin){
            res.locals.key = responseArr[0].key
               return next();
            } else {
                res.status(401).json('Invalid Username/Password')
            }

        }catch(error){
            return next(error);
        }

    }

} as {
    signup: AsyncMiddleware,
    login: AsyncMiddleware

};





export default worker;