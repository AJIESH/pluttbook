var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');

module.exports.controller = function(app){
    app.get('/api/friends', app.oauth.authorise(), function(request, result){
        //Gets current user's friends
        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(userId !== null && err === false){
                Friends.getFriends(userId, finishGet)
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