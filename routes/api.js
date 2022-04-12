var express = require('express');
var router = express.Router();

const userController = require('../component/products/user/controller');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { request } = require('../app');
const authen = require('../component/middle/cacthuc');
const productController = require('../component/products/controller');



  /**
   * page: login
   * http://localhost:3000/api/dang-nhap
   * method: post
   */
  router.post('/register', async function (req, res, next) {
    // xử lý login
    // đọc email, password từ body
    const {email,password,cf_password} = req.body;
    // kiểm tra email, password
    const result = await userController.register(email,password,cf_password);
    if (result) {
      res.json({status:true});
     } else {
         res.json({status:false});
     }
  });
  
  router.post('/login', async function (req, res, next) {
    // xử lý login
    // đọc email, password từ body
    const {email,password} = req.body;
    // kiểm tra email, pasword
    const result = await userController.login(email,password);
    if (result) {
      // taoj token luu lai
  
      const token = jwt.sign({_id:result._id,email:result.email},'myKey');
      
      // nếu đúng: chuyển qua trang sản phẩm
      
     res.json({status:true,result,token});
      
    } else {
        res.json({status:false});
    }
  });


  router.get('/products',[authen.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const products = await productController.getProducts();
    res.json(products);
  });

  router.get('/products/:id/detail',[authen.checkToken], async function (req, res, next) {
    // lấy danh sách sản phẩm
    const {id} = req.params;
    const product = await productController.getById(id);
    res.json(product);
    console.log(product);
  });

  router.post('/card', async function (req, res, next) {
    // lấy danh sách sản phẩm
    const {user_id,name,price,quantity,image,description,released} = req.body;
    const result = await productController.insertcard(user_id,name,price,quantity,image,description,released);
    if (result) {
      res.json({status:true});
     } else {
      res.json({status:false});
     }
  });
module.exports = router;