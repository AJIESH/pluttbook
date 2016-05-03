var OAuthUsersModel = require('../models/OAuthUsers.js');

//Doesn't currently work
module.exports.getUserId = function(email, callback){
    OAuthUsersModel.schema.findOne({email: email}, function(err, obj){
        if(err === null && obj !== null){
            callback(obj.ObjectId, false)
        }
        else{
            callback(true);
        }
    });
};

module.exports.emailUnique = function(email, callback){
    OAuthUsersModel.schema.findOne({ email: email }, function(err, obj){
        if(err === null && obj === null){
            callback(false);
        }
        else{
            callback(true);
        }
    });
};

module.exports.saveUser = function(email, password, callback, req, res){
    var user = new OAuthUsersModel.schema({
        email: email,
        password: password
    });
    user.save(function(err, obj){
        err === null ? callback(obj.id, false) : callback(true);
    });
}
