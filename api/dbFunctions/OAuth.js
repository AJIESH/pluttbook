var OAuthTokensModel = require('../models/OAuthTokens.js');
var OAuthClientsModel = require('../models/OAuthClients.js');
var OAuthUsersModel = require('../models/OAuthUsers.js');

//Get access token
module.exports.getAccessToken = function(bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    OAuthTokensModel.schema.findOne({ accessToken: bearerToken }, function(err, obj){
        if(!err){
            callback(false, obj);
        }
        else{
            callback(true);
        }
    });
};

//Get client
module.exports.getClient = function(clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    OAuthClientsModel.schema.findOne({ clientId: clientId, clientSecret: clientSecret }, function(err, obj){
        if(!err){
            callback(false, obj);
        }
        else{
            callback(true);
        }
    });
};

//Get refresh token
module.exports.getRefreshToken = function(refreshToken, callback) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    OAuthTokensModel.schema.findOne({ refreshToken: refreshToken }, function(err, obj){
        if(!err){
            callback(false, obj);
        }
        else{
            callback(true);
        }
    });
};

//Get user
module.exports.getUser = function(email, password, callback) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    OAuthUsersModel.schema.findOne({ email: email, password: password }, function(err, obj){
        if(!err){
            callback(false, obj);
        }
        else{
            callback(true);
        }
    });
};

module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
    callback(false, grantType === 'password');
};

//Save token
module.exports.saveAccessToken = function(token, client, expires, user, callback) {
    console.log('in saveToken (token: ' + token + ')');

    var accessToken = new OAuthTokensModel.schema({
        accessToken: token.accessToken,
        accessTokenExpiresOn: expires,
        clientId: client.clientId,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        userId: user.id
    });

    accessToken.save();
    callback(false);
};