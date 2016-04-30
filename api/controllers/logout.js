var OAuthTokens = require('../dbFunctions/OAuthTokens.js');

var request, result;
module.exports.controller = function(app){
    app.post('/api/logout', app.oauth.authorise(), function(req, res){
        request = req;
        result = res;

        OAuthTokens.getTokensUserId(request, result, removeTokensUnderUserId);
    });
};

function removeTokensUnderUserId(id, err){
    (!err && id !== null) ? OAuthTokens.removeTokensUnderUserId(id, finish) : result.sendStatus(500);
}

function finish(err){
    (!err) ? result.sendStatus(200) : result.sendStatus(500);
}