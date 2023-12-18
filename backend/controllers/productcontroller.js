
const Product =require('../models/productmodel')
const ErrorHandler=require('../utils/errorhandler')
const catchAsyncError=require('../midelewares/catchAsyncError')
const APIFeatures=require('../utils/apiFeaturs')

//get all product   - api/v1/product
exports.getProduct = catchAsyncError(async(req,res,next)=>{
    const resperpage = 2;
  const apiFeaturs=  new APIFeatures(Product.find(), req.query).search().filter().pagenate(resperpage)

  //const products= await Product.find()
  const products= await apiFeaturs.query;
      res.status(200).json({
        success:true,
        count:products.length,  
        products

    })
})

// create product- api/v1/product/new
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(200).json({
        success: true,
        product
    })
})
    

// get single product   - api/v1/product/id
exports.getsingleproduct=async(req,res,next)=>{
    try{
        const product= await Product.findById(req.params.id)
        if (!product){
        return next( new ErrorHandler('products not found',404))
        }
        res.status(200).json({
            success:true,
            product
        })
       
    }catch(err){
        return next( new ErrorHandler('inernal server err',404))
        

    }
  
}

// update product - api/v1/product/id
exports.updateproduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next( new ErrorHandler('products not found',404))
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            success: true,
            product: updatedProduct,
        });
    } catch (error) {
        return next( new ErrorHandler('products not found',404))
    }
};

exports.deleteproduct=async(req,res,next)=>{
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next( new ErrorHandler('products not found',404))
       }

           await Product.deleteOne({_id:req.params.id})

        res.status(200).json({
            success: true,
            message:'product deleted'
        });
    } catch (error) {
        return next( new ErrorHandler('products not found',404))
    }
}