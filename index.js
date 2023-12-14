import express from 'express';
import mongoose, { connect } from 'mongoose';
import env from 'dotenv';
import cookieParser from 'cookie-parser';
import adminAuth from './routes/auth.js';
import stuffAuth from './routes/staffAuthRoute.js';
import medicine from './routes/medicine.js';
import suplier from './routes/suplier.js';


const app = express();
env.config();
const port = process.env.PORT || 8080;
// connect Mongodb

const dbConnect = ()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/your_database').then(()=>{
        console.log('====================================');
        console.log('Database Connected Successfully');
        console.log('====================================');
    }).catch((err)=>{
        console.log(err);
    })
}

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin/api/auth',adminAuth);
app.use('/admin/api/stuff', stuffAuth);
app.use('/admin/api/medicine', medicine);
app.use('/admin/api/suplier', suplier);

// error Handlers

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something Went Wrong";
    return res.status(status).json({
        success: false,
        message: message,
        status: status
    })
})

// success response handle



app.listen(port,()=>{
    dbConnect();
    console.log("Connected to server "+port);
})