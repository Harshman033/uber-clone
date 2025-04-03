import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config({
    paths : './env'
});

const app = express();

 

app.use(cors({
origin : process.env.CORS_ORIGIN,
credentials : true
}));

export default app;