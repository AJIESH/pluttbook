var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var AvailableFriends = require('../../common/getAvailableFriends.js');

module.exports.controller = function(app){
    app.get('/api/availableFriends', app.oauth.authorise(), function(request, result){
        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(!err){
                AvailableFriends.getAllAvailableFriends(userId, result, finishGet)
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(friends, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(friends));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};