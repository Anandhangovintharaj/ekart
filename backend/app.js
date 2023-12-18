const express= require('express');
const app= express();
const product=require('./routs/product');
const auth=require('./routs/auth')
const error = require('./midelewares/error');
app.use(express.json())    
app.use('/api/v1/',product);
app.use('/api/v1/',auth)
app.use(error)
module.exports=app;
