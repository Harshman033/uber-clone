import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as userRouter} from './routes/user.routes.js';
import { router as captainRouter } from './routes/captain.routes.js';
import cookieParser from 'cookie-parser'


dotenv.config({
    paths : './env'
});

const app = express();

app.use(cors({
origin : process.env.CORS_ORIGIN,
credentials : true
}));

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use('/api/v1/users', userRouter)


app.use('/api/v1/captains', captainRouter)

export default app;