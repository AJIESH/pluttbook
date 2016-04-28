var OAuthTokensModel = require('../models/OAuthTokens.js');

module.exports.removeTokensUnderUserId = function(id, callback){
    OAuthTokensModel.schema.remove({userId: id}, function(err, obj){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getTokensUserId = function(token, callback){
    OAuthTokensModel.schema.find({accessToken: token}, function(err, obj){
        err === null ? callback(obj[0].userId, false) : callback(true);
    });
};