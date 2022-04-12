var express = require('express');
const upload = require('../component/middle/upload');
var router = express.Router();

const productController = require('../component/products/controller');
const categoryController = require('../component/categoris/controller');
const authen = require('../component/middle/cacthuc');
/**
 * page: product
 * http://localhost:3000/san-pham
 * method: get
 * detail: get list products
 * author: Chấn Nguyễn
 * date: 17th March 2022 11:05
 */
router.get('/',[authen.checkLogin], async function (req, res, next) {
  // lấy danh sách sản phẩm
  const data = await productController.getProducts();
  res.render('products', { products: data });
});

/**
 * page: product
 * http://localhost:3000/san-pham
 * method: post
 * detail: insert new product
 * author: Chấn Nguyễn
 * date: 17th March 2022 11:05
 */
router.post('/', [upload.single('image')],[authen.checkLogin], async function (req, res, next) {
  // xử lý thêm mới sản phẩm
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `https://severnodejsreactnative.herokuapp.com/images/${file.filename}`;
  }
  body = { ...body, image };
  await productController.insert(body);
  res.redirect('/sanpham');
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/delete
 * method: delete
 * detail: delete product
 * author: Chấn Nguyễn
 * date: 17th March 2022 11:05
 */
router.delete('/:id/delete',[authen.checkLogin], async function (req, res, next) {
  // xử lý xóa sản phẩm
  const { id } = req.params;
  await productController.delete(id);
  res.json({ result: true })
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: get
 * detail: get one product
 * author: Chấn Nguyễn
 * date: 17th March 2022 11:05
 */
router.get('/:id/edit',[authen.checkLogin], async function (req, res, next) {
  // xử lý lấy một sản phẩm
  const { id } = req.params;
  const product = await productController.getById(id);
  const categories = await categoryController.getCategories();
  res.render('chitietsanpham', { product: product,categories: categories });
});
router.get('/insert',[authen.checkLogin], async function (req, res, next) {
  // hiển thị trang thêm mới
  const categories = await categoryController.getCategories();

  res.render('product_insert', { categories: categories });
});

/**
 * page: product
 * http://localhost:3000/san-pham/:id/edit
 * method: put
 * detail: update one product
 * author: Chấn Nguyễn
 * date: 17th March 2022 11:05
 */
router.post('/:id/edit', [upload.single('image')],[authen.checkLogin], async function (req, res, next) {
  // xử lý cập nhật một sản phẩm
  let { params, file, body } = req;
  delete body.image;
  if (file) {
    let image = `https://severnodejsreactnative.herokuapp.com/images/${file.filename}`;
    body = { ...body, image };
  }
  
  await productController.update(params.id, body);
  res.redirect('/sanpham');

});

module.exports = router;