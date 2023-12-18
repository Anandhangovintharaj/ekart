const catchAsyncError=require('../midelewares/catchAsyncError')
const User= require('../models/usermodel')
exports.registerUser=catchAsyncError(async (req,res,next)=>{
const {name,email,password,avatar}=req.body
const user = await User.create({
    name,
    email,
    password,
    avatar,
})
const token=user.getJwttoken();
    res.status(201).json({
        success:true,
        user,
        token
        
    })
})