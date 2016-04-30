var OAuthTokensModel = require('../models/OAuthTokens.js');
var HelperFuncs = require('../common/helperFunctions.js');

module.exports.removeTokensUnderUserId = function(id, callback){
    OAuthTokensModel.schema.remove({userId: id}, function(err, obj){
        err === null ? callback(false) : callback(true);
    });
};

module.exports.getTokensUserId = function(request, result, callback){
    var token = HelperFuncs.getAuthTokenFromHeader(request, result);
    OAuthTokensModel.schema.find({accessToken: token}, function(err, obj){
        (err === null && obj.length === 1) ? callback(obj[0].userId, false) : callback(true);
    });
};