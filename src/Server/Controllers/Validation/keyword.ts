import db from '../../Models/db';

import Middleware from "../../Types/middleware";

const keyword: Middleware = (req,res,next)=>{
    try{

        return next()
    }
    catch(error){

        return next(error);
    }
}

export default keyword