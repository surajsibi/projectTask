import { Asynchandler } from "../utils/Asynchandler.js";
import { Apierror } from "../utils/Apierror.js";
import {ApiResponse} from "../utils/Apiresponse.js"
import  {User} from "../models/user.model.js"
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const createToken =(userId,role)=>{
    return jwt.sign({userId,role},process.env.JWT_SECRET,{expiresIn:"1d"})
}


//register
export const register = Asynchandler(async(req , res , next) => {
    const {name ,password, email, role} = req.body
    const userExists = await User.findOne({email})
    if(userExists){
        throw new Apierror(401,"User already exists")
    }
    const user = await User.create({name,password,email,role})
    const token = createToken(user._id,user.role)
   const options = {
    httpOnly: true,
    secure: true,
  };
  return res.status(200)
  .cookie("token", token, options)
  .json(new ApiResponse(200, user, "User registered successfully"))
})

export const login = Asynchandler(async(req,res,next)=>{
    console.log(req.body)
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user)throw new Apierror(400,"User not found")
    
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect)throw new Apierror(400,"Password is incorrect")
    const token = createToken(user._id,user.role)
    const options = {
        httpOnly: true,
        secure: true,
      };
    return res.status(200)
    .cookie("token", token, options)
    .json(new ApiResponse(200, user, "User logged in successfully"))    
})

export const  logout = Asynchandler(async(req,res,next)=>{
    res.clearCookie("token")
    .json(new ApiResponse(200, {}, "User logged out successfully"))

})

export const me =Asynchandler(async(req,res,next)=>{
    const user = await User.findById(req.user.userId).select('name email role');
    return res.status(200)
    .json(new ApiResponse(200,user,"User details"))
})