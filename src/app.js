// Import section
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


// Middleware section
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json()); //this is needed for express json parsing
app.use(express.urlencoded()); //this is needed for express url, different url have different meanings but it helps to pars all URLs uniformally
app.use(express.static("public")) //this is needed for express static, It will fetch static file stored in public folders
app.use(cookieParser()) //this is needed for handling cookies, it will inject and fetch user cookies securely

//routes import
import userRouter from './routes/user.routes.js';

//route declaration
app.use("/api/v1/users", userRouter)

// exports module
export {app}