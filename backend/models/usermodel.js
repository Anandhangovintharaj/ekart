const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'pls enter name']
    },
    email:{
        type:String,
        required:[true,'pls enter email'],
        unique:true,
        validate:[validator.isEmail,'pls enter the valid email']
    },
    password:{
        type:String,
        required:[true,'pls enter the password'],
        maxlength:[6, 'password conot exsit 6 charectors']
    },
    avatar:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }, 
    resetPasswordToken:String,
    resetPasswordTokenExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
userSchema.pre('save', async function(next){
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwttoken=function(){
 return jwt.sign({id: this.id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
})
}

let model=mongoose.model('user',userSchema)
module.exports=model;