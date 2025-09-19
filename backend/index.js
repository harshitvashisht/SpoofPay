import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
import mongoose from 'mongoose';
import userRouter from "./routes/user.js";
import accountRouter from './routes/account.js';
import cors from "cors";

app.use(express.json())
app.use(cors());

app.use('/user' ,userRouter)
app.use('/account', accountRouter)

async function main (){
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('Connected....'))
    .catch((err) => console.log('Error While Connecting !'))
}



main()
app.listen(3000)