import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import router from './routes/userRoute.js';


dotenv.config()
const app = express()
// const userRoute =userRoute()

const port = process.env.PORT || 3000
console.log(port)

app.use(express.json())

app.use('/', router)

app.listen(port, () => {
    console.log(`hello ${port}`)
})
