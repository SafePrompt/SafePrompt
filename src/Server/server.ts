import express from 'express'

const validationRouter = require('./Routes/validationRouter')
const authRouter = require('./Routes/authRouter')


const app = express();

app.use(express.json());

app.use('/auth', authRouter)

app.use('/validate', validationRouter)




app.listen(3000, () => {
    console.log('Server running on port 3000')
})