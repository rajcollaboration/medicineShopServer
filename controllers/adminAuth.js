import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import createAdminSchema from '../models/createAdmin.js';
import { createError } from '../error.js';


// create admin
export const createAdmin = async(req,res,next) => {
    const adminData = req.body;
    
    try {
        if (adminData.name === "") {
            return next(createError(422, "Please enter name"));
        }else if(adminData.shopName === ""){
            return next(createError(422, 'please enter shop name'));
        }else if(adminData.email === ""){
            return next(createError(422, 'please enter email'));
        }else if (adminData.password === ""){
            return next(createError(422, 'please enter password'));
        }else if (adminData.address === "") {
            return next(createError(422, 'please enter address'));
        }else if(adminData.phone === "") {
            return next(createError(422, 'please enter phone'));
        }
        const isAvailable  = await createAdminSchema.findOne({'phone': adminData.phone});
        if (!isAvailable) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const newAdmin = new createAdminSchema({...req.body, password: hash});
            await newAdmin.save();
            res.status(200).send({message: 'Admin Created Success',staus: 201, success: true}); 
        } else {
           return next(createError(409,'Admin already exists'));
        }
    } catch (error) {
        next(error)
    }
}

// update admin

export const updateAdmin = async (req, res, next) => {
    try {
        const admin = await createAdminSchema.findOne({ '_id': req.body._id });

        if (!admin) {
            return next(createError(404, 'Admin not found'));
        }

        const { name, shopName, email, password, address, phone } = req.body;

        if (!name) {
            return next(createError(422, 'Please enter name'));
        } else if (!shopName) {
            return next(createError(422, 'Please enter shop name'));
        } else if (!email) {
            return next(createError(422, 'Please enter email'));
        } else if (!password) {
            return next(createError(422, 'Please enter password'));
        } else if (!address) {
            return next(createError(422, 'Please enter address'));
        } else if (!phone) {
            return next(createError(422, 'Please enter phone'));
        }

        const updateUser = await createAdminSchema.findByIdAndUpdate(
            req.body._id,
            { $set: req.body },
            { new: true }
        );

        if (!updateUser) {
            return next(createError(404, 'User not found'));
        }

        res.status(200).json({ message: 'User updated', success: true });
    } catch (error) {
        next(error);
    }
};

// Delete Admin

export const deleteAdmin = async(req, res, next) => {
    try {
        const {id} = req.body;
           if (id) {
            const deletedAdmin = await createAdminSchema.findByIdAndDelete({_id: id});
            res.status(200).json({message: 'Admin deleted successfully'});
           }else{
            return next(createError(403,'Admin id not valid'));
           }
    } catch (error) {
        return next(createError(500,'something went wrong'));
    }
};

// Admin Login
export const adminLogin = async (req, res, next) => {
    try {
        const { uId, password } = req.body;
        if (!uId || !password) {
            return res.status(400).json({ error: 'Please provide both uId and password' });
        }
        const user = await createAdminSchema.findOne({ $or: [{ 'phone': uId }, { 'email': uId }] });
        if (!user) {
            return next(createError(404, 'User not found. Please contact the support team.'));
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return next(createError(400, 'Invalid username or password'));
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password: userPassword, ...others } = user._doc;
        res.status(200).json({ token, user: others });
    } catch (error) {
        console.log(error);
        next(createError(500, 'Internal Server Error'));
    }
}

// admin Logout

// export const adminLogout = (req, res,next) => {
//     try {
        
//     } catch (error) {
        
//     }
// }


