var OAuthTokensModel = require('../models/OAuthTokens.js');
var HelperFuncs = require('../common/helperFunctions.js');
var async = require('async');


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

module.exports.getTokenByUserIdAsync = function(friends, callback){
    var friendsWithAccessTokens = [];
    async.each(friends, function(friend, callback){
        OAuthTokensModel.schema.find({userId: friend.userId}, 'userId expires', function(err, obj){
            if(err === null){
                if(obj.length){
                    for(var i=0; i<obj.length; i++){
                        friendsWithAccessTokens.push(obj[i]);
                    }
                }
            }
            callback();
        });
    },
    function(err){
        callback(friendsWithAccessTokens, err);
    });
};