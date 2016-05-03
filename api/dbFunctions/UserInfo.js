var UserInfoModel = require('../models/UserInfo.js');

module.exports.saveUserInfo = function(userId, email, firstName, lastName, callback){
    var userInfo = UserInfoModel.schema({
        userId: userId,
        email: email,
        firstName: firstName,
        lastName: lastName
    });
    userInfo.save(function(err){
        err === null ? callback(false) : callback(true);
    })
};


module.exports.getUserInfo = function(userId, callback){
    UserInfoModel.schema.find({userId: userId}, function(err, obj){
        if(err === null && obj.length === 1){
            callback(obj[0], false);
        }
        else{
            callback(true);
        }
    });
};
