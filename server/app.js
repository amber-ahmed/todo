import express from 'express'
import './connectDb.js'
import dotenv from 'dotenv'
import router from './controllers/user.js'
dotenv.config()
const app = express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('from server')
})
app.use('/api/user',router)

app.listen(process.env.PORT,()=>{
    console.log('server started at',  process.env.PORT)
})