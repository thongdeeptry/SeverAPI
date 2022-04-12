// var express = require('express');
// var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Ngô Thành Thông' });
// });


// //http://localhost:3000/san-pham?chieu_dai=10&chieu_rong=8&chieu_cao=10&
// router.get('/san-pham', function(req, res, next) { 
//   const {chieu_dai, chieu_rong, chieu_cao} = req.query;
//   const dt = chieu_dai * chieu_rong * chieu_cao;
//   res.render('sanpham', { title: 'Ngô Thành Thông', dt:dt });
// });
// //http://localhost:3000/dien-tich?canh_day=10&chieu_cao=5&
// router.get('/dien-tich', function(req, res, next) { 
//   const {canh_day, chieu_cao} = req.query;
//   const dt =( canh_day * chieu_cao) /2;
//   res.render('dientich', { title: 'Ngô Thành Thông', dt:dt });
// });

// //http://localhost:3000/san-pham1?a=10&b=8&c=5
// router.get('/san-pham1', function(req, res, next) {
//   const{a,b,c} = req.query
//   const kq = 'PT co 1 nghiem';
//   res.render('sanpham1', { title: 'Ngô Thành Thông', kq:kq });
// });
// //http://localhost:3000/san-pham
// module.exports = router;



var express = require('express');
var router = express.Router();

const userController = require('../component/products/user/controller');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const { request } = require('../app');
const authen = require('../component/middle/cacthuc');
/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: get
 */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Ngô Thành Thông' });
});
router.get('/dang-nhap',[authen.checkLogin], function (req, res, next) {
  res.render('login');
});
router.get('/index', function (req, res, next) {
  res.render('index');
});

/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */
router.post('/dang-nhap', async function (req, res, next) {
  // xử lý login
  // đọc email, password từ body
  const { email, password } = req.body;
  // kiểm tra email, password
  const result = await userController.login(email, password);
  if (result) {
    // taoj token luu lai

    const token = jwt.sign({_id:result._id,email:result.email},'myKey');
    req.session.token = token;

    // nếu đúng: chuyển qua trang sản phẩm
   // alert("Đã đăng nhập thành công");
    res.redirect('index');
  } else {
    // nếu sai: vẫn ở trang login
    res.redirect('/dang-nhap');
  }
});

router.get('/dang-ky', function (req, res, next) {
  res.render('register');
});

router.get('/dang-xuat',[authen.checkLogin], function (req, res, next) {
  req.session.destroy(function(err){
    res.redirect('/dang-nhap');
  })
 
});
/**
 * page: login
 * http://localhost:3000/dang-nhap
 * method: post
 */

/**
 * page: logout
 * http://localhost:3000/dang-xuat
 * method: get
 */







 module.exports = router;



