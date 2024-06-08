import AsyncMiddleware from "../../Types/asyncMiddleware"
import Middleware from "../../Types/middleware";
import db from "../../Models/db";
import jwt from 'jsonwebtoken'
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


        const jwt = req.cookies.jwtToken;


        if (!jwt) return res.status(401).json({});
        else{

        interface decoded {
            username: string,
            role: string
        } 

        const decoded: decoded = jwt.verify(jwt,jwtKey);

        console.log('jwt decoded: ', decoded)

        const { username, role } : decoded = decoded;

        const admin:boolean = role === 'admin';

        const exists = await db.query('SELECT * FROM "user" WHERE username = $1 AND admin = $2', [username, admin])
        const row = exists.rows[0];

        console.log('jwt exists in db: ', exists)

        if (row.length === 1){

            res.status(200).json({})
            
            }
       

            

        }

        res.status(401).json({});
    }

} as {setToken: Middleware, checkToken: AsyncMiddleware}

export default token