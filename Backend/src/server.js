import app from './app.js';
import http from 'http'

const port = process.env.PORT || 8080;
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`server is listening on port :${port}`)
})
