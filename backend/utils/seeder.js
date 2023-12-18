
const products=require('../data/product.json');
const productmodel=require('../models/productmodel')
const dotenv=require('dotenv');
const connectdatabase=require('../config/database')

dotenv.config({path:'backend/config/config.env'})
connectdatabase();
const seedProducts=async()=>{
    try{
    await productmodel.deleteMany();
    console.log('product delete')
    await productmodel.insertMany(products);
    console.log('inserted done')
    }catch(err){
        console.log(err.message)
    }
    process.exit();
}
seedProducts();
