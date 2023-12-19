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
        }else if(!phone || phone.length !== 10) {
            return next(createError(422,"phone required or not valid phone"));
        }

        const isAlreadyExist = await suplier.findOne({'phone': phone});

        if (isAlreadyExist) {
            return next(createError(409, 'user already exists'));
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt);
        const newSuplier = await new suplier({...req.body, password: hash});
        await newSuplier.save();
        const {password, ...others} = newSuplier._doc;
        console.log(others);
        res.status(201).json({data: others, success: true});
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong"));
    }
}

export const loginSuplier = async(req,res,next) =>{
    try {
        const {userName, pass,phone} = req.body;
        if (!userName) {
            return next(422, 'username required');
        }
        if (!pass) {
            return next(422, 'password required');
        }

        const isExistUser = await suplier.findOne({ $or: [{'userName': userName}, {'phone': phone}]});
        if (!isExistUser) {
            return next(401, "User Not Exist");
        }
        const {password,...others} = isExistUser;
        const isCorrect = await bcrypt.compare(password, pass);
        if (!isCorrect) {
            return next(401, "userName or Password incorrect");
        }

        const token = jwt.sign({id: isExistUser._id},process.env.JWT);
        res.status(200).json({user: others, suplierToken: token});
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong"));
    }
}

export const deleteSuplier = async(req,res,next)=>{
    try {
        const {suplierId} = req.body;
        if (!suplierId) {
            return next(createError(422, 'Suplier Not Exist'));
        }

        const deletedSuplier = suplier.findOneAndDelete({'id': suplierId});
        res.status(200).json({message: "Suplier deleted Success", sucess: true, deletedSuplier: deletedSuplier});
        
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong when deleting"));
    }
}

export const editSupplier = async(req,res,next)=>{
    try {
        const {suplierId, ...others} = req.body;
        const isExistSuplier = suplier.findOne({$and :{_id: suplierId } });
        if (!isExistSuplier) {
            return next(createError(409,"User Not Exists"));
        }

        suplier.findOneAndUpdate(
            {_id: suplierId},
            {$set: {others}},
            {new: true}
        ).then((updatedUser)=>{
            console.log("User updated");
            res.status(200).json({success: true, message: updatedUser, status: 'success'});
        }).catch((error)=>{
            console.log(error);
            return next(createError(422, "Error updating user"));
        });
    } catch (error) {
        console.log(error);
        next(createError(500, "Internal server Error"));
    }
}

const addSupplierMedicine = async(req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}