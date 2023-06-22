import express from 'express'
import './connectDb.js'
import dotenv from 'dotenv'
import router from './controllers/user.js'
import {Server} from 'socket.io'
import http from 'http'
import socket from './socket.js'
dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    reconnection : true,
    reconnectionAttemps : Infinity,
    cors : {
        origin : 'http://localhost:3000',
        methods : ["GET", "POST"]
    }

})
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('from server')
})
app.use('/api/user',router)
socket(io)

server.listen(process.env.PORT,()=>{
    console.log('server started at',  process.env.PORT)
})