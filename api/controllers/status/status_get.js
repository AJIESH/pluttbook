var OAuthTokens = require('../../dbFunctions/OAuthTokens.js');
var Statuses = require('../../dbFunctions/Statuses.js');
var Friends = require('../../dbFunctions/Friends.js');
var UserInfo = require('../../dbFunctions/UserInfo.js');
var HelperFuncs = require('../../common/helperFunctions.js');
var async = require('async');

var request, result;

module.exports.controller = function(app){
    app.get('/api/status', app.oauth.authorise(), function(request, result){
        //Gets get user's network's statuses
        OAuthTokens.getTokensUserId(request, result, getFriends);

        function getFriends(userId, err){
            if(userId !== null && err === false){
                Friends.getFriends(userId, getStatuses);
            }
            else{
                result.sendStatus(500);
            }
        }

        function getStatuses(friends, err){
            if(err === false && friends.length === 1){
                async.map(friends[0].friends, Statuses.getStatusesAsync, function(err, result){
                    (!err) ? getUsersInfo(HelperFuncs.concatArrays(result)) : result.sendStatus(500);
                });
            }
            else{
                result.sendStatus(500);
            }
        }

        function getUsersInfo(statuses){
            Statuses.getStatusesUserInfo(statuses, finishGet);
        }

        function finishGet(statuses, err){
            if(!err){
                var sortedStatuses = HelperFuncs.sortByDate(statuses);
                result.setHeader('Content-Type', 'application/json');
                result.send(JSON.stringify(HelperFuncs.sortByDate(statuses)));
            }
            else{
                result.sendStatus(500);
            }
        }
    });
};

