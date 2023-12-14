import { createError } from "../error.js";
import suplier from "../models/suplier.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signupSupplier = async(req,res,next)=>{
    try {
        const {userName,email,suplierName,address,gst,phone} = req.body;
        if (!userName) {
            return next(createError(422,"Username required"));
        }else if(!email) {
            return next(createError(422,"email required"));
        }else if(!req.body.pass) {
            return next(createError(422,"password required"));
        }else if(!suplierName) {
            return next(createError(422,"suplierName required"));
        }else if(!address) {
            return next(createError(422,"address required"));
        }else if(!gst) {
            return next(createError(422,"gst required"));
        }else if(!phone) {
            return next(createError(422,"phone required"));
        }

        const isAlreadyExist = await suplier.findOne({'phone': phone});

        if (isAlreadyExist) {
            return next(createError(409, 'user already exists'));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt);
        const newSuplier = await new suplier({...req.body, password: hash});
        await newSuplier.save();
        
        res.status(201).json({data: newSuplier, success: true});
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong"));
    }
}

export const loginSuplier = async(req,res,next) =>{
    try {
        
    } catch (error) {
        
    }
}

export const deleteSuplier = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}

export const editSupplier = async(req,res,next)=>{
    try {
        
    } catch (error) {
        
    }
}