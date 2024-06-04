import AsyncMiddleware from "../../Types/asyncMiddleware";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import db from "../../Models/db";
import {QueryResult} from 'pg'

const admin = {

    signup:  async(req,res,next)=>{

        try{

            const {username, password} : {username: string, password: string} = req.body;

            const salt:string = bcrypt.genSaltSync(10);
            const hashPassword:string = bcrypt.hashSync(password, salt)
            const key:string = crypto.randomUUID();

            const usernameExistsObj: string[] = await db.query(`SELECT * FROM "user" WHERE username = $1`, [username])
                .then(res=>res.rows);

            if (usernameExistsObj.length === 0){

                await db.query('INSERT INTO "user" (username, password, key, admin) VALUES ($1, $2, $3, $4)', [username, hashPassword, key, true]);

                res.locals.key = key;
                return next();

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

            interface response {
                username: string,
                password: string,
                key: string,
                admin: boolean
            }

            const queryResponse: QueryResult = await db.query('SELECT * FROM "user" WHERE username = $1', [username])
            const responseArr: response[] = queryResponse.rows;

            if (responseArr.length === 1 && bcrypt.compareSync(password, responseArr[0].password) && responseArr[0].admin){
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





export default admin;