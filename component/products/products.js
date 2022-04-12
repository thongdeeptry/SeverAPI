var express = require('express');
var router = express.Router();

const productController = require('../products/controller');
const categoryController = require('../categoris/controller');

router.get('/',function(req,res,next){
    const data = await productController.getProducts();
    res.render('products',{products:data});
});

router.get('/insert',function(req,res,next){
    
    res.render('product_insert');
});