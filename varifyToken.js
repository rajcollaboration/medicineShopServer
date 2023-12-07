import jwt from 'jsonwebtoken';
import {createError} from './varifyToken.js'

export const varifyToken = (req,res,next)=>{
    const {token} = req.body;
    if(!token){
        return next(createError(401,'you are not authnticated'));
    }
    jwt.verify(token,process.env.JWT,(err,data)=>{
        if (err) return next(createError(403, "Token is not valid!"));
        req.data = data;
        next()
    })
}