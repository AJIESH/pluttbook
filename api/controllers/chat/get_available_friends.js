var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Friends = require('../../dbFunctions/Friends.js');
var HelperFuncs = require('../../common/helperFunctions.js');

module.exports.controller = function(app){
    app.get('/api/availableFriends', app.oauth.authorise(), function(request, result){

        var currentUserId = null;

        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(!err){
                currentUserId = userId;
                Friends.getFriends(userId, getFriendsTokens);
            }
            else{
                result.sendStatus(500);
            }
        }

        function getFriendsTokens(friends, err){
            if(!err){
                OAuthTokens.getTokenByUserIdAsync(friends[0].friends, getAvailableFriends);
            }
            else{
                result.sendStatus(500);
            }
        }

        function getAvailableFriends(friends, err){
            if(!err){
                HelperFuncs.isUserActive(friends, getFriendsUserInfo)
            }
            else{
                result.sendStatus(500);
            }
        }

        function getFriendsUserInfo(friends, err){
            if(!err){
                Friends.getFriendsUserInfoAsync(friends, finishGet);
            }
            else{
                result.sendStatus(500);
            }
        }

        function finishGet(friends, err){
            if(!err){
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(HelperFuncs.removeUserFromArray(friends, currentUserId)));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};