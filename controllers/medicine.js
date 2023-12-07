import { createError } from "../error.js";
import createAdmin from "../models/createAdmin.js";

import medicineScheema from '../models/medicine.js'     
export const addMedicine = async(req, res, next) => {
    try {
        const {name,price,expDate,stock,batchNumber,manufacturer,description,ingredients,dosage,usageInstructions,sideEffects,category,adminId} = req.body;

        if (!name) {
            return next(createError(404, 'name is required'));
        }else if (!price){
            return next(createError(404, 'price is required'));
        }
        else if (!expDate){
            return next(createError(404, 'expDate is required'));
        }
        else if (!stock){
            return next(createError(404, 'stock is required'));
        }
        else if (!batchNumber){
            return next(createError(404, 'batchNumber is required'));
        }
        else if (!adminId){
            return next(createError(404, 'adminId is required'));
        }

        const isAdmin = await createAdmin.find({'_id': adminId});
        console.log(isAdmin);
        if (isAdmin.length === 0) {
            return next(createError(404, 'admin not Exist'));
        }
        const isMedicine = await medicineScheema.find({'adminId': adminId, 'name': name});

        if (isMedicine.length > 0) {
            return next(createError(409, 'This medicine is already existing'));
        }

        const newMedicine = new medicineScheema({
            ...req.body
        })
        if (!newMedicine) {
            return next(createError(500, 'medicine not added'));
        }
        const savedMedicine =  await newMedicine.save();
        res.status(201).json({message: 'medicine added successfully', data: savedMedicine, success: true});
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong"))
    }
}

export const updateMedicine = async(req, res, next) => {
    try {
       const {name,price,expDate,stock,batchNumber,manufacturer,description,ingredients,dosage,usageInstructions,sideEffects,category,adminId,productId} = req.body;
       if (!name) {
        return next(createError(404, 'name is required'));
    }else if (!price){
        return next(createError(404, 'price is required'));
    }
    else if (!expDate){
        return next(createError(404, 'expDate is required'));
    }
    else if (!stock){
        return next(createError(404, 'stock is required'));
    }
    else if (!batchNumber){
        return next(createError(404, 'batchNumber is required'));
    }
    else if (!adminId){
        return next(createError(404, 'adminId is required'));
    }

    
    const updatedMedicine = await medicineScheema.findOneAndUpdate({'adminId': adminId, '_id': productId},{name,price,expDate,stock,batchNumber,manufacturer,description,ingredients,dosage,usageInstructions,sideEffects,category},{new: true});
    console.log(updatedMedicine);
    if (!updatedMedicine) {
        return next(createError(500, 'Something went wrong with update'));
    }

    res.status(200).json({success: true, data: updatedMedicine, message: 'Medicine updated successfully'});
    } catch (error) {
        console.log(error);
        next(createError(500, "Something went wrong"))
    }
}

export const deleteMedicine = async(req,res,next) =>{
    try {
        const {productId, adminId} = req.body;
        if (!productId && !adminId) {
            return next(createError(500, "Something went wrong"))
        }
        const deletedMedicine = await medicineScheema.findOneAndDelete({'adminId': adminId, '_id': productId});
        if (!deletedMedicine) {
            return next(createError(500, "Something went wrong"))
        }

        res.status(200).json({message: 'medician deleted successfully',success: true, data: deletedMedicine});
    } catch (error) {
        console.log(error);
        next(createError(500, 'something went wrong'))
    }
}
