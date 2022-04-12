const userModel = require('./model');

// tầng gọi database
exports.login = async (email) => {
    const user = await userModel.findOne({email:email},
        'id email password');
    return user;
}
exports.register = async (email,password) => {
    const user = new userModel({email,password});
    return await user.save();
}
// mảng dữ liệu users
// lấy từ database
// var data = [
//     {id: 1, email: 'admin@gmail.com', password: '12345', name: 'Nguyễn Anh'}
// ]










