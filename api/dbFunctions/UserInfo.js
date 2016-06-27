var UserInfoModel = require('../models/UserInfo.js');

module.exports.saveUserInfo = function(userId, email, firstName, lastName, callback){
    var userInfo = UserInfoModel.schema({
        userId: userId,
        email: email,
        firstName: firstName,
        lastName: lastName
    });
    userInfo.schema.index({firstName: 'text', lastName: 'text'});
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
            callback(obj, true);
        }
    });
};

module.exports.getUserInfoAsync = function(object, callback){
    UserInfoModel.schema.find({userId: object.userId}, function(err, obj){
        if(err === null && obj.length === 1){
            return callback(null, obj[0]);
        }
        else{
            return callback(true);
        }
    });
};

module.exports.search = function(query, callback){
    UserInfoModel.schema.find(
        {$text: {$search : query}},
        {score: {$meta: 'textScore'}}
        )
        .sort({score: {$meta: 'textScore'}})
        .exec(function(err, obj){
            (err === null) ? callback(obj, false) : callback(null, true);
        });
};
