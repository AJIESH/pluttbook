var UserInfoModel = require('../models/UserInfo.js');

module.exports.saveUserInfo = function(email, firstName, lastName, callback){
    var userInfo = UserInfoModel.schema({
        email: email,
        firstName: firstName,
        lastName: lastName
    });
    userInfo.save(function(err){
        err === null ? callback(false) : callback(true);
    })
};
