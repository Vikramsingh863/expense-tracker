import express from 'express'
import dotenv from 'dotenv'
import route from './Routes/route.js'
import connectDB from './db/dbconnect.js'
import cors from 'cors'
// import { body, validationResult } from "express-validator";
dotenv.config()
const app =  express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use('/',route)
const PORT = process.env.PORT||8000 
connectDB().then(()=>{
    app.listen(8000,()=>console.log(`Server is running on PORT ${PORT}`)
)
}) 


