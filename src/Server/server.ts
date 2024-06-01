import express, {Request, Response} from 'express';

import validationRouter from './Routes/validationRouter';
import authRouter from './Routes/authRouter';
import db from './Models/db'


const app = express();

app.use(express.json());

app.use('/auth', authRouter);

app.use('/validate', validationRouter);

//use this route to query database via postman
app.post('/db', async (req: Request, res: Response): Promise<Response> =>{

    try{

        const query:string = req.body.query;

        const response:any = await db.query(query);

        return res.status(200).send(response);

    }catch(error){

        return res.status(400).send(error);
    }

})




app.listen(3000, () => { 
    console.log('Server running on port 3000')
})