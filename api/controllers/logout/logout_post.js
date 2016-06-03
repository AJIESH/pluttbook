var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');

module.exports.controller = function(app){
    app.post('/api/logout', app.oauth.authorise(), function(request, result){

        OAuthTokens.getTokensUserId(request, result, removeTokensUnderUserId);

        function removeTokensUnderUserId(id, err){
            (!err && id !== null) ? OAuthTokens.removeTokensUnderUserId(id, finish) : result.sendStatus(500);
        }

        function finish(err){
            (!err) ? result.sendStatus(200) : result.sendStatus(500);
        }
    });
};