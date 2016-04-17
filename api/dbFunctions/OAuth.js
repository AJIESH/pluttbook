var OAuthTokensModel = require('../models/OAuthTokens.js');
var OAuthClientsModel = require('../models/OAuthClients.js');
var OAuthUsersModel = require('../models/OAuthUsers.js');

//Get access token
module.exports.getAccessToken = function(bearerToken, callback) {
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    return callback(false, OAuthTokensModel.schema.findOne({ accessToken: bearerToken }));
};

//Get client
module.exports.getClient = function(clientId, clientSecret, callback) {
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    return callback(false, OAuthClientsModel.schema.findOne({ clientId: clientId, clientSecret: clientSecret }));
};

//Get refresh token
module.exports.getRefreshToken = function(refreshToken, callback) {
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    return callback(false, OAuthTokensModel.schema.findOne({ refreshToken: refreshToken }));
};

//Get user
module.exports.getUser = function(username, password, callback) {
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    return callback(false, OAuthUsersModel.schema.findOne({ username: username, password: password }));
};

module.exports.grantTypeAllowed = function (clientId, grantType, callback) {
    callback(false, true);
};

//Save token
module.exports.saveAccessToken = function(token, client, expires, user, callback) {
    console.log('in saveToken (token: ' + token + ')');

    var accessToken = new OAuthTokensModel.schema({
        accessToken: token.accessToken,
        accessTokenExpiresOn: expires,
        clientId: client.id,
        refreshToken: token.refreshToken,
        refreshTokenExpiresOn: token.refreshTokenExpiresOn,
        userId: user.id
    });

    accessToken.save();
    callback(false);
};