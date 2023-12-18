const express=require('express');
const  router= express.Router();    
const {getProduct,createProduct,getsingleproduct,updateproduct,deleteproduct}=require('../controllers/productcontroller')
router.route('/product').get(getProduct);
router.route('/product/new').post(createProduct);
router.route('/product/:id').get(getsingleproduct);
router.route('/product/:id').put(updateproduct).delete(deleteproduct)


module.exports= router;