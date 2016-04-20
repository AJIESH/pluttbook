var OAuthTokensModel = require('../models/OAuthTokens.js');
var OAuthClientsModel = require('../models/OAuthClients.js');
var OAuthUsersModel = require('../models/OAuthUsers.js');
var bcrypt = require('bcrypt-nodejs');


//Get access token
module.exports.getAccessToken = function(bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    OAuthTokensModel.schema.findOne({ accessToken: bearerToken }, function(err, obj){
        err == null ?  callback(false, obj) : callback(true);
    });
};

//Get client
module.exports.getClient = function(clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    OAuthClientsModel.schema.findOne({ clientId: clientId, clientSecret: clientSecret }, function(err, obj){
        err == null ?  callback(false, obj) : callback(true);
    });
};

//Get refresh token
module.exports.getRefreshToken = function(refreshToken, callback) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    OAuthTokensModel.schema.findOne({ refreshToken: refreshToken }, function(err, obj){
        err == null ?  callback(false, obj) : callback(true);
    });
};

//Get user
module.exports.getUser = function(email, password, callback) {
    console.log('in getUser (username: ' + email + ', password: ' + password + ')');

    OAuthUsersModel.schema.findOne({ email: email}, function(err, obj){
        bcrypt.compare(password, obj.password, function(err, res) {
            res ? callback(false, obj) : callback(true);
        });
    });
};

module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
    callback(false, grantType === 'password');
};

//Save token
module.exports.saveAccessToken = function(token, client, expires, user, callback) {
    console.log('in saveToken (token: ' + token + ')');

    console.dir(expires);
    var accessToken = new OAuthTokensModel.schema({
        accessToken: token,
        expires: expires,
        clientId: client.clientId,
        //refreshToken: token.refreshToken,
        //refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        userId: user.id
    });

    accessToken.save();
    callback(false);
};