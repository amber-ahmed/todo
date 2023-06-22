import express from 'express'
import './connectDb.js'
import dotenv from 'dotenv'
import router from './controllers/user.js'
import {Server} from 'socket.io'
import http from 'http'
import socket from './socket.js'
dotenv.config()

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    reconnection : true,
    reconnectionAttemps : Infinity,
    cors : {
        origin : '/',
        methods : ["GET", "POST"]
    }

})
app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send('from server')
// })
app.use('/api/user',router)
socket(io)

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
server.listen(process.env.PORT,()=>{
    console.log('server started at',  process.env.PORT)
})