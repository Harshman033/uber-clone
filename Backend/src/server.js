import app from './app.js';
import http from 'http'
import { dbConnect } from './db/db.js';

const port = process.env.PORT || 8080;
const server = http.createServer(app);

dbConnect()
.then(()=>{
    server.listen(port, ()=>{
        console.log(`server is listening on port :${port}`)
    });
    app.on('error', (error)=>{
        console.log("error on listening to the port: ", error);
    });
})
.catch((error)=>{
    console.log("error on connecting db: ", error)
})


