import AsyncMiddleware from "../../Types/asyncMiddleware"
import Middleware from "../../Types/middleware";
import db from "../../Models/db";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const jwtKey: string = process.env.JWT_KEY || '';

const token = {

    
    setToken:  (req,res,next)=>{

        const username: string = res.locals.username;

        const token: string = jwt.sign({ username: username, role: 'worker' }, jwtKey , { expiresIn: '48h' });
                  
        res.cookie('jwtToken',token, { maxAge: 345600000, httpOnly: true, sameSite: 'none', secure: true})

        return next();
    },

    checkToken:  async (req,res,next)=>{


        console.log('before checking for jwt token in server: ')


        const jwtToken = req.cookies.jwtToken;


        if (!jwtToken){
            res.status(401).json({});
        }
        else{

        interface decoded {
            username: string,
            role: string
        } 

        console.log('jwt key', jwtKey)

        const decoded : JwtPayload | string = jwt.verify(jwtToken, jwtKey) as JwtPayload;

        console.log('jwt decoded: ', decoded)

        const username = decoded.username;
        const role = decoded.role

        const admin:boolean = role === 'admin';

        console.log('username: ', username, 'role: ', role)

        const exists = await db.query('SELECT * FROM "user" WHERE username = $1 AND admin = $2', [username, admin])
        const row = exists.rows;

        console.log('row:', row)

        if (row.length === 1){

            console.log('yes!')
            return res.status(200).json({})
            }
       

            

        }

        res.status(401).json({});
    }

} as {setToken: Middleware, checkToken: AsyncMiddleware}

export default token