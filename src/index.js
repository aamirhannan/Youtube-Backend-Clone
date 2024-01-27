import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import {app} from "./app.js"

dotenv.config({path:'../.env'})

const PORT = process.env.PORT||8000;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log('Database connection failed',err)
})

/*
// Approach 1 to connect to Mongo

import express from "express";
const app = express();

;(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on('error',(error) =>{
            console.log('Error', error)
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
        throw error
    }
})()
*/