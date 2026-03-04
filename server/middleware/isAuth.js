import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js';

export const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.token;

        if(!token || token === "null" || token === "undefined"){
            return res.status(403).json({
                message:"Please Login"
            })
        }

        const decodedToken=jwt.verify(token,process.env.Jwt_Sec);

        req.user=await User.findById(decodedToken._id);

        if(!req.user) return res.status(403).json({
            message:"User not found"
        });

        next();
    } catch (error) {
        res.status(403).json({
            message:"Please Login"
        })
    }
};

export const isAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=="admin") return res.status(403).json({
            message:"You are not admin"
        })
        next();
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}