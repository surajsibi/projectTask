import jwt from "jsonwebtoken"
import { Asynchandler } from "../utils/Asynchandler.js"
import { Apierror } from "../utils/Apierror.js"
import {User} from "../models/user.model.js"


export const verifyToken = Asynchandler(async(req,res,next)=>{
    const token = req?.cookies?.token
    if(!token){
        throw new Apierror(401,"Token not found")
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.userId)
    if(!user){
        throw new Apierror(401,"User not found")
    }
    req.user = user
    next()
})
