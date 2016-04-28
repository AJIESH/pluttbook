var OAuthUsersModel = require('../models/OAuthUsers.js');

module.exports.getUserId = function(email, callback){
    OAuthUsersModel.schema.findOne({email: email}, function(err, obj){
        err === null ? callback(obj.ObjectId, false) : callback(true);
    });
};

module.exports.emailUnique = function(email, callback){
    OAuthUsersModel.schema.findOne({ email: email }, function(err, obj){
        obj === null ? callback(false) : callback(true);
    });
};

module.exports.saveUser = function(email, password, callback, req, res){
    var user = new OAuthUsersModel.schema({
        email: email,
        password: password
    });
    user.save(function(err){
        err === null ? callback(false) : callback(true);
    });
}
