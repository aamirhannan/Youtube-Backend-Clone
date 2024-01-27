import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({path:'../.env'})


connectDB()

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