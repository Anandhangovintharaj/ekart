
const ErrorHandler = require("../utils/errorhandler");

module.exports=(err,req,res,next)=>{
err.status=err.status||500

if (process.env.NODE_ENV == 'development') {
    res.status(err.status).json({
        success: false,
        message: err.message,
        stack: err.stack,
        error:err
    });
}

if(process.env.NODE_ENV =='production'){
let message=err.message

let error =new ErrorHandler(message)
//console.log(err.name);
    if(err.name =='ValidationError'){
        message=Object.values(err.errors).map(value => value.message)
        error= new ErrorHandler(message,404)
       // console.log(error)
    }
    res.status(err.status).json({
        success:false,
  
        messege: error.message|| 'intertnal server error'
    
    })

}

}