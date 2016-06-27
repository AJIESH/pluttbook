var OAuthTokens = require('../dbFunctions/OAuthTokens.js');
var Friends = require('../dbFunctions/Friends.js');
var HelperFuncs = require('../common/helperFunctions.js');

module.exports.getAllAvailableFriends = function(userId, result, callback){
    var currentUserId = userId;

    currentUserId = userId;

    Friends.getFriends(userId, getFriendsTokens);

    function getFriendsTokens(friends, err){
        if(!err && friends.length === 1){
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
            Friends.getFriendsUserInfoAsync(friends, removeCurrentUser);
        }
        else{
            result.sendStatus(500);
        }
    }

    function removeCurrentUser(friends, err){
        if(!err){
            var availableFriends = HelperFuncs.removeUserFromArray(friends, currentUserId);
            callback(availableFriends);
        }
        else{
            result.sendStatus(500);
        }
    }
};