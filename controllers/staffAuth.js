import { createError } from "../error.js";
import createAdmin from "../models/createAdmin.js";
import createStaff from "../models/createStaff.js";

export const addStuff = async (req,res,next)=>{
    try {
        const {name,email,phone,password,userType} = req.body;
        const {adminId} = req.body;

        if (!name) {
           return next(createError(404, "Please provide name"))
        }
        if (!email) {
            return next(createError(404, "Please provide email"))
         }
         if (!phone) {
            return next(createError(404, "Please provide phone"))
         }
         if (!password) {
            return next(createError(404, "Please provide password"))
         }
         if (!userType) {
            return next(createError(404, "Please provide userType"))
         }
         if (!adminId) {
            return next(createError(404, "Please provide adminId"))
         }

         const phoneValidation = await createStaff.find({'phone': phone});
         const emailValidation = await createStaff.find({'email': email});
         const nameValidation = await createStaff.find({'name': name, 'admin': adminId});

         console.log(phoneValidation,emailValidation,nameValidation);

         if (phoneValidation.length > 0) {
            return next(createError('400', 'Phone is already exists'));
         }
         if(emailValidation.length > 0){
            return next(createError('400', 'email is already exists'));

         }
         if(nameValidation.length > 0){
            return next(createError('400', 'name is already exists'));
         }

         const newStuff = new createStaff({
            name,
            email,
            phone,
            password,
            userType,
            admin: adminId
         }) 

         const savedStuff = await newStuff.save();
        const updatedAdmin = await createAdmin.findOneAndUpdate({'_id': adminId},{$push: {employes: savedStuff._id}});
        res.status(200).json({"message":updatedAdmin, savedStuff});


    } catch (error) {
        console.log(error);
        next(error);
    }
}

// update stuff

export const updateStuff = async(req, res, next)=>{
   const {name,email,phone,userType,permissions, adminId, stuffId} = req.body;
   try {
      if (!name) {
         return next(createError(403, 'Invalid name provided'));
      }else if(!email){
         return next(createError(403, 'Invalid email provided'));
      }
      else if(!phone){
         return next(createError(403, 'Invalid phone provided'));
      }
      else if(!userType){
         return next(createError(403, 'Invalid userType provided'));
      }
      else if(!adminId){
         return next(createError(403, 'Invalid adminId provided'));
      }
      else if(!stuffId){
         return next(createError(403, 'Invalid stuffId provided'));
      }

      const isPhone = await createStaff.find({'adminId': adminId, 'phone': phone});
      const isName = await createStaff.find({'adminId': adminId, 'name': name});
      const isEmail = await createStaff.find({'adminId': adminId, 'email': email});

      if (isPhone.length > 0) {
         return next(createError(409,'Phone is already exist'));

      }else if(isName.length > 0) {
         return next(createError(409,'name is already exist'));
      }else if(isEmail.length > 0) {
         return next(createError(409,'email is already exist'));
      }

      const updatedStuff = await createStaff.findOneAndUpdate(
         {_id: stuffId, adminId: adminId},{
            name,
            email,
            phone,
            userType,
            permissions
         },
         { new: true }
      )
      if (!updatedStuff) {
         return next(createError(404, 'Staff member not Updated'));
     }

     res.status(200).json({ message: 'Staff member updated successfully', updatedStuff });

   } catch (error) {
      console.log(error);
   }
}

export const deleteStuff = async (req, res, next) => {
   const {stuffId, adminId} = req.body;

   try {
      if (!stuffId || !adminId) {
         return next(createError(404, 'stuffId and adminId are required'))
      }
   
      const deletedStuff = await createStaff.findOneAndDelete({_id: stuffId, admin: adminId});
      if (!deletedStuff) {
         return next(createError(400, 'Stuff not deleted'));
      }

      res.status(200).json({sucess: true, message: "Stuff deleted successfully",data: deleteStuff});
   } catch (error) {
      console.log(error);
   }
};